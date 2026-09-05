/**
 * Student dashboard data layer — real HTTP client for the Django backend.
 *
 *   GET  /student/dashboard      → StudentDashboard (exact UI contract)
 *   PATCH /student/profile       → update profile
 *   POST  /student/applications  → apply to an opportunity
 *   POST  /student/projects/<id>/submit → submit a recommended project
 *   PATCH /settings              → settings tab
 */
import { apiClient, notifyAfterWrite } from "./api-helpers";

export type SkillOrigin = "evidence" | "self-declared";
export type RoleReadiness = "Beginning" | "Developing" | "Job-Ready";
export type ApplicationStage = "applied" | "shortlisted" | "interviewed" | "offered" | "joined" | "rejected";
export type EvidenceStatus = "verified" | "processing" | "needs review";
export type OpportunityType = "Internship" | "Placement" | "Part-time";

export interface Student {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  bio: string;
  institution: string;
  course: string;
  department: string;
  year: string;
  graduationYear: number;
  location: string;
  targetRole: string;
  profileCompletion: number;
}

export interface EvidenceItem {
  id: string;
  title: string;
  kind: "Certificate" | "Project" | "Transcript" | "Internship" | "Publication" | "Portfolio" | "Log";
  issuer: string;
  date: string;
  status: EvidenceStatus;
  skills?: string[];
}

export interface SkillPassportItem {
  id: string;
  name: string;
  taxonomyId: string;
  origin: SkillOrigin;
  confidence: number;
  evidence?: EvidenceItem;
  category: string;
}

export interface SkillPassport {
  verifiedCount: number;
  selfDeclaredCount: number;
  totalEvidence: number;
  verifiedEvidence: number;
  items: SkillPassportItem[];
}

export interface RoleReadinessProfile {
  targetRole: string;
  readiness: RoleReadiness;
  readinessScore: number;
  matchedSkills: number;
  totalRequired: number;
  strongSkills: string[];
  missingSkills: string[];
  weakSkills: string[];
  explanation: string;
  factors: { label: string; value: string; positive: boolean }[];
}

export interface SkillGap {
  id: string;
  taxonomyId: string;
  name: string;
  current: number;
  required: number;
  severity: "High" | "Medium" | "Low";
  evidenceNeeded: boolean;
}

export interface SimulatorAction {
  type: "skill" | "course" | "certification" | "project";
  name: string;
  description: string;
  skillsImproved: { skill: string; currentConfidence: number; projectedConfidence: number }[];
  readinessChange: { from: number; to: number; fromLabel: RoleReadiness; toLabel: RoleReadiness };
}

export interface RecommendedProject {
  id: string;
  title: string;
  description: string;
  targetSkill: string;
  skillGapId: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  deliverables: string[];
  verificationCriteria: string[];
  submissionStatus?: "not submitted" | "pending review" | "verified" | "needs revision";
}

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  org: string;
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  match: number;
  matchedSkills: string[];
  missingSkills: string[];
  requiredSkills: string[];
  description: string;
  workArrangement: string;
  openings: number;
}

export interface Application {
  id: string;
  opportunityId: string;
  role: string;
  org: string;
  stage: ApplicationStage;
  stageLabel: string;
  status: string;
  nextStep?: string;
  match: number;
  appliedDate: string;
}

export interface LearningRecommendation {
  id: string;
  closesGap: string;
  title: string;
  type: "Course" | "Workshop" | "Learning path" | "Certification";
  provider: string;
  duration: string;
  rating: number;
  why: string;
  projectedImprovement: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  skills: string[];
  date: string;
  evidenceId?: string;
}

export interface PortfolioSummary {
  projects: number;
  certificates: number;
  verifiedSkills: number;
  internshipHours: number;
  achievements: number;
  featured: PortfolioProject[];
}

export interface StudentDashboard {
  student: Student;
  skillPassport: SkillPassport;
  roleReadiness: RoleReadinessProfile;
  gaps: SkillGap[];
  simulator: { currentReadinessScore: number; currentReadiness: RoleReadiness; actions: SimulatorAction[] };
  recommendedProjects: RecommendedProject[];
  opportunities: Opportunity[];
  applications: Application[];
  recommendations: LearningRecommendation[];
  portfolio: PortfolioSummary;
}

/** "rp-12" / "op-7" → 12 / 7 (backend rows use plain integer pks). */
function numId(value: string | number, prefix?: string): number {
  if (typeof value === "number") return value;
  const cleaned = prefix ? value.replace(prefix, "") : value.replace(/^[a-z]+-/, "");
  return parseInt(cleaned, 10) || 0;
}

export const studentApi = {
  /** GET /api/student/dashboard */
  async getDashboard(): Promise<StudentDashboard> {
    const { data } = await apiClient.get<StudentDashboard>("/student/dashboard");
    return data;
  },

  /** PATCH /api/student/profile */
  async updateProfile(data: Partial<Student>): Promise<void> {
    await apiClient.patch("/student/profile", data);
    notifyAfterWrite();
  },

  /** POST /api/student/applications */
  async applyToOpportunity(opportunityId: string): Promise<void> {
    await apiClient.post("/student/applications", { opportunityId });
    notifyAfterWrite();
  },

  /** POST /api/student/projects/<pk>/submit */
  async submitProject(projectId: string, payload?: { submissionUrl?: string; notes?: string }): Promise<void> {
    const pk = numId(projectId, "rp-");
    await apiClient.post(`/student/projects/${pk}/submit`, payload ?? {});
    notifyAfterWrite();
  },

  /** PATCH /api/settings — student profile settings tab */
  async updateSettings(data: Record<string, unknown>): Promise<void> {
    await apiClient.patch("/settings", data);
    notifyAfterWrite();
  },
};
