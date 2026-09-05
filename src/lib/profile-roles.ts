import { BookOpen, Briefcase, Building2, GraduationCap, type LucideIcon } from "lucide-react";

/**
 * The four platform profiles. `id` is persisted on the Convex `users` row
 * (`profileRole`) and must match the literals in src/convex/schema.ts and
 * src/convex/roles.ts.
 */
export type ProfileRoleId = "student" | "industry" | "academician" | "institutionAdmin";

export interface ProfileRoleConfig {
  id: ProfileRoleId;
  /** Dashboard route for this role. */
  path: string;
  /** Short label used in nav/auth chips. */
  label: string;
  /** Display name (longer form). */
  name: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  iconBg: string;
}

export const PROFILE_ROLES: ProfileRoleConfig[] = [
  {
    id: "student",
    path: "/student",
    label: "Student",
    name: "Student",
    desc: "Build your skill passport & discover opportunities",
    icon: GraduationCap,
    color: "#16a34a",
    bg: "#f0fdf4",
    iconBg: "#dcfce7",
  },
  {
    id: "industry",
    path: "/industry",
    label: "Industry",
    name: "Industry Partner",
    desc: "Post opportunities & hire verified talent",
    icon: Briefcase,
    color: "#2563eb",
    bg: "#eff6ff",
    iconBg: "#dbeafe",
  },
  {
    id: "academician",
    path: "/academician",
    label: "Academician",
    name: "Academician",
    desc: "Connect curriculum with industry demand",
    icon: BookOpen,
    color: "#7c3aed",
    bg: "#f5f3ff",
    iconBg: "#ede9fe",
  },
  {
    id: "institutionAdmin",
    path: "/institution-admin",
    label: "Institution Admin",
    name: "Institution Admin",
    desc: "Monitor outcomes, placements & anomalies",
    icon: Building2,
    color: "#d97706",
    bg: "#fffbeb",
    iconBg: "#fef3c7",
  },
];

export const PROFILE_ROLE_BY_ID = Object.fromEntries(
  PROFILE_ROLES.map((r) => [r.id, r]),
) as Record<ProfileRoleId, ProfileRoleConfig>;

/** Home route for a profile role, e.g. roleHome("academician") -> "/academician". */
export function roleHome(role: ProfileRoleId): string {
  return PROFILE_ROLE_BY_ID[role].path;
}

/** The role (if any) whose home route matches the given pathname. */
export function roleForPath(pathname: string): ProfileRoleId | null {
  const match = PROFILE_ROLES.find((r) => pathname === r.path || pathname.startsWith(`${r.path}/`));
  return match ? match.id : null;
}
