/**
 * SkillBridge — Industry Dashboard data layer.
 *
 * The dashboard renders purely from this module. Everything is shaped like a
 * REST JSON response so that, when the FastAPI backend is ready, only the
 * implementation of each method below needs to change.
 *
 *   Frontend  →  REST API  →  Backend  →  PostgreSQL / ML / Document services
 *
 * NOTE: all values below are SYNTHETIC demo data for the prototype.
 */

/* ═══════════════════════════════════════════════════════
   TypeScript Interfaces
   ═══════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════
   Mock Data
   ═══════════════════════════════════════════════════════ */

const mockCompany: Company = {
  name: "AIIA Research Division",
  initials: "AR",
  description: "Research division of the All India Institute of Ayurveda, focused on clinical research, drug discovery, and evidence-based Ayurvedic medicine.",
  domain: "Healthcare / AYUSH Research",
  orgType: "Government Research Institute",
  location: "New Delhi, India",
  website: "https://aiia.gov.in",
  email: "research@aiia.gov.in",
  phone: "+91 11 2659 3642",
  contactPerson: "Dr. Rajesh Kumar",
  verified: true,
  foundedYear: 2015,
  size: "200-500 employees",
};

const mockOpportunities: Opportunity[] = [
  {
    id: 1, title: "Clinical Research Intern", type: "Internship",
    description: "Work on ongoing clinical trials in Ayurvedic pharmacology. Assist in data collection, patient enrollment, and protocol documentation.",
    openings: 4, location: "New Delhi", workArrangement: "On-site", duration: "3 Months",
    stipend: "₹12,000/month", deadline: "Sept 30, 2025",
    eligibility: { qualification: "BAMS / MBBS / BSc Life Sciences", courses: ["BAMS", "MBBS", "BPharm"], experience: "No prior experience required", otherCriteria: "Must be enrolled in a recognized institution" },
    requiredSkills: [
      { skill: "Python", required: "essential", minProficiency: 70 },
      { skill: "Research Methodology", required: "essential", minProficiency: 60 },
      { skill: "Data Analysis", required: "essential", minProficiency: 65 },
      { skill: "Scientific Writing", required: "preferred", minProficiency: 50 },
      { skill: "Clinical Research", required: "preferred", minProficiency: 40 },
    ],
    registrationRequirements: "Valid AYUSH registration preferred but not mandatory for intern positions",
    status: "active", totalApplicants: 12, shortlistedCount: 3, createdAt: "Aug 15, 2025", blindShortlisting: true,
  },
  {
    id: 2, title: "Research Data Assistant", type: "Part-time",
    description: "Assist in cleaning, analyzing, and visualizing clinical trial data using Python and statistical tools.",
    openings: 2, location: "New Delhi", workArrangement: "Hybrid", duration: "6 Months",
    stipend: "₹15,000/month", deadline: "Oct 15, 2025",
    eligibility: { qualification: "BSc / MSc Statistics / Computer Science / Life Sciences", courses: ["BSc", "MSc", "BCA"], experience: "6 months relevant experience", otherCriteria: "Proficiency in Python required" },
    requiredSkills: [
      { skill: "Python", required: "essential", minProficiency: 80 },
      { skill: "Data Analysis", required: "essential", minProficiency: 75 },
      { skill: "Machine Learning", required: "preferred", minProficiency: 50 },
      { skill: "Statistical Analysis", required: "essential", minProficiency: 70 },
    ],
    status: "active", totalApplicants: 8, shortlistedCount: 2, createdAt: "Aug 20, 2025", blindShortlisting: false,
  },
  {
    id: 3, title: "AYUSH Public Health Intern", type: "Internship",
    description: "Support field research on AYUSH healthcare delivery in rural communities.",
    openings: 3, location: "Jaipur, Rajasthan", workArrangement: "On-site", duration: "2 Months",
    stipend: "₹8,000/month", deadline: "Sept 20, 2025",
    eligibility: { qualification: "BAMS / BPublicHealth", courses: ["BAMS", "BPH"], experience: "No prior experience required", otherCriteria: "Willingness to travel to rural areas" },
    requiredSkills: [
      { skill: "Research", required: "essential", minProficiency: 50 },
      { skill: "Data Analysis", required: "preferred", minProficiency: 40 },
      { skill: "Clinical Research", required: "preferred", minProficiency: 35 },
    ],
    status: "closing", totalApplicants: 5, shortlistedCount: 1, createdAt: "Jul 10, 2025", blindShortlisting: false,
  },
  {
    id: 4, title: "Herbal Pharmacovigilance Intern", type: "Internship",
    description: "Monitor and document adverse drug reactions for AYUSH herbal formulations.",
    openings: 2, location: "New Delhi", workArrangement: "On-site", duration: "4 Months",
    stipend: "₹10,000/month", deadline: "Oct 5, 2025",
    eligibility: { qualification: "BAMS / BPharm / MPharm", courses: ["BAMS", "BPharm"], experience: "1 year preferred", otherCriteria: "Knowledge of pharmacovigilance concepts" },
    requiredSkills: [
      { skill: "Clinical Research", required: "essential", minProficiency: 60 },
      { skill: "Scientific Writing", required: "essential", minProficiency: 55 },
      { skill: "Data Analysis", required: "preferred", minProficiency: 45 },
    ],
    status: "draft", totalApplicants: 0, shortlistedCount: 0, createdAt: "Sept 1, 2025", blindShortlisting: false,
  },
];

const mockApplications: Application[] = [
  {
    id: 1, opportunityId: 1, opportunityTitle: "Clinical Research Intern",
    candidate: {
      id: 1, name: "Aarav Sharma", initials: "AS", course: "BAMS", year: "3rd Year", institution: "AIIA",
      skills: [
        { name: "Python", confidence: 92, verified: true, source: "NPTEL Certificate" },
        { name: "Research Methodology", confidence: 81, verified: true, source: "Academic Transcript" },
        { name: "Data Analysis", confidence: 76, verified: true, source: "Project Work" },
        { name: "Scientific Writing", confidence: 64, verified: false },
      ],
      verifiedSkills: 4, totalSkills: 7, certifications: 2, projects: 3,
      evidence: [
        { type: "Certificate", title: "Python for Research", issuer: "NPTEL", date: "Jul 2025", verified: true },
        { type: "Project", title: "CVD Risk Prediction Model", issuer: "AIIA", date: "Jun 2025", verified: true },
      ],
      roleReadiness: "Almost Ready", readinessScore: 82,
    },
    matchScore: 92, matchedSkills: ["Python", "Research Methodology", "Data Analysis"], missingSkills: ["Scientific Writing"],
    stage: "shortlisted", appliedDate: "Sept 3, 2025", lastUpdated: "Sept 5, 2025", notes: "Strong technical background", interviewDate: "Sept 10, 2025",
  },
  {
    id: 2, opportunityId: 1, opportunityTitle: "Clinical Research Intern",
    candidate: {
      id: 2, name: "Meera Joshi", initials: "MJ", course: "BAMS", year: "Final Year", institution: "BHU",
      skills: [
        { name: "Python", confidence: 85, verified: true, source: "Course Certificate" },
        { name: "Research Methodology", confidence: 88, verified: true, source: "Thesis" },
        { name: "Clinical Research", confidence: 78, verified: true, source: "Internship" },
        { name: "Scientific Writing", confidence: 82, verified: true, source: "Published Paper" },
      ],
      verifiedSkills: 6, totalSkills: 9, certifications: 4, projects: 5,
      evidence: [
        { type: "Publication", title: "AYUSH Clinical Outcomes Review", issuer: "Journal of Ayurveda", date: "May 2025", verified: true },
        { type: "Certificate", title: "Clinical Research Methods", issuer: "ICMR", date: "Mar 2025", verified: true },
      ],
      roleReadiness: "Ready", readinessScore: 95,
    },
    matchScore: 95, matchedSkills: ["Python", "Research Methodology", "Data Analysis", "Clinical Research"], missingSkills: [],
    stage: "interviewed", appliedDate: "Sept 1, 2025", lastUpdated: "Sept 6, 2025", notes: "Excellent interview performance", interviewDate: "Sept 6, 2025",
  },
  {
    id: 3, opportunityId: 1, opportunityTitle: "Clinical Research Intern",
    candidate: {
      id: 3, name: "Rohan Patel", initials: "RP", course: "BAMS", year: "4th Year", institution: "Gujarat Ayurveda University",
      skills: [
        { name: "Python", confidence: 70, verified: false },
        { name: "Research Methodology", confidence: 75, verified: true, source: "Project Report" },
        { name: "Data Analysis", confidence: 68, verified: false },
      ],
      verifiedSkills: 3, totalSkills: 5, certifications: 1, projects: 2,
      evidence: [
        { type: "Project", title: "Herbal Drug Efficacy Study", issuer: "GAU", date: "Apr 2025", verified: true },
      ],
      roleReadiness: "Almost Ready", readinessScore: 72,
    },
    matchScore: 78, matchedSkills: ["Research Methodology", "Data Analysis"], missingSkills: ["Python", "Scientific Writing"],
    stage: "applied", appliedDate: "Sept 4, 2025", lastUpdated: "Sept 4, 2025", notes: "",
  },
  {
    id: 4, opportunityId: 2, opportunityTitle: "Research Data Assistant",
    candidate: {
      id: 4, name: "Neha Gupta", initials: "NG", course: "BSc Computer Science", year: "3rd Year", institution: "DU",
      skills: [
        { name: "Python", confidence: 88, verified: true, source: "GitHub Portfolio" },
        { name: "Data Analysis", confidence: 82, verified: true, source: "Kaggle Competitions" },
        { name: "Machine Learning", confidence: 75, verified: true, source: "NPTEL Certificate" },
        { name: "Statistical Analysis", confidence: 80, verified: true, source: "Coursework" },
      ],
      verifiedSkills: 5, totalSkills: 6, certifications: 3, projects: 4,
      evidence: [
        { type: "Portfolio", title: "Data Science Portfolio", issuer: "GitHub", date: "Aug 2025", verified: true },
        { type: "Certificate", title: "Machine Learning Specialization", issuer: "Coursera", date: "Jun 2025", verified: true },
      ],
      roleReadiness: "Ready", readinessScore: 88,
    },
    matchScore: 90, matchedSkills: ["Python", "Data Analysis", "Machine Learning", "Statistical Analysis"], missingSkills: [],
    stage: "offered", appliedDate: "Aug 25, 2025", lastUpdated: "Sept 2, 2025", notes: "Outstanding technical assessment",
  },
];

const mockSLATrackers: SLATracker[] = [
  { applicationId: 3, candidateName: "Rohan Patel", opportunityTitle: "Clinical Research Intern", appliedDate: "Sept 4, 2025", deadline: "Sept 11, 2025", timeRemaining: "6 days", slaStatus: "on-track", daysRemaining: 6 },
  { applicationId: 1, candidateName: "Aarav Sharma", opportunityTitle: "Clinical Research Intern", appliedDate: "Sept 3, 2025", deadline: "Sept 10, 2025", timeRemaining: "5 days", slaStatus: "on-track", daysRemaining: 5 },
];

const mockAnalytics: IndustryAnalytics = {
  totalOpportunities: 4, activeOpportunities: 2, totalApplicants: 25,
  shortlistingRate: 32, fillRate: 75, avgTimeToHire: 14,
  pipeline: [
    { stage: "Applied", count: 25 }, { stage: "Shortlisted", count: 8 },
    { stage: "Interviewed", count: 5 }, { stage: "Offered", count: 3 }, { stage: "Joined", count: 2 },
  ],
  topCandidateSkills: [
    { skill: "Python", count: 18, pct: 72 }, { skill: "Research Methodology", count: 14, pct: 56 },
    { skill: "Data Analysis", count: 12, pct: 48 }, { skill: "Clinical Research", count: 8, pct: 32 },
    { skill: "Scientific Writing", count: 6, pct: 24 },
  ],
  applicantSkillGaps: [
    { skill: "Statistical Analysis", gapCount: 15, pct: 60 },
    { skill: "Machine Learning", gapCount: 12, pct: 48 },
    { skill: "Scientific Writing", gapCount: 10, pct: 40 },
  ],
  monthlyTrend: [
    { month: "May", applicants: 8, shortlisted: 3, hired: 1 },
    { month: "Jun", applicants: 12, shortlisted: 4, hired: 2 },
    { month: "Jul", applicants: 15, shortlisted: 5, hired: 2 },
    { month: "Aug", applicants: 22, shortlisted: 7, hired: 3 },
    { month: "Sep", applicants: 25, shortlisted: 8, hired: 2 },
  ],
  opportunityPerformance: [
    { title: "Clinical Research Intern", applicants: 12, fillRate: 75, avgMatch: 85 },
    { title: "Research Data Assistant", applicants: 8, fillRate: 50, avgMatch: 82 },
    { title: "AYUSH Public Health Intern", applicants: 5, fillRate: 67, avgMatch: 74 },
  ],
};

const mockRatings: Rating[] = [
  { id: 1, from: "Meera Joshi", fromType: "student", to: "AIIA Research Division", toType: "industry", score: 5, feedback: "Excellent mentorship and research exposure. The clinical trial work was incredibly enriching.", date: "Aug 2025", opportunity: "Clinical Research Intern" },
  { id: 2, from: "AIIA Research Division", fromType: "industry", to: "Meera Joshi", toType: "student", score: 5, feedback: "Outstanding performance. Strong research skills and excellent documentation.", date: "Aug 2025", opportunity: "Clinical Research Intern" },
  { id: 3, from: "Neha Gupta", fromType: "student", to: "AIIA Research Division", toType: "industry", score: 4, feedback: "Great learning environment. Could improve on-boarding process for new interns.", date: "Jul 2025", opportunity: "Research Data Assistant" },
];

const mockDashboard: IndustryDashboard = {
  company: mockCompany, opportunities: mockOpportunities, applications: mockApplications,
  slaTrackers: mockSLATrackers, analytics: mockAnalytics, ratings: mockRatings,
};

/* ═══════════════════════════════════════════════════════
   API Layer
   ═══════════════════════════════════════════════════════ */

export const industryApi = {
  /** GET /api/industry/dashboard */
  async getDashboard(): Promise<IndustryDashboard> {
    await new Promise((r) => setTimeout(r, 350));
    return structuredClone(mockDashboard);
  },
  /** POST /api/industry/opportunities */
  async createOpportunity(_data: Omit<Opportunity, "id" | "totalApplicants" | "shortlistedCount" | "createdAt">): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
  /** PUT /api/industry/opportunities/:id */
  async updateOpportunity(_id: number, _data: Partial<Opportunity>): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
  /** POST /api/industry/applications/:id/shortlist */
  async shortlistCandidate(id: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const app = mockApplications.find((a) => a.id === id);
    if (app) app.stage = "shortlisted";
  },
  /** POST /api/industry/applications/:id/interview */
  async moveToInterview(id: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const app = mockApplications.find((a) => a.id === id);
    if (app) app.stage = "interviewed";
  },
  /** POST /api/industry/applications/:id/offer */
  async makeOffer(id: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const app = mockApplications.find((a) => a.id === id);
    if (app) app.stage = "offered";
  },
  /** POST /api/industry/applications/:id/reject */
  async rejectCandidate(id: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    const app = mockApplications.find((a) => a.id === id);
    if (app) app.stage = "rejected";
  },
  /** PUT /api/industry/settings */
  async updateSettings(_data: Partial<Company>): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
  /** POST /api/industry/ratings */
  async submitRating(_data: Omit<Rating, "id">): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
  },
};
