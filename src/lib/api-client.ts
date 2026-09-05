/**
 * Axios client for the Django REST backend.
 *
 *  - Base URL: VITE_API_URL (e.g. https://api.example.com/api), defaults to
 *    http://localhost:8000/api for local development.
 *  - Access token is attached to every request.
 *  - A 401 triggers exactly one refresh attempt (refresh token), then the
 *    original request is retried. If refresh fails the tokens are cleared and
 *    the caller is redirected to /login by the UI layer.
 */
import axios, { AxiosError } from "axios";

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL as string | undefined
)?.replace(/\/+$/, "") || "http://localhost:8000/api";

const ACCESS_KEY = "l2l.access_token";
const REFRESH_KEY = "l2l.refresh_token";

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_KEY);
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
}

export function setTokens(access: string, refresh: string): void {
  try {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  } catch {
    /* storage unavailable — session continues without persistence */
  }
}

export function clearTokens(): void {
  try {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  } catch {
    /* noop */
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

/** Single-flight token refresh shared by every concurrent 401. */
export function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refresh = getRefreshToken();
      if (!refresh) return null;
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/token/refresh`, { refresh });
        if (data?.access) {
          setTokens(data.access, data.refresh ?? refresh);
          return data.access as string;
        }
        return null;
      } catch {
        clearTokens();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (typeof error.config & { _retried?: boolean }) | undefined;
    const status = error.response?.status;

    if (status === 401 && original && !original._retried) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        original._retried = true;
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      }
    }
    return Promise.reject(error);
  },
);

/** Human-friendly message from a Django/DRF error response. */
export function apiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { detail?: string | string[]; non_field_errors?: string[]; email?: string[]; password?: string[] }
      | undefined;
    if (data) {
      if (data.detail) return Array.isArray(data.detail) ? data.detail[0] : data.detail;
      if (data.non_field_errors?.length) return data.non_field_errors[0];
      if (data.email?.length) return data.email[0];
      if (data.password?.length) return data.password[0];
    }
    if (!err.response) return "Cannot reach the server. Is the API running?";
    return `Request failed (${err.response.status}).`;
  }
  return err instanceof Error ? err.message : "Something went wrong.";
}

/** Throw helper used by the API modules. */
export async function toApiError(err: unknown): Promise<never> {
  throw new Error(apiErrorMessage(err));
}
