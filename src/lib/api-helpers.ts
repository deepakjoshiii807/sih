/**
 * Shared imports for the role data layers (src/lib/*-api.ts).
 * Keeping them behind one module makes the HTTP/refresh wiring easy to find.
 */
export { apiClient, apiErrorMessage, API_BASE_URL } from "./api-client";
export { notifyDataChanged as notifyAfterWrite } from "./data-events";
