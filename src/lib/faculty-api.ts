/**
 * Lead2Learn — Academician Dashboard data layer.
 *
 *   Frontend  →  REST API  →  Backend  →  PostgreSQL / ML / Document services
 * NOTE: all values below are SYNTHETIC demo data for the prototype.
 */

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

/* ─── Department Skill Intelligence ─── */
export interface DepartmentSkill {
  name: string;
  taxonomyId: string;
  industryDemand: "High" | "Medium" | "Low";
  curriculumCoverage: number; // 0-100%
  studentProficiency: number; // avg 0-100%
  gapSeverity: "Critical" | "Moderate" | "Acceptable";
  trend: "increasing" | "stable" | "declining";
  studentsWithGap: number;
  totalStudents: number;
}

/* ─── Industry Demand Trends ─── */
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

/* ─── Curriculum Feedback ─── */
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

/* ─── Student Verification ─── */
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

/* ─── Opportunities (FDP, Training, Consultancy, Research) ─── */
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

/* ─── Curriculum Loop ─── */
export interface CurriculumLoopStep {
  id: number;
  label: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  insight?: string;
}

/* ─── Analytics ─── */
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

/* ─── Dashboard Aggregate ─── */
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

/* ═══════════════════════════════════════════════════════
   Mock Data
   ═══════════════════════════════════════════════════════ */

const mockAcademician: Academician = {
  name: "Dr. Priya Mehta", initials: "PM",
  title: "Professor of Ayurveda & Research",
  department: "Department of Ayurveda", institution: "All India Institute of Ayurveda",
  email: "priya.mehta@aiia.ac.in", phone: "+91 98765 12345",
  bio: "Professor with 12 years of experience in clinical research, AYUSH studies, and curriculum development. Specializing in evidence-based Ayurvedic research and industry-academia collaboration.",
  subjects: ["Clinical Research", "Pharmacology", "Research Methodology", "AYUSH Therapeutics"],
  researchInterests: ["Herbal Pharmacovigilance", "Clinical Trial Design", "AYUSH Healthcare Delivery"],
  experience: 12, studentsCount: 24, verifiedCount: 18,
};

const mockDepartmentSkills: DepartmentSkill[] = [
  { name: "Clinical Research", taxonomyId: "TC-CR-03", industryDemand: "High", curriculumCoverage: 32, studentProficiency: 45, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 18, totalStudents: 24 },
  { name: "Statistical Analysis", taxonomyId: "TC-SA-01", industryDemand: "High", curriculumCoverage: 18, studentProficiency: 35, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 20, totalStudents: 24 },
  { name: "Pharmacovigilance", taxonomyId: "TC-PV-02", industryDemand: "Medium", curriculumCoverage: 41, studentProficiency: 52, gapSeverity: "Moderate", trend: "stable", studentsWithGap: 12, totalStudents: 24 },
  { name: "Data Management", taxonomyId: "TC-DM-01", industryDemand: "High", curriculumCoverage: 21, studentProficiency: 40, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 17, totalStudents: 24 },
  { name: "Python", taxonomyId: "TC-PY-01", industryDemand: "High", curriculumCoverage: 55, studentProficiency: 68, gapSeverity: "Moderate", trend: "increasing", studentsWithGap: 10, totalStudents: 24 },
  { name: "Scientific Writing", taxonomyId: "TC-SW-02", industryDemand: "Medium", curriculumCoverage: 62, studentProficiency: 58, gapSeverity: "Acceptable", trend: "stable", studentsWithGap: 8, totalStudents: 24 },
  { name: "Research Methodology", taxonomyId: "TC-RM-04", industryDemand: "High", curriculumCoverage: 70, studentProficiency: 72, gapSeverity: "Acceptable", trend: "stable", studentsWithGap: 6, totalStudents: 24 },
  { name: "Machine Learning", taxonomyId: "TC-ML-01", industryDemand: "High", curriculumCoverage: 12, studentProficiency: 28, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 19, totalStudents: 24 },
];

const mockDemandTrends: DemandTrend[] = [
  { skill: "Clinical Research", direction: "up", demandLevel: "High", changePercent: 35, period: "Last 6 months" },
  { skill: "Data Analysis", direction: "up-strong", demandLevel: "High", changePercent: 52, period: "Last 6 months" },
  { skill: "Machine Learning", direction: "up-strong", demandLevel: "High", changePercent: 68, period: "Last 6 months" },
  { skill: "Statistical Analysis", direction: "up", demandLevel: "High", changePercent: 41, period: "Last 6 months" },
  { skill: "Pharmacology", direction: "stable", demandLevel: "Medium", changePercent: 5, period: "Last 6 months" },
  { skill: "Documentation", direction: "stable", demandLevel: "Low", changePercent: -2, period: "Last 6 months" },
  { skill: "Ayurvedic Therapeutics", direction: "up", demandLevel: "Medium", changePercent: 18, period: "Last 6 months" },
];

const mockIndustryRoles: IndustryRole[] = [
  { title: "Clinical Research Intern", demandLevel: "High", openings: 45, avgMatch: 72, topSkills: ["Clinical Research", "Python", "Data Analysis"] },
  { title: "Research Data Analyst", demandLevel: "High", openings: 32, avgMatch: 68, topSkills: ["Python", "Statistical Analysis", "Data Analysis"] },
  { title: "AYUSH Public Health Intern", demandLevel: "Medium", openings: 18, avgMatch: 75, topSkills: ["Research Methodology", "Clinical Research"] },
  { title: "Pharmacovigilance Associate", demandLevel: "Medium", openings: 12, avgMatch: 65, topSkills: ["Pharmacovigilance", "Scientific Writing", "Clinical Research"] },
];

const mockCurriculumReport: CurriculumReport = {
  id: "rpt-1", department: "Department of Ayurveda", generatedDate: "Sept 2025",
  totalStudents: 24, avgReadiness: 68,
  readinessDistribution: { beginning: 6, developing: 12, jobReady: 6 },
  topGaps: [
    { skill: "Statistical Analysis", gapCount: 20, severity: "Critical" },
    { skill: "Machine Learning", gapCount: 19, severity: "Critical" },
    { skill: "Clinical Research", gapCount: 18, severity: "Critical" },
    { skill: "Data Management", gapCount: 17, severity: "Critical" },
  ],
  coverageGaps: [
    { skill: "Machine Learning", coverage: 12, demand: "High" },
    { skill: "Statistical Analysis", coverage: 18, demand: "High" },
    { skill: "Data Management", coverage: 21, demand: "High" },
    { skill: "Clinical Research", coverage: 32, demand: "High" },
  ],
  recommendations: [
    "Introduce mandatory Statistical Analysis module in 2nd year",
    "Add Python for Healthcare elective in 3rd year curriculum",
    "Partner with industry for Clinical Research practical sessions",
    "Develop internal Machine Learning lab with real clinical datasets",
  ],
};

const mockVerifications: VerificationRequest[] = [
  { id: "v-1", studentName: "Aarav Sharma", studentInitials: "AS", title: "CVD Risk Prediction Model", type: "Project", submittedDate: "Sept 3, 2025", status: "pending", skillsClaimed: ["Python", "Machine Learning", "Data Analysis"], description: "ML model predicting cardiovascular risk from Ayurvedic markers using Python and scikit-learn." },
  { id: "v-2", studentName: "Neha Gupta", studentInitials: "NG", title: "Clinical Posting Certificate", type: "Certificate", submittedDate: "Sept 2, 2025", status: "pending", skillsClaimed: ["Clinical Research", "Patient Assessment"], description: "Certificate of completion for 4-week clinical posting at AIIA OPD." },
  { id: "v-3", studentName: "Rohan Patel", studentInitials: "RP", title: "Herbal Drug Efficacy Study", type: "Project", submittedDate: "Sept 1, 2025", status: "pending", skillsClaimed: ["Research Methodology", "Data Analysis", "Scientific Writing"], description: "Literature review and efficacy analysis of Ashwagandha formulations." },
  { id: "v-4", studentName: "Ananya Reddy", studentInitials: "AR", title: "NPTEL Statistics Certificate", type: "Certificate", submittedDate: "Aug 30, 2025", status: "flagged", skillsClaimed: ["Statistical Analysis"], description: "Certificate from NPTEL course on Statistics for Health Research." },
  { id: "v-5", studentName: "Meera Joshi", studentInitials: "MJ", title: "AYUSH Research Internship", type: "Internship", submittedDate: "Aug 28, 2025", status: "approved", skillsClaimed: ["Research", "Clinical Research", "Data Analysis"], description: "3-month research internship at NIA Jaipur on AYUSH healthcare delivery." },
  { id: "v-6", studentName: "Vikram Singh", studentInitials: "VS", title: "Pharmacognosy Lab Report", type: "Project", submittedDate: "Aug 25, 2025", status: "pending", skillsClaimed: ["Pharmacognosy", "Documentation"], description: "Lab report on identification and authentication of medicinal plants." },
];

const mockOpportunities: AcademicanOpportunity[] = [
  { id: "ao-1", title: "Faculty Development Programme on AI in Healthcare", category: "FDP", organizer: "AICTE", location: "Online", duration: "2 weeks", deadline: "Oct 15, 2025", description: "Learn to integrate AI/ML concepts into healthcare curriculum.", skillsRelevant: ["Machine Learning", "Data Analysis", "Python"], status: "open", interested: 8 },
  { id: "ao-2", title: "Industrial Training at CCRAS", category: "Industrial Training", organizer: "CCRAS", location: "New Delhi", duration: "1 month", deadline: "Sept 30, 2025", description: "Hands-on research training at Central Council for Research in Ayurvedic Sciences.", skillsRelevant: ["Research Methodology", "Clinical Research"], status: "open", interested: 5 },
  { id: "ao-3", title: "Curriculum Consultancy for BAMS Program", category: "Consultancy", organizer: "NCISM", location: "New Delhi", duration: "3 months", deadline: "Nov 1, 2025", description: "Seeking faculty consultants for updating BAMS pharmacology curriculum.", skillsRelevant: ["Pharmacology", "Scientific Writing"], status: "open", interested: 3 },
  { id: "ao-4", title: "Joint Research: Herbal Drug Safety Database", category: "Research Collaboration", organizer: "AIIA + IIT Delhi", location: "New Delhi", duration: "6 months", deadline: "Oct 20, 2025", description: "Collaborative research project on building a comprehensive herb-drug interaction database.", skillsRelevant: ["Data Analysis", "Python", "Clinical Research"], status: "open", interested: 12 },
];

const mockCurriculumLoop: CurriculumLoopStep[] = [
  { id: 1, label: "Industry Demand", description: "Industry reports high demand for Statistical Analysis and ML skills", status: "completed", insight: "72% of posted roles require Statistical Analysis" },
  { id: 2, label: "Skill Gap Detection", description: "Platform identifies gaps: Statistical Analysis (18% coverage), ML (12% coverage)", status: "completed", insight: "20 of 24 students lack Statistical Analysis proficiency" },
  { id: 3, label: "Department Report", description: "Aggregated report generated for Department of Ayurveda", status: "completed", insight: "Report shared with HOD on Sept 1, 2025" },
  { id: 4, label: "Academic Intervention", description: "New modules proposed: Statistics for Healthcare, Python elective", status: "current", insight: "Curriculum committee review scheduled for Sept 15" },
  { id: 5, label: "Student Skill Development", description: "Students enrolled in recommended courses and projects", status: "upcoming", insight: "Expected completion by end of semester" },
  { id: 6, label: "Reassessment", description: "Skills reassessed after intervention completion", status: "upcoming", insight: "Scheduled for Jan 2026" },
];

const mockAnalytics: DepartmentAnalytics = {
  totalStudents: 24, avgSkills: 7.2, avgMatch: 83, avgReadiness: 68,
  readinessDistribution: { beginning: 6, developing: 12, jobReady: 6 },
  skillDistribution: [
    { name: "Python", count: 18, pct: 75 }, { name: "Research", count: 16, pct: 67 },
    { name: "Data Analysis", count: 14, pct: 58 }, { name: "Machine Learning", count: 10, pct: 42 },
    { name: "Clinical Research", count: 8, pct: 33 }, { name: "Statistical Analysis", count: 6, pct: 25 },
    { name: "Scientific Writing", count: 9, pct: 38 },
  ],
  monthlyTrend: [
    { month: "May", verified: 12, placements: 2 }, { month: "Jun", verified: 15, placements: 3 },
    { month: "Jul", verified: 18, placements: 4 }, { month: "Aug", verified: 22, placements: 5 },
    { month: "Sep", verified: 25, placements: 3 },
  ],
  departmentComparison: [
    { dept: "Ayurveda", avgMatch: 83, avgReadiness: 68 }, { dept: "Surgery", avgMatch: 78, avgReadiness: 62 },
    { dept: "Pharmacology", avgMatch: 88, avgReadiness: 75 }, { dept: "Kayachikitsa", avgMatch: 76, avgReadiness: 64 },
  ],
};

const mockDashboard: AcademicianDashboard = {
  academician: mockAcademician, departmentSkills: mockDepartmentSkills,
  demandTrends: mockDemandTrends, industryRoles: mockIndustryRoles,
  curriculumReport: mockCurriculumReport, verifications: mockVerifications,
  opportunities: mockOpportunities, curriculumLoop: mockCurriculumLoop,
  analytics: mockAnalytics,
};

export const facultyApi = {
  async getDashboard(): Promise<AcademicianDashboard> {
    await new Promise((r) => setTimeout(r, 350));
    return structuredClone(mockDashboard);
  },
  async verifyStudent(id: string, action: "approved" | "flagged" | "changes-requested"): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const v = mockVerifications.find((x) => x.id === id);
    if (v) v.status = action;
  },
  async updateSettings(_data: Record<string, unknown>): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
};
