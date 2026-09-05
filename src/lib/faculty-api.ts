/**
 * SkillBridge — Faculty Dashboard data layer.
 *
 * The dashboard renders purely from this module. Everything is shaped like a
 * REST JSON response so that, when the FastAPI backend is ready, only the
 * implementation of each method below needs to change — the page components
 * stay untouched.
 *
 *   Frontend  →  REST API  →  Backend  →  PostgreSQL / ML / Document services
 *
 * Replace the body of each function with, for example:
 *
 *   export const facultyApi = {
 *     async getDashboard(): Promise<FacultyDashboard> {
 *       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/faculty/dashboard`);
 *       if (!res.ok) throw new Error(`Dashboard request failed (${res.status})`);
 *       return res.json();
 *     },
 *     async getStudents(): Promise<FacultyStudent[]> { ... },
 *     async reviewEvidence(id: string, action: "approve" | "flag"): Promise<void> { ... },
 *     async postOpportunity(data: PostOpportunityPayload): Promise<void> { ... },
 *     async shortlistApplication(id: string): Promise<void> { ... },
 *     async updateSettings(data: FacultySettingsPayload): Promise<void> { ... },
 *   };
 *
 * NOTE: all values below are SYNTHETIC demo data for the prototype.
 */

/* ═══════════════════════════════════════════════════════
   TypeScript Interfaces
   ═══════════════════════════════════════════════════════ */

export interface Faculty {
  name: string;
  initials: string;
  title: string;
  department: string;
  institution: string;
  email: string;
  phone: string;
  bio: string;
  studentsCount: number;
  pendingReviews: number;
  opportunitiesPosted: number;
  verifiedStudents: number;
}

export type StudentStatus = "active" | "pending" | "inactive";

export interface FacultyStudent {
  id: number;
  name: string;
  initials: string;
  course: string;
  year: string;
  skills: number;
  verified: number;
  match: number;
  status: StudentStatus;
  lastActive: string;
}

export type EvidenceStatus = "pending" | "flagged" | "approved";

export interface PendingEvidence {
  id: number;
  student: string;
  initials: string;
  name: string;
  type: "Project" | "Certificate" | "Transcript" | "Portfolio" | "Document" | "Log";
  submitted: string;
  status: EvidenceStatus;
}

export type OpportunityStatus = "active" | "closing" | "closed";

export interface PostedOpportunity {
  id: number;
  title: string;
  org: string;
  location: string;
  duration: string;
  applicants: number;
  match: number;
  status: OpportunityStatus;
}

export type ApplicationReviewStatus = "new" | "reviewed" | "shortlisted" | "rejected";

export interface ApplicationToReview {
  id: number;
  student: string;
  initials: string;
  role: string;
  org: string;
  match: number;
  applied: string;
  status: ApplicationReviewStatus;
}

export interface SkillDistribution {
  name: string;
  count: number;
  pct: number;
}

export interface GapSeverity {
  high: number;
  medium: number;
  low: number;
}

export interface FacultyAnalytics {
  avgSkills: number;
  avgMatch: number;
  topSkill: string;
  weakSkill: string;
  skillDistribution: SkillDistribution[];
  gapSeverity: GapSeverity;
}

export interface FacultyRecommendation {
  title: string;
  type: "Course" | "Workshop" | "Learning path";
  students: number;
  gap: string;
  provider: string;
}

export interface FacultySettingsPayload {
  name: string;
  email: string;
  phone: string;
  department: string;
  institution: string;
  bio: string;
  autoApprove: boolean;
  notifEmail: boolean;
  notifApp: boolean;
  notifNewApp: boolean;
  notifWeekly: boolean;
}

export interface FacultyDashboard {
  faculty: Faculty;
  students: FacultyStudent[];
  pendingEvidence: PendingEvidence[];
  postedOpportunities: PostedOpportunity[];
  applicationsToReview: ApplicationToReview[];
  analytics: FacultyAnalytics;
  recommendations: FacultyRecommendation[];
}

/* ═══════════════════════════════════════════════════════
   Mock Data
   ═══════════════════════════════════════════════════════ */

const mockFaculty: Faculty = {
  name: "Dr. Priya Mehta",
  initials: "PM",
  title: "Professor of Ayurveda & Research",
  department: "Department of Ayurveda",
  institution: "All India Institute of Ayurveda",
  email: "priya.mehta@aiia.ac.in",
  phone: "+91 98765 12345",
  bio: "Professor with 12 years of experience in clinical research, AYUSH studies, and mentorship. Specializing in evidence-based Ayurvedic research methodologies.",
  studentsCount: 24,
  pendingReviews: 7,
  opportunitiesPosted: 3,
  verifiedStudents: 18,
};

const mockStudents: FacultyStudent[] = [
  { id: 1, name: "Aarav Sharma", initials: "AS", course: "BAMS", year: "3rd Year", skills: 7, verified: 4, match: 92, status: "active", lastActive: "2 hours ago" },
  { id: 2, name: "Neha Gupta", initials: "NG", course: "BAMS", year: "2nd Year", skills: 5, verified: 3, match: 78, status: "active", lastActive: "1 day ago" },
  { id: 3, name: "Rohan Patel", initials: "RP", course: "BAMS", year: "4th Year", skills: 9, verified: 7, match: 88, status: "active", lastActive: "5 hours ago" },
  { id: 4, name: "Ananya Reddy", initials: "AR", course: "BAMS", year: "3rd Year", skills: 6, verified: 5, match: 85, status: "pending", lastActive: "3 days ago" },
  { id: 5, name: "Vikram Singh", initials: "VS", course: "BAMS", year: "2nd Year", skills: 4, verified: 2, match: 65, status: "active", lastActive: "12 hours ago" },
  { id: 6, name: "Meera Joshi", initials: "MJ", course: "BAMS", year: "Final Year", skills: 11, verified: 9, match: 95, status: "active", lastActive: "30 min ago" },
];

const mockPendingEvidence: PendingEvidence[] = [
  { id: 1, student: "Aarav Sharma", initials: "AS", name: "Research Project Report", type: "Project", submitted: "Sept 3, 2025", status: "pending" },
  { id: 2, student: "Neha Gupta", initials: "NG", name: "Clinical Posting Certificate", type: "Certificate", submitted: "Sept 2, 2025", status: "pending" },
  { id: 3, student: "Rohan Patel", initials: "RP", name: "NPTEL Course Certificate", type: "Certificate", submitted: "Sept 1, 2025", status: "pending" },
  { id: 4, student: "Ananya Reddy", initials: "AR", name: "Academic Transcript", type: "Transcript", submitted: "Aug 30, 2025", status: "flagged" },
  { id: 5, student: "Vikram Singh", initials: "VS", name: "Workshop Attendance", type: "Certificate", submitted: "Aug 28, 2025", status: "pending" },
];

const mockPostedOpportunities: PostedOpportunity[] = [
  { id: 1, title: "Clinical Research Intern", org: "AIIA / Research Division", location: "New Delhi", duration: "3 Months", applicants: 12, match: 92, status: "active" },
  { id: 2, title: "AYUSH Research Internship", org: "NIA / Jaipur", location: "Jaipur", duration: "2 Months", applicants: 8, match: 78, status: "active" },
  { id: 3, title: "Public Health Analyst Intern", org: "MoHFW / Delhi", location: "New Delhi", duration: "4 Months", applicants: 5, match: 72, status: "closing" },
];

const mockApplicationsToReview: ApplicationToReview[] = [
  { id: 1, student: "Aarav Sharma", initials: "AS", role: "Clinical Research Intern", org: "AIIA / Research Division", match: 92, applied: "Sept 3, 2025", status: "new" },
  { id: 2, student: "Neha Gupta", initials: "NG", role: "AYUSH Research Internship", org: "NIA / Jaipur", match: 78, applied: "Sept 2, 2025", status: "reviewed" },
  { id: 3, student: "Rohan Patel", initials: "RP", role: "Clinical Research Intern", org: "AIIA / Research Division", match: 88, applied: "Sept 1, 2025", status: "shortlisted" },
  { id: 4, student: "Meera Joshi", initials: "MJ", role: "Public Health Analyst Intern", org: "MoHFW / Delhi", match: 95, applied: "Aug 30, 2025", status: "new" },
];

const mockAnalytics: FacultyAnalytics = {
  avgSkills: 7.2,
  avgMatch: 83,
  topSkill: "Python",
  weakSkill: "Statistical Analysis",
  skillDistribution: [
    { name: "Python", count: 18, pct: 75 },
    { name: "Research", count: 16, pct: 67 },
    { name: "Data Analysis", count: 14, pct: 58 },
    { name: "Machine Learning", count: 10, pct: 42 },
    { name: "Clinical Research", count: 8, pct: 33 },
    { name: "Statistical Analysis", count: 6, pct: 25 },
    { name: "Scientific Writing", count: 9, pct: 38 },
  ],
  gapSeverity: { high: 3, medium: 5, low: 8 },
};

const mockRecommendations: FacultyRecommendation[] = [
  { title: "Statistics for Health Research", type: "Course", students: 5, gap: "Statistical Analysis", provider: "NPTEL" },
  { title: "Scientific Writing Fundamentals", type: "Course", students: 4, gap: "Scientific Writing", provider: "Coursera" },
  { title: "Research Methods in Healthcare", type: "Course", students: 3, gap: "Research Methodology", provider: "edX" },
  { title: "GCP & Clinical Trial Basics", type: "Workshop", students: 6, gap: "Clinical Trial Documentation", provider: "AIIA" },
];

const mockDashboard: FacultyDashboard = {
  faculty: mockFaculty,
  students: mockStudents,
  pendingEvidence: mockPendingEvidence,
  postedOpportunities: mockPostedOpportunities,
  applicationsToReview: mockApplicationsToReview,
  analytics: mockAnalytics,
  recommendations: mockRecommendations,
};

/* ═══════════════════════════════════════════════════════
   API Layer — swap mock bodies for real fetch calls
   ═══════════════════════════════════════════════════════ */

export const facultyApi = {
  /** GET /api/faculty/dashboard */
  async getDashboard(): Promise<FacultyDashboard> {
    await new Promise((r) => setTimeout(r, 350));
    return structuredClone(mockDashboard);
  },

  /** POST /api/faculty/evidence/:id/approve */
  async approveEvidence(id: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const ev = mockPendingEvidence.find((e) => e.id === id);
    if (ev) ev.status = "approved";
  },

  /** POST /api/faculty/evidence/:id/flag */
  async flagEvidence(id: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const ev = mockPendingEvidence.find((e) => e.id === id);
    if (ev) ev.status = "flagged";
  },

  /** POST /api/faculty/applications/:id/shortlist */
  async shortlistApplication(id: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const app = mockApplicationsToReview.find((a) => a.id === id);
    if (app) app.status = "shortlisted";
  },

  /** PUT /api/faculty/settings */
  async updateSettings(_data: FacultySettingsPayload): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    // In production: PUT /api/faculty/settings with _data body
  },

  /** POST /api/faculty/opportunities */
  async postOpportunity(_data: Omit<PostedOpportunity, "id" | "applicants">): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    // In production: POST /api/faculty/opportunities with _data body
  },
};
