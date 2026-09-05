/**
 * Industry dashboard data layer — real HTTP client for the Django backend.
 *
 *   GET  /industry/dashboard
 *   PATCH /industry/profile                       → company settings
 *   GET/POST /industry/opportunities; PATCH/DELETE /industry/opportunities/<pk>
 *   POST /industry/applications/<pk>/shortlist|interview|offer|reject
 *   POST /industry/ratings
 */
import { apiClient, notifyAfterWrite } from "./api-helpers";

export interface Company {
  name: string;
  initials: string;
  logo?: string;
  description: string;
  domain: string;
  orgType: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  contactPerson: string;
  verified: boolean;
  foundedYear: number;
  size: string;
}

export type WorkArrangement = "On-site" | "Remote" | "Hybrid";
export type OpportunityType = "Internship" | "Placement" | "Part-time";
export type OpportunityStatus = "draft" | "active" | "paused" | "closed" | "closing";

export interface SkillRequirement {
  skill: string;
  required: "essential" | "preferred";
  minProficiency?: number;
}

export interface Eligibility {
  qualification: string;
  courses: string[];
  experience: string;
  otherCriteria: string;
}

export interface Opportunity {
  id: number;
  title: string;
  type: OpportunityType;
  description: string;
  openings: number;
  location: string;
  workArrangement: WorkArrangement;
  duration: string;
  stipend: string;
  deadline: string;
  eligibility: Eligibility;
  requiredSkills: SkillRequirement[];
  registrationRequirements?: string;
  status: OpportunityStatus;
  totalApplicants: number;
  shortlistedCount: number;
  createdAt: string;
  blindShortlisting: boolean;
}

export type ApplicationStage = "applied" | "shortlisted" | "interviewed" | "offered" | "joined" | "rejected";

export interface CandidateSkill {
  name: string;
  confidence: number;
  verified: boolean;
  source?: string;
}

export interface CandidateEvidence {
  type: string;
  title: string;
  issuer: string;
  date: string;
  verified: boolean;
}

export interface CandidateProfile {
  id: number;
  name: string;
  initials: string;
  course: string;
  year: string;
  institution: string;
  skills: CandidateSkill[];
  verifiedSkills: number;
  totalSkills: number;
  certifications: number;
  projects: number;
  evidence: CandidateEvidence[];
  roleReadiness: "Ready" | "Almost Ready" | "Needs Development";
  readinessScore: number;
}

export interface Application {
  id: number;
  candidate: CandidateProfile;
  opportunityId: number;
  opportunityTitle: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  stage: ApplicationStage;
  appliedDate: string;
  lastUpdated: string;
  notes: string;
  interviewDate?: string;
}

export interface SLATracker {
  applicationId: number;
  candidateName: string;
  opportunityTitle: string;
  appliedDate: string;
  deadline: string;
  timeRemaining: string;
  slaStatus: "on-track" | "warning" | "overdue";
  daysRemaining: number;
}

export interface IndustryAnalytics {
  totalOpportunities: number;
  activeOpportunities: number;
  totalApplicants: number;
  shortlistingRate: number;
  fillRate: number;
  avgTimeToHire: number;
  pipeline: { stage: string; count: number }[];
  topCandidateSkills: { skill: string; count: number; pct: number }[];
  applicantSkillGaps: { skill: string; gapCount: number; pct: number }[];
  monthlyTrend: { month: string; applicants: number; shortlisted: number; hired: number }[];
  opportunityPerformance: { title: string; applicants: number; fillRate: number; avgMatch: number }[];
}

export interface Rating {
  id: number;
  from: string;
  fromType: "industry" | "student";
  to: string;
  toType: "industry" | "student";
  score: number;
  feedback: string;
  date: string;
  opportunity: string;
}

export interface IndustryDashboard {
  company: Company;
  opportunities: Opportunity[];
  applications: Application[];
  slaTrackers: SLATracker[];
  analytics: IndustryAnalytics;
  ratings: Rating[];
}

export const industryApi = {
  /** GET /api/industry/dashboard */
  async getDashboard(): Promise<IndustryDashboard> {
    const { data } = await apiClient.get<IndustryDashboard>("/industry/dashboard");
    return data;
  },

  /** POST /api/industry/opportunities */
  async createOpportunity(data: Omit<Opportunity, "id" | "totalApplicants" | "shortlistedCount" | "createdAt">): Promise<void> {
    await apiClient.post("/industry/opportunities", data);
    notifyAfterWrite();
  },

  /** PATCH /api/industry/opportunities/<pk> */
  async updateOpportunity(id: number, data: Partial<Opportunity>): Promise<void> {
    await apiClient.patch(`/industry/opportunities/${id}`, data);
    notifyAfterWrite();
  },

  async _stage(id: number, action: string, body?: Record<string, unknown>): Promise<void> {
    await apiClient.post(`/industry/applications/${id}/${action}`, body ?? {});
    notifyAfterWrite();
  },

  /** POST /api/industry/applications/<pk>/shortlist */
  async shortlistCandidate(id: number): Promise<void> {
    await this._stage(id, "shortlist");
  },

  /** POST /api/industry/applications/<pk>/interview */
  async moveToInterview(id: number): Promise<void> {
    await this._stage(id, "interview");
  },

  /** POST /api/industry/applications/<pk>/offer */
  async makeOffer(id: number): Promise<void> {
    await this._stage(id, "offer");
  },

  /** POST /api/industry/applications/<pk>/reject */
  async rejectCandidate(id: number): Promise<void> {
    await this._stage(id, "reject");
  },

  /** PATCH /api/industry/profile — company settings tab */
  async updateSettings(data: Partial<Company>): Promise<void> {
    await apiClient.patch("/industry/profile", data);
    notifyAfterWrite();
  },

  /** POST /api/industry/ratings */
  async submitRating(data: Omit<Rating, "id">): Promise<void> {
    await apiClient.post("/industry/ratings", data);
    notifyAfterWrite();
  },
};
