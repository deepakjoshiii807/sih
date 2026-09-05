/**
 * Institution admin dashboard data layer — real HTTP client for Django backend.
 *
 *   GET  /institution/dashboard
 *   POST /institution/anomalies/<pk>/review  {action: resolve|escalate}
 *   POST /institution/reports/generate       {type}  → real report row
 *   PATCH /settings                          → institution settings tab
 */
import { apiClient, notifyAfterWrite } from "./api-helpers";

export interface Institution {
  name: string;
  initials: string;
  location: string;
  type: string;
  establishedYear: number;
  departments: string[];
  totalStudents: number;
  totalFaculty: number;
  website: string;
  email: string;
  phone: string;
  verified: boolean;
}

export interface PlacementRecord {
  id: string;
  studentName: string;
  studentInitials: string;
  department: string;
  course: string;
  company: string;
  role: string;
  type: "Internship" | "Placement";
  startDate: string;
  duration: string;
  stipend: string;
  status: "active" | "completed" | "offered";
}

export interface DepartmentPlacement {
  department: string;
  totalStudents: number;
  placed: number;
  placementRate: number;
  avgStipend: string;
  topCompany: string;
}

export interface PlacementTrend {
  month: string;
  placements: number;
  internships: number;
  applications: number;
}

export interface SkillMetric {
  name: string;
  verifiedCount: number;
  selfDeclaredCount: number;
  totalCount: number;
  avgConfidence: number;
  trend: "up" | "stable" | "down";
}

export interface ReadinessDistribution {
  department: string;
  beginning: number;
  developing: number;
  jobReady: number;
  total: number;
}

export interface DepartmentComparison {
  name: string;
  students: number;
  avgSkills: number;
  avgMatch: number;
  avgReadiness: number;
  placementRate: number;
  verifiedPct: number;
  topGap: string;
  internshipParticipation: number;
}

export type AnomalySeverity = "high" | "medium" | "low";
export type AnomalyStatus = "flagged" | "reviewing" | "resolved" | "escalated";

export interface AnomalyFlag {
  id: string;
  studentName: string;
  studentInitials: string;
  department: string;
  type: "Duplicate Record" | "Inconsistent Data" | "Statistical Outlier" | "Unusual Pattern";
  description: string;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  flaggedDate: string;
  evidence: string;
}

export type ReportType = "Placement" | "Skill Development" | "Internship" | "Readiness" | "Industry Engagement" | "Anomaly";

export interface InstitutionalReport {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  generatedDate: string;
  departments: string[];
  summary: string;
  keyFindings: string[];
  status: "ready" | "generating";
}

export interface InstitutionAnalytics {
  totalStudents: number;
  totalPlaced: number;
  placementRate: number;
  internshipRate: number;
  avgReadiness: number;
  avgSkills: number;
  industryPartners: number;
  monthlyTrend: { month: string; placements: number; internships: number; verified: number }[];
  skillGaps: { skill: string; gapCount: number; pct: number }[];
  industryEngagement: { company: string; opportunities: number; hired: number }[];
}

export interface InstitutionDashboard {
  institution: Institution;
  placements: PlacementRecord[];
  departmentPlacements: DepartmentPlacement[];
  placementTrends: PlacementTrend[];
  skillMetrics: SkillMetric[];
  readinessDistribution: ReadinessDistribution[];
  departmentComparison: DepartmentComparison[];
  anomalies: AnomalyFlag[];
  reports: InstitutionalReport[];
  analytics: InstitutionAnalytics;
}

/** "an-12" → 12 */
function numId(value: string | number): number {
  if (typeof value === "number") return value;
  return parseInt(value.replace(/^[a-z]+-/, ""), 10) || 0;
}

export const institutionApi = {
  /** GET /api/institution/dashboard */
  async getDashboard(): Promise<InstitutionDashboard> {
    const { data } = await apiClient.get<InstitutionDashboard>("/institution/dashboard");
    return data;
  },

  /** POST /api/institution/anomalies/<pk>/review */
  async reviewAnomaly(id: string, action: "resolve" | "escalate"): Promise<void> {
    await apiClient.post(`/institution/anomalies/${numId(id)}/review`, { action });
    notifyAfterWrite();
  },

  /** POST /api/institution/reports/generate — creates a real report row */
  async generateReport(type: string): Promise<{ id: string; status: string }> {
    const { data } = await apiClient.post<{ id: string; status: string }>("/institution/reports/generate", { type });
    notifyAfterWrite();
    return data;
  },

  /** PATCH /api/settings — institution settings tab */
  async updateSettings(data: Record<string, unknown>): Promise<void> {
    await apiClient.patch("/settings", data);
    notifyAfterWrite();
  },
};
