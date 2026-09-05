/**
 * Lead2Learn — Institution Admin Dashboard data layer.
 *   Frontend  →  REST API  →  Backend  →  PostgreSQL / ML / Document services
 * NOTE: all values below are SYNTHETIC demo data for the prototype.
 */

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

/* ─── Placements ─── */
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

/* ─── Skill Development ─── */
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

export interface SkillTrend {
  skill: string;
  months: { month: string; count: number }[];
}

/* ─── Departments ─── */
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

/* ─── Anomalies ─── */
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

/* ─── Reports ─── */
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

/* ─── Analytics ─── */
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

/* ─── Dashboard ─── */
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

/* ═══════════════════════════════════════════════════════
   Mock Data
   ═══════════════════════════════════════════════════════ */

const mockInstitution: Institution = {
  name: "All India Institute of Ayurveda", initials: "AIIA",
  location: "New Delhi, India", type: "Government Institute", establishedYear: 2015,
  departments: ["Ayurveda", "Surgery", "Pharmacology", "Kayachikitsa", "Shalya Tantra", "Shaalakya Tantra"],
  totalStudents: 320, totalFaculty: 48, website: "https://aiia.gov.in",
  email: "admin@aiia.gov.in", phone: "+91 11 2659 3642", verified: true,
};

const mockPlacements: PlacementRecord[] = [
  { id: "pl-1", studentName: "Aarav Sharma", studentInitials: "AS", department: "Ayurveda", course: "BAMS", company: "AIIA Research Division", role: "Clinical Research Intern", type: "Internship", startDate: "Sept 2025", duration: "3 Months", stipend: "₹12,000/month", status: "active" },
  { id: "pl-2", studentName: "Meera Joshi", studentInitials: "MJ", department: "Ayurveda", course: "BAMS", company: "NIA Jaipur", role: "AYUSH Research Intern", type: "Internship", startDate: "Aug 2025", duration: "2 Months", stipend: "₹8,000/month", status: "completed" },
  { id: "pl-3", studentName: "Neha Gupta", studentInitials: "NG", department: "Pharmacology", course: "BPharm", company: "CCRAS", role: "Research Data Assistant", type: "Placement", startDate: "Aug 2025", duration: "6 Months", stipend: "₹15,000/month", status: "active" },
  { id: "pl-4", studentName: "Rohan Patel", studentInitials: "RP", department: "Ayurveda", course: "BAMS", company: "MoHFW", role: "Public Health Analyst", type: "Internship", startDate: "Jul 2025", duration: "4 Months", stipend: "₹10,000/month", status: "completed" },
  { id: "pl-5", studentName: "Ananya Reddy", studentInitials: "AR", department: "Kayachikitsa", course: "BAMS", company: "AIIA", role: "Clinical Assistant", type: "Placement", startDate: "Sept 2025", duration: "12 Months", stipend: "₹18,000/month", status: "offered" },
  { id: "pl-6", studentName: "Vikram Singh", studentInitials: "VS", department: "Surgery", course: "BAMS", company: "AIIMS Delhi", role: "Surgical Research Intern", type: "Internship", startDate: "Sept 2025", duration: "3 Months", stipend: "₹12,000/month", status: "active" },
];

const mockDepartmentPlacements: DepartmentPlacement[] = [
  { department: "Ayurveda", totalStudents: 85, placed: 52, placementRate: 61, avgStipend: "₹11,000/mo", topCompany: "AIIA" },
  { department: "Surgery", totalStudents: 45, placed: 28, placementRate: 62, avgStipend: "₹13,000/mo", topCompany: "AIIMS" },
  { department: "Pharmacology", totalStudents: 60, placed: 41, placementRate: 68, avgStipend: "₹14,000/mo", topCompany: "CCRAS" },
  { department: "Kayachikitsa", totalStudents: 55, placed: 30, placementRate: 55, avgStipend: "₹10,000/mo", topCompany: "AIIA" },
  { department: "Shalya Tantra", totalStudents: 40, placed: 20, placementRate: 50, avgStipend: "₹9,000/mo", topCompany: "MoHFW" },
  { department: "Shaalakya Tantra", totalStudents: 35, placed: 18, placementRate: 51, avgStipend: "₹9,500/mo", topCompany: "NIA" },
];

const mockPlacementTrends: PlacementTrend[] = [
  { month: "May", placements: 8, internships: 12, applications: 45 },
  { month: "Jun", placements: 10, internships: 15, applications: 52 },
  { month: "Jul", placements: 12, internships: 18, applications: 60 },
  { month: "Aug", placements: 15, internships: 22, applications: 72 },
  { month: "Sep", placements: 12, internships: 20, applications: 68 },
];

const mockSkillMetrics: SkillMetric[] = [
  { name: "Python", verifiedCount: 120, selfDeclaredCount: 85, totalCount: 205, avgConfidence: 72, trend: "up" },
  { name: "Research Methodology", verifiedCount: 140, selfDeclaredCount: 60, totalCount: 200, avgConfidence: 68, trend: "stable" },
  { name: "Data Analysis", verifiedCount: 100, selfDeclaredCount: 90, totalCount: 190, avgConfidence: 65, trend: "up" },
  { name: "Clinical Research", verifiedCount: 80, selfDeclaredCount: 70, totalCount: 150, avgConfidence: 58, trend: "up" },
  { name: "Statistical Analysis", verifiedCount: 45, selfDeclaredCount: 60, totalCount: 105, avgConfidence: 42, trend: "stable" },
  { name: "Machine Learning", verifiedCount: 35, selfDeclaredCount: 50, totalCount: 85, avgConfidence: 38, trend: "up" },
  { name: "Scientific Writing", verifiedCount: 70, selfDeclaredCount: 55, totalCount: 125, avgConfidence: 55, trend: "stable" },
];

const mockReadinessDistribution: ReadinessDistribution[] = [
  { department: "Ayurveda", beginning: 20, developing: 42, jobReady: 23, total: 85 },
  { department: "Surgery", beginning: 12, developing: 22, jobReady: 11, total: 45 },
  { department: "Pharmacology", beginning: 10, developing: 28, jobReady: 22, total: 60 },
  { department: "Kayachikitsa", beginning: 15, developing: 28, jobReady: 12, total: 55 },
  { department: "Shalya Tantra", beginning: 12, developing: 20, jobReady: 8, total: 40 },
  { department: "Shaalakya Tantra", beginning: 10, developing: 18, jobReady: 7, total: 35 },
];

const mockDepartmentComparison: DepartmentComparison[] = [
  { name: "Ayurveda", students: 85, avgSkills: 7.2, avgMatch: 83, avgReadiness: 68, placementRate: 61, verifiedPct: 58, topGap: "Statistical Analysis", internshipParticipation: 72 },
  { name: "Surgery", students: 45, avgSkills: 6.8, avgMatch: 78, avgReadiness: 62, placementRate: 62, verifiedPct: 55, topGap: "Machine Learning", internshipParticipation: 65 },
  { name: "Pharmacology", students: 60, avgSkills: 8.1, avgMatch: 88, avgReadiness: 75, placementRate: 68, verifiedPct: 65, topGap: "Data Analysis", internshipParticipation: 78 },
  { name: "Kayachikitsa", students: 55, avgSkills: 6.5, avgMatch: 76, avgReadiness: 64, placementRate: 55, verifiedPct: 50, topGap: "Python", internshipParticipation: 60 },
  { name: "Shalya Tantra", students: 40, avgSkills: 5.8, avgMatch: 70, avgReadiness: 58, placementRate: 50, verifiedPct: 45, topGap: "Research Methodology", internshipParticipation: 52 },
  { name: "Shaalakya Tantra", students: 35, avgSkills: 5.5, avgMatch: 68, avgReadiness: 55, placementRate: 51, verifiedPct: 42, topGap: "Clinical Research", internshipParticipation: 48 },
];

const mockAnomalies: AnomalyFlag[] = [
  { id: "an-1", studentName: "Ravi Kumar", studentInitials: "RK", department: "Ayurveda", type: "Duplicate Record", description: "Two identical internship records detected for the same company and period.", severity: "high", status: "flagged", flaggedDate: "Sept 3, 2025", evidence: "Duplicate entries: AIIA internship Sept 2025 submitted twice with identical dates." },
  { id: "an-2", studentName: "Priya Desai", studentInitials: "PD", department: "Pharmacology", type: "Statistical Outlier", description: "Claimed 12 verified skills when department average is 6.8.", severity: "medium", status: "reviewing", flaggedDate: "Sept 2, 2025", evidence: "12 verified skills vs department avg 6.8. All skills added within 48 hours." },
  { id: "an-3", studentName: "Amit Verma", studentInitials: "AV", department: "Surgery", type: "Inconsistent Data", description: "Placement record shows company that closed 6 months ago.", severity: "high", status: "flagged", flaggedDate: "Sept 1, 2025", evidence: "Company 'HealthTech Solutions' officially closed March 2025. Record claims Sept 2025 placement." },
  { id: "an-4", studentName: "Sneha Rao", studentInitials: "SR", department: "Kayachikitsa", type: "Unusual Pattern", description: "5 internships claimed in a single month, exceeding maximum allowed.", severity: "medium", status: "resolved", flaggedDate: "Aug 28, 2025", evidence: "5 internships in Aug 2025. Institution policy allows max 2 concurrent." },
  { id: "an-5", studentName: "Deepak Joshi", studentInitials: "DJ", department: "Shalya Tantra", type: "Duplicate Record", description: "Same certificate uploaded with different metadata.", severity: "low", status: "escalated", flaggedDate: "Aug 25, 2025", evidence: "NPTEL certificate hash matches existing record under different student ID." },
];

const mockReports: InstitutionalReport[] = [
  { id: "rpt-1", title: "Q3 2025 Placement Report", type: "Placement", period: "July - September 2025", generatedDate: "Sept 5, 2025", departments: ["All"], summary: "Overall placement rate improved to 58% from 52% in Q2.", keyFindings: ["Pharmacology leads with 68% placement rate", "Ayurveda department has highest absolute placements (52)", "Average stipend increased 12% to ₹11,500/month"], status: "ready" },
  { id: "rpt-2", title: "Skill Development Analysis", type: "Skill Development", period: "August 2025", generatedDate: "Sept 1, 2025", departments: ["All"], summary: "Python remains top verified skill. Statistical Analysis gap persists.", keyFindings: ["Python verified: 120 students (+15 from July)", "Statistical Analysis: only 45 verified out of 320 students", "ML skills showing fastest growth (+28% month-over-month)"], status: "ready" },
  { id: "rpt-3", title: "Department Performance Comparison", type: "Readiness", period: "Q3 2025", generatedDate: "Sept 3, 2025", departments: ["All"], summary: "Pharmacology shows best readiness scores. Shalya Tantra needs intervention.", keyFindings: ["Pharmacology avg readiness: 75% (highest)", "Shalya Tantra avg readiness: 58% (lowest)", "4 departments below 60% job-ready rate"], status: "ready" },
  { id: "rpt-4", title: "Industry Engagement Summary", type: "Industry Engagement", period: "Q3 2025", generatedDate: "Sept 4, 2025", departments: ["All"], summary: "12 active industry partners. CCRAS and AIIA top recruiters.", keyFindings: ["12 industry partners providing opportunities", "CCRAS: 8 hires, AIIA: 6 hires this quarter", "3 new partnerships established (MoHFW, NIA, AIIMS)"], status: "ready" },
  { id: "rpt-5", title: "Anomaly Investigation Report", type: "Anomaly", period: "August 2025", generatedDate: "Sept 2, 2025", departments: ["Ayurveda", "Pharmacology", "Surgery"], summary: "5 anomalies flagged, 1 resolved, 1 escalated.", keyFindings: ["2 high-severity anomalies pending review", "1 resolved (concurrent internship policy violation)", "1 escalated (duplicate certificate across student IDs)"], status: "ready" },
];

const mockAnalytics: InstitutionAnalytics = {
  totalStudents: 320, totalPlaced: 189, placementRate: 59, internshipRate: 72, avgReadiness: 64, avgSkills: 6.8,
  industryPartners: 12,
  monthlyTrend: [
    { month: "May", placements: 8, internships: 12, verified: 45 },
    { month: "Jun", placements: 10, internships: 15, verified: 52 },
    { month: "Jul", placements: 12, internships: 18, verified: 60 },
    { month: "Aug", placements: 15, internships: 22, verified: 72 },
    { month: "Sep", placements: 12, internships: 20, verified: 68 },
  ],
  skillGaps: [
    { skill: "Statistical Analysis", gapCount: 215, pct: 67 },
    { skill: "Machine Learning", gapCount: 235, pct: 73 },
    { skill: "Data Management", gapCount: 180, pct: 56 },
    { skill: "Clinical Research", gapCount: 170, pct: 53 },
  ],
  industryEngagement: [
    { company: "AIIA", opportunities: 8, hired: 6 },
    { company: "CCRAS", opportunities: 6, hired: 8 },
    { company: "AIIMS", opportunities: 5, hired: 4 },
    { company: "MoHFW", opportunities: 4, hired: 3 },
    { company: "NIA", opportunities: 3, hired: 2 },
  ],
};

const mockDashboard: InstitutionDashboard = {
  institution: mockInstitution, placements: mockPlacements, departmentPlacements: mockDepartmentPlacements,
  placementTrends: mockPlacementTrends, skillMetrics: mockSkillMetrics, readinessDistribution: mockReadinessDistribution,
  departmentComparison: mockDepartmentComparison, anomalies: mockAnomalies, reports: mockReports, analytics: mockAnalytics,
};

export const institutionApi = {
  async getDashboard(): Promise<InstitutionDashboard> {
    await new Promise((r) => setTimeout(r, 350));
    return structuredClone(mockDashboard);
  },
  async reviewAnomaly(id: string, action: "resolve" | "escalate"): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const a = mockAnomalies.find((x) => x.id === id);
    if (a) a.status = action === "resolve" ? "resolved" : "escalated";
  },
  async updateSettings(_data: Record<string, unknown>): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
};
