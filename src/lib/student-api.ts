/**
 * SkillBridge — Student Dashboard data layer.
 *
 * Every type mirrors the product spec. When the FastAPI backend is ready,
 * swap each mock function body for a real fetch call.
 *
 *   Frontend  →  REST API  →  Backend  →  PostgreSQL / ML / Document services
 */

/* ═══════════════════════════════════════════════════════
   Core Types
   ═══════════════════════════════════════════════════════ */

export type SkillOrigin = "evidence" | "self-declared";
export type RoleReadiness = "Beginning" | "Developing" | "Job-Ready";
export type ApplicationStage = "applied" | "shortlisted" | "interviewed" | "offered" | "joined" | "rejected";
export type EvidenceStatus = "verified" | "processing" | "needs review";
export type OpportunityType = "Internship" | "Placement" | "Part-time";

/* ═══════════════════════════════════════════════════════
   Student Profile
   ═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   Skill Passport
   ═══════════════════════════════════════════════════════ */

export interface SkillPassportItem {
  id: string;
  name: string;
  taxonomyId: string;
  origin: SkillOrigin;
  confidence: number;
  /** Evidence document backing this skill (evidence-derived only). */
  evidence?: EvidenceItem;
  category: string;
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

export interface SkillPassport {
  verifiedCount: number;
  selfDeclaredCount: number;
  totalEvidence: number;
  verifiedEvidence: number;
  items: SkillPassportItem[];
}

/* ═══════════════════════════════════════════════════════
   Role Readiness
   ═══════════════════════════════════════════════════════ */

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
  /** Contributing factors for the classification */
  factors: { label: string; value: string; positive: boolean }[];
}

/* ═══════════════════════════════════════════════════════
   Skill Gap Analysis
   ═══════════════════════════════════════════════════════ */

export interface SkillGap {
  id: string;
  taxonomyId: string;
  name: string;
  current: number;
  required: number;
  severity: "High" | "Medium" | "Low";
  evidenceNeeded: boolean;
}

/* ═══════════════════════════════════════════════════════
   Skill Gap Simulator
   ═══════════════════════════════════════════════════════ */

export interface SimulatorAction {
  type: "skill" | "course" | "certification" | "project";
  name: string;
  description: string;
  skillsImproved: { skill: string; currentConfidence: number; projectedConfidence: number }[];
  readinessChange: { from: number; to: number; fromLabel: RoleReadiness; toLabel: RoleReadiness };
}

export interface SkillGapSimulator {
  currentReadinessScore: number;
  currentReadiness: RoleReadiness;
  actions: SimulatorAction[];
}

/* ═══════════════════════════════════════════════════════
   Skill-to-Project Loop
   ═══════════════════════════════════════════════════════ */

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
  /** If student has submitted, show status */
  submissionStatus?: "not submitted" | "pending review" | "verified" | "needs revision";
}

/* ═══════════════════════════════════════════════════════
   Opportunities
   ═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   Applications
   ═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   Learning Recommendations
   ═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   Portfolio
   ═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   Dashboard Aggregate
   ═══════════════════════════════════════════════════════ */

export interface StudentDashboard {
  student: Student;
  skillPassport: SkillPassport;
  roleReadiness: RoleReadinessProfile;
  gaps: SkillGap[];
  simulator: SkillGapSimulator;
  recommendedProjects: RecommendedProject[];
  opportunities: Opportunity[];
  applications: Application[];
  recommendations: LearningRecommendation[];
  portfolio: PortfolioSummary;
}

/* ═══════════════════════════════════════════════════════
   Mock Data
   ═══════════════════════════════════════════════════════ */

const mockStudent: Student = {
  id: "st-1",
  name: "Aarav Sharma", initials: "AS",
  email: "aarav.sharma@aiia.ac.in", phone: "+91 98765 43210",
  bio: "Third-year BAMS student with a strong interest in clinical research and evidence-based medicine. Experienced in Python-based data analysis and research methodology.",
  institution: "All India Institute of Ayurveda",
  course: "BAMS", department: "Ayurveda Medicine", year: "3rd Year", graduationYear: 2027,
  location: "New Delhi", targetRole: "Clinical Research Intern", profileCompletion: 82,
};

const mockSkillPassport: SkillPassport = {
  verifiedCount: 5, selfDeclaredCount: 3, totalEvidence: 12, verifiedEvidence: 8,
  items: [
    { id: "sp-1", name: "Python", taxonomyId: "TC-PY-01", origin: "evidence", confidence: 92, category: "Technical", evidence: { id: "ev-1", title: "Python for Research Certificate", kind: "Certificate", issuer: "NPTEL", date: "Jul 2025", status: "verified" } },
    { id: "sp-2", name: "Machine Learning", taxonomyId: "TC-ML-01", origin: "evidence", confidence: 86, category: "Technical", evidence: { id: "ev-2", title: "CVD Risk Prediction Model", kind: "Project", issuer: "AIIA", date: "Jun 2025", status: "verified" } },
    { id: "sp-3", name: "Research Methodology", taxonomyId: "TC-RM-04", origin: "evidence", confidence: 81, category: "Research", evidence: { id: "ev-3", title: "Academic Transcript", kind: "Transcript", issuer: "AIIA", date: "Aug 2025", status: "verified" } },
    { id: "sp-4", name: "Data Analysis", taxonomyId: "TC-DA-02", origin: "evidence", confidence: 76, category: "Technical", evidence: { id: "ev-4", title: "Rural Health Data Survey", kind: "Project", issuer: "AIIA", date: "May 2025", status: "verified" } },
    { id: "sp-5", name: "Clinical Research", taxonomyId: "TC-CR-03", origin: "evidence", confidence: 68, category: "Domain", evidence: { id: "ev-5", title: "Clinical Posting Record", kind: "Log", issuer: "AIIA OPD", date: "Jul 2025", status: "verified" } },
    { id: "sp-6", name: "Scientific Writing", taxonomyId: "TC-SW-02", origin: "self-declared", confidence: 64, category: "Communication" },
    { id: "sp-7", name: "Documentation", taxonomyId: "TC-DC-01", origin: "self-declared", confidence: 72, category: "Communication" },
    { id: "sp-8", name: "Statistical Analysis", taxonomyId: "TC-SA-01", origin: "self-declared", confidence: 45, category: "Technical" },
  ],
};

const mockRoleReadiness: RoleReadinessProfile = {
  targetRole: "Clinical Research Intern", readiness: "Developing", readinessScore: 74,
  matchedSkills: 5, totalRequired: 8,
  strongSkills: ["Python", "Machine Learning", "Research Methodology"],
  missingSkills: ["Statistical Analysis"],
  weakSkills: ["Scientific Writing", "Clinical Research"],
  explanation: "You are Developing toward this role. Your Python and research skills are strong, but Statistical Analysis is missing and Scientific Writing needs improvement. Complete the recommended projects to advance to Job-Ready.",
  factors: [
    { label: "Verified skills match", value: "5 of 8 required skills verified", positive: true },
    { label: "Strong technical foundation", value: "Python 92%, ML 86%", positive: true },
    { label: "Missing critical skill", value: "Statistical Analysis not demonstrated", positive: false },
    { label: "Weak areas need attention", value: "Scientific Writing at 64%", positive: false },
    { label: "Evidence-backed", value: "74% of your skills have supporting evidence", positive: true },
  ],
};

const mockGaps: SkillGap[] = [
  { id: "gp-1", taxonomyId: "TC-SA-01", name: "Statistical Analysis", current: 45, required: 75, severity: "High", evidenceNeeded: true },
  { id: "gp-2", taxonomyId: "TC-SW-02", name: "Scientific Writing", current: 64, required: 80, severity: "Medium", evidenceNeeded: false },
  { id: "gp-3", taxonomyId: "TC-CT-05", name: "Clinical Trial Documentation", current: 55, required: 75, severity: "Medium", evidenceNeeded: true },
];

const mockSimulator: SkillGapSimulator = {
  currentReadinessScore: 74, currentReadiness: "Developing",
  actions: [
    {
      type: "course", name: "Statistics for Health Research", description: "Complete NPTEL course on statistical methods",
      skillsImproved: [{ skill: "Statistical Analysis", currentConfidence: 45, projectedConfidence: 72 }],
      readinessChange: { from: 74, to: 83, fromLabel: "Developing", toLabel: "Developing" },
    },
    {
      type: "project", name: "Clinical Data Analysis Project", description: "Analyze real clinical trial dataset using Python and statistical methods",
      skillsImproved: [{ skill: "Statistical Analysis", currentConfidence: 45, projectedConfidence: 78 }, { skill: "Data Analysis", currentConfidence: 76, projectedConfidence: 84 }],
      readinessChange: { from: 74, to: 88, fromLabel: "Developing", toLabel: "Job-Ready" },
    },
    {
      type: "certification", name: "GCP Certification", description: "Obtain Good Clinical Practice certification",
      skillsImproved: [{ skill: "Clinical Trial Documentation", currentConfidence: 55, projectedConfidence: 78 }],
      readinessChange: { from: 74, to: 81, fromLabel: "Developing", toLabel: "Developing" },
    },
    {
      type: "skill", name: "Scientific Writing Practice", description: "Write a research paper draft on Ayurvedic clinical outcomes",
      skillsImproved: [{ skill: "Scientific Writing", currentConfidence: 64, projectedConfidence: 82 }],
      readinessChange: { from: 74, to: 79, fromLabel: "Developing", toLabel: "Developing" },
    },
  ],
};

const mockProjects: RecommendedProject[] = [
  {
    id: "rp-1", title: "Clinical Data Statistical Analysis", description: "Analyze a provided clinical trial dataset. Apply appropriate statistical tests, create visualizations, and write a brief findings report.",
    targetSkill: "Statistical Analysis", skillGapId: "gp-1", difficulty: "Intermediate", estimatedDuration: "3 weeks",
    deliverables: ["Jupyter notebook with analysis", "Statistical test results", "Visualization charts", "Brief findings report"],
    verificationCriteria: ["Correct statistical methodology", "Reproducible code", "Clear visualizations", "Well-structured report"],
    submissionStatus: "not submitted",
  },
  {
    id: "rp-2", title: "Herbal Drug Efficacy Literature Review", description: "Conduct a systematic literature review on the efficacy of a chosen Ayurvedic formulation. Follow scientific writing standards.",
    targetSkill: "Scientific Writing", skillGapId: "gp-2", difficulty: "Beginner", estimatedDuration: "2 weeks",
    deliverables: ["Literature review document", "Reference list in standard format", "Summary tables"],
    verificationCriteria: ["Proper citation format", "Structured review methodology", "Critical analysis present"],
    submissionStatus: "not submitted",
  },
];

const mockOpportunities: Opportunity[] = [
  { id: "op-1", title: "Clinical Research Intern", type: "Internship", org: "AIIA / Research Division", location: "New Delhi", duration: "3 Months", stipend: "₹12,000/month", deadline: "Sept 30, 2025", match: 92, matchedSkills: ["Python", "Research Methodology", "Data Analysis"], missingSkills: ["Statistical Analysis"], requiredSkills: ["Python", "Research Methodology", "Data Analysis", "Statistical Analysis"], description: "Work on ongoing clinical trials in Ayurvedic pharmacology.", workArrangement: "On-site", openings: 4 },
  { id: "op-2", title: "Research Data Assistant", type: "Part-time", org: "CCRAS / New Delhi", location: "New Delhi", duration: "6 Months", stipend: "₹15,000/month", deadline: "Oct 15, 2025", match: 85, matchedSkills: ["Python", "Data Analysis", "Machine Learning"], missingSkills: [], requiredSkills: ["Python", "Data Analysis", "Statistical Analysis"], description: "Assist in cleaning and analyzing clinical trial data.", workArrangement: "Hybrid", openings: 2 },
  { id: "op-3", title: "AYUSH Research Internship", type: "Internship", org: "NIA / Jaipur", location: "Jaipur", duration: "2 Months", stipend: "₹8,000/month", deadline: "Sept 20, 2025", match: 78, matchedSkills: ["Research Methodology", "Clinical Research"], missingSkills: ["Statistical Analysis"], requiredSkills: ["Research", "Data Analysis", "Clinical Research"], description: "Support field research on AYUSH healthcare delivery.", workArrangement: "On-site", openings: 3 },
];

const mockApplications: Application[] = [
  { id: "ap-1", opportunityId: "op-1", role: "Clinical Research Intern", org: "AIIA Research Division", stage: "shortlisted", stageLabel: "Shortlisted", status: "Interview scheduled", nextStep: "Interview: Sept 10, 10:30 AM", match: 92, appliedDate: "Sept 3, 2025" },
  { id: "ap-2", opportunityId: "op-2", role: "Research Data Assistant", org: "CCRAS", stage: "interviewed", stageLabel: "Interviewed", status: "Awaiting decision", match: 88, appliedDate: "Aug 25, 2025" },
  { id: "ap-3", opportunityId: "op-3", role: "AYUSH Research Internship", org: "NIA Jaipur", stage: "applied", stageLabel: "Applied", status: "Submitted 2 days ago", match: 78, appliedDate: "Sept 4, 2025" },
];

const mockRecommendations: LearningRecommendation[] = [
  { id: "rc-1", closesGap: "Statistical Analysis", title: "Statistics for Health Research", type: "Course", provider: "NPTEL", duration: "8 weeks", rating: 4.6, why: "Directly addresses your Statistical Analysis gap — the #1 missing skill for your target role.", projectedImprovement: 27 },
  { id: "rc-2", closesGap: "Scientific Writing", title: "Scientific Writing Fundamentals", type: "Course", provider: "Coursera", duration: "4 weeks", rating: 4.8, why: "Builds the writing skills your target role lists as required.", projectedImprovement: 18 },
  { id: "rc-3", closesGap: "Clinical Trial Documentation", title: "GCP & Clinical Trial Basics", type: "Workshop", provider: "AIIA", duration: "2 days", rating: 4.7, why: "Hands-on practice with case report forms and trial records.", projectedImprovement: 23 },
];

const mockPortfolio: PortfolioSummary = {
  projects: 4, certificates: 6, verifiedSkills: 18, internshipHours: 240, achievements: 3,
  featured: [
    { id: "pf-1", title: "Rural Health Data Survey", description: "Analyzed health data from 500+ rural households using Python and statistical methods", skills: ["Python", "Data Analysis"], date: "May 2025" },
    { id: "pf-2", title: "CVD Risk Prediction Model", description: "ML model predicting cardiovascular risk from Ayurvedic markers", skills: ["Machine Learning", "Python"], date: "Jun 2025" },
    { id: "pf-3", title: "Herbal Safety Database", description: "Searchable database of 200+ herb-drug interactions", skills: ["Data Analysis", "Documentation"], date: "Apr 2025" },
  ],
};

const mockDashboard: StudentDashboard = {
  student: mockStudent, skillPassport: mockSkillPassport, roleReadiness: mockRoleReadiness,
  gaps: mockGaps, simulator: mockSimulator, recommendedProjects: mockProjects,
  opportunities: mockOpportunities, applications: mockApplications,
  recommendations: mockRecommendations, portfolio: mockPortfolio,
};

/* ═══════════════════════════════════════════════════════
   API Layer
   ═══════════════════════════════════════════════════════ */

export const studentApi = {
  async getDashboard(): Promise<StudentDashboard> {
    await new Promise((r) => setTimeout(r, 350));
    return structuredClone(mockDashboard);
  },
  async updateProfile(data: Partial<Student>): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    Object.assign(mockStudent, data);
  },
  async applyToOpportunity(opportunityId: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
  async submitProject(projectId: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
  async updateSettings(data: Record<string, unknown>): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
};
