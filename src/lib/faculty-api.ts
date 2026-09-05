/**
 * Academician dashboard data layer — real HTTP client for the Django backend.
 *
 *   GET  /academician/dashboard               → AcademicianDashboard
 *   POST /academician/verifications/<pk>/decide  → approve / flag / request changes
 *   PATCH /settings                           → settings tab
 */
import { apiClient, notifyAfterWrite } from "./api-helpers";

export interface Academician {
  name: string;
  initials: string;
  title: string;
  department: string;
  institution: string;
  email: string;
  phone: string;
  bio: string;
  subjects: string[];
  researchInterests: string[];
  experience: number;
  studentsCount: number;
  verifiedCount: number;
}

export interface DepartmentSkill {
  name: string;
  taxonomyId: string;
  industryDemand: "High" | "Medium" | "Low";
  curriculumCoverage: number;
  studentProficiency: number;
  gapSeverity: "Critical" | "Moderate" | "Acceptable";
  trend: "increasing" | "stable" | "declining";
  studentsWithGap: number;
  totalStudents: number;
}

export interface DemandTrend {
  skill: string;
  direction: "up" | "up-strong" | "stable" | "down";
  demandLevel: "High" | "Medium" | "Low";
  changePercent: number;
  period: string;
}

export interface IndustryRole {
  title: string;
  demandLevel: "High" | "Medium" | "Low";
  openings: number;
  avgMatch: number;
  topSkills: string[];
}

export interface CurriculumReport {
  id: string;
  department: string;
  generatedDate: string;
  totalStudents: number;
  avgReadiness: number;
  readinessDistribution: { beginning: number; developing: number; jobReady: number };
  topGaps: { skill: string; gapCount: number; severity: string }[];
  coverageGaps: { skill: string; coverage: number; demand: string }[];
  recommendations: string[];
}

export type VerificationType = "Internship" | "Project" | "Certificate" | "Outcome" | "Skill Evidence";
export type VerificationStatus = "pending" | "approved" | "flagged" | "changes-requested";

export interface VerificationRequest {
  id: string;
  studentName: string;
  studentInitials: string;
  title: string;
  type: VerificationType;
  submittedDate: string;
  status: VerificationStatus;
  skillsClaimed: string[];
  description: string;
  evidenceUrl?: string;
}

export type OpportunityCategory = "FDP" | "Industrial Training" | "Consultancy" | "Research Collaboration";

export interface AcademicanOpportunity {
  id: string;
  title: string;
  category: OpportunityCategory;
  organizer: string;
  location: string;
  duration: string;
  deadline: string;
  description: string;
  skillsRelevant: string[];
  status: "open" | "closing" | "closed";
  interested: number;
}

export interface CurriculumLoopStep {
  id: number;
  label: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  insight?: string;
}

export interface DepartmentAnalytics {
  totalStudents: number;
  avgSkills: number;
  avgMatch: number;
  avgReadiness: number;
  readinessDistribution: { beginning: number; developing: number; jobReady: number };
  skillDistribution: { name: string; count: number; pct: number }[];
  monthlyTrend: { month: string; verified: number; placements: number }[];
  departmentComparison: { dept: string; avgMatch: number; avgReadiness: number }[];
}

export interface AcademicianDashboard {
  academician: Academician;
  departmentSkills: DepartmentSkill[];
  demandTrends: DemandTrend[];
  industryRoles: IndustryRole[];
  curriculumReport: CurriculumReport;
  verifications: VerificationRequest[];
  opportunities: AcademicanOpportunity[];
  curriculumLoop: CurriculumLoopStep[];
  analytics: DepartmentAnalytics;
}

/** "v-12" → 12 */
function numId(value: string | number): number {
  if (typeof value === "number") return value;
  return parseInt(value.replace(/^[a-z]+-/, ""), 10) || 0;
}

export const facultyApi = {
  /** GET /api/academician/dashboard */
  async getDashboard(): Promise<AcademicianDashboard> {
    const { data } = await apiClient.get<AcademicianDashboard>("/academician/dashboard");
    return data;
  },

  /** POST /api/academician/verifications/<pk>/decide {action} */
  async verifyStudent(id: string, action: "approved" | "flagged" | "changes-requested"): Promise<void> {
    await apiClient.post(`/academician/verifications/${numId(id)}/decide`, { action });
    notifyAfterWrite();
  },

  /** PATCH /api/settings — academician profile settings tab */
  async updateSettings(data: Record<string, unknown>): Promise<void> {
    await apiClient.patch("/settings", data);
    notifyAfterWrite();
  },
};
