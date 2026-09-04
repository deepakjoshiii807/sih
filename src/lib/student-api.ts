/**
 * SkillBridge — Student Dashboard data layer.
 *
 * The dashboard renders purely from this module. Everything is shaped like a
 * REST JSON response so that, when the FastAPI backend is ready, only the
 * implementation of `api.getDashboard()` below needs to change — the page
 * component stays untouched.
 *
 *   Frontend  →  REST API  →  Backend  →  PostgreSQL / ML / Document services
 *
 * Replace the body of `getDashboard` with, for example:
 *
 *   export const studentApi = {
 *     async getDashboard(): Promise<StudentDashboard> {
 *       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/student/dashboard`);
 *       if (!res.ok) throw new Error(`Dashboard request failed (${res.status})`);
 *       return res.json();
 *     },
 *   };
 *
 * NOTE: all values below are SYNTHETIC demo data for the prototype.
 */

export type SkillOrigin = "evidence" | "self-declared";

export interface Student {
  name: string;
  initials: string;
  course: string;
  year: string;
  institution: string;
  location: string;
  targetRole: string;
}

export interface StudentSkill {
  id: string;
  /** Skill name from the platform's normalized skill taxonomy. */
  taxonomyId: string;
  name: string;
  origin: SkillOrigin;
  /** Platform confidence in the skill, 0–100. */
  confidence: number;
  /** Evidence document backing this skill (evidence-derived only). */
  source?: string;
}

export interface SkillGap {
  id: string;
  taxonomyId: string;
  name: string;
  /** Current estimated proficiency, 0–100. */
  current: number;
  /** Level required for the student's target role, 0–100. */
  required: number;
  severity: "High" | "Medium" | "Low";
}

export interface Opportunity {
  id: string;
  title: string;
  org: string;
  division: string;
  location: string;
  duration: string;
  stipend?: string;
  match: number;
  matchedSkills: string[];
  missingSkills: string[];
  /** Plain-language reason for the match score (no invented AI claims). */
  explanation: string;
}

export type ApplicationStage = "applied" | "shortlisted" | "interview" | "offer" | "joined";

export interface Application {
  id: string;
  role: string;
  org: string;
  stage: ApplicationStage;
  stageLabel: string;
  /** Human-friendly status line, e.g. "Submitted 2 days ago". */
  status: string;
  nextStep?: string;
  match: number;
}

export interface LearningRecommendation {
  id: string;
  /** The skill gap this recommendation is tied to. */
  closesGap: string;
  title: string;
  type: "Course" | "Workshop" | "Learning path";
  provider: string;
  duration: string;
  why: string;
}

export type EvidenceStatus = "verified" | "processing" | "needs review";

export interface EvidenceItem {
  id: string;
  title: string;
  kind: string;
  issuer: string;
  status: EvidenceStatus;
}

export interface EvidenceSummary {
  total: number;
  verified: number;
  processing: number;
  needsReview: number;
  items: EvidenceItem[];
}

export interface StudentStats {
  profileCompletion: number;
  skillConfidence: number;
  bestMatch: number;
}

export interface PortfolioSummary {
  projects: number;
  certificates: number;
  verifiedSkills: number;
  featured: { title: string; tag: string }[];
}

export interface StudentDashboard {
  student: Student;
  stats: StudentStats;
  skills: StudentSkill[];
  gaps: SkillGap[];
  bestMatch: Opportunity;
  applications: Application[];
  recommendations: LearningRecommendation[];
  evidence: EvidenceSummary;
  portfolio: PortfolioSummary;
}

const mockStudent: Student = {
  name: "Aarav Sharma",
  initials: "AS",
  course: "BAMS",
  year: "3rd Year",
  institution: "All India Institute of Ayurveda",
  location: "New Delhi",
  targetRole: "Clinical Research Intern",
};

const mockSkills: StudentSkill[] = [
  {
    id: "sk-1",
    taxonomyId: "TC-PY-01",
    name: "Python",
    origin: "evidence",
    confidence: 92,
    source: "Python for Research · NPTEL",
  },
  {
    id: "sk-2",
    taxonomyId: "TC-RM-04",
    name: "Research Methods",
    origin: "evidence",
    confidence: 84,
    source: "Research Project Report · AIIA",
  },
  {
    id: "sk-3",
    taxonomyId: "TC-DA-02",
    name: "Data Analysis",
    origin: "evidence",
    confidence: 81,
    source: "Transcript · AIIA",
  },
  {
    id: "sk-4",
    taxonomyId: "TC-ML-01",
    name: "Machine Learning",
    origin: "self-declared",
    confidence: 72,
  },
  {
    id: "sk-5",
    taxonomyId: "TC-CR-03",
    name: "Clinical Research",
    origin: "self-declared",
    confidence: 66,
  },
];

const mockGaps: SkillGap[] = [
  {
    id: "gp-1",
    taxonomyId: "TC-SA-01",
    name: "Statistical Analysis",
    current: 41,
    required: 80,
    severity: "High",
  },
  {
    id: "gp-2",
    taxonomyId: "TC-SW-02",
    name: "Scientific Writing",
    current: 52,
    required: 78,
    severity: "High",
  },
  {
    id: "gp-3",
    taxonomyId: "TC-CT-05",
    name: "Clinical Trial Documentation",
    current: 58,
    required: 75,
    severity: "Medium",
  },
];

const mockBestMatch: Opportunity = {
  id: "op-1142",
  title: "Clinical Research Intern",
  org: "AIIA",
  division: "Research Division",
  location: "New Delhi",
  duration: "3 Months",
  stipend: "₹12,000/mo",
  match: 92,
  matchedSkills: ["Python", "Research Methods", "Data Analysis", "Documentation"],
  missingSkills: ["Statistical Analysis"],
  explanation:
    "92% match because your profile strongly aligns with 8 of the 9 skills required for this role.",
};

const mockApplications: Application[] = [
  {
    id: "ap-1",
    role: "Clinical Research Intern",
    org: "AIIA Research Division",
    stage: "applied",
    stageLabel: "Applied",
    status: "Submitted 2 days ago",
    match: 92,
  },
  {
    id: "ap-2",
    role: "Research Data Assistant",
    org: "CCRAS · New Delhi",
    stage: "interview",
    stageLabel: "Shortlisted",
    status: "Interview scheduled",
    nextStep: "Interview · Sept 8, 10:30 AM",
    match: 88,
  },
  {
    id: "ap-3",
    role: "AYUSH Research Internship",
    org: "NIA · Jaipur",
    stage: "offer",
    stageLabel: "Offer",
    status: "Offer received · Aug 20",
    nextStep: "Respond by Sept 12",
    match: 85,
  },
];

const mockRecommendations: LearningRecommendation[] = [
  {
    id: "rc-1",
    closesGap: "Statistical Analysis",
    title: "Statistics for Health Research",
    type: "Course",
    provider: "Swayam · NPTEL",
    duration: "6 weeks",
    why: "Helps close your Statistical Analysis gap.",
  },
  {
    id: "rc-2",
    closesGap: "Scientific Writing",
    title: "Scientific Writing Fundamentals",
    type: "Course",
    provider: "AIIA e-Learning",
    duration: "4 weeks",
    why: "Builds the writing skills your target role lists as required.",
  },
  {
    id: "rc-3",
    closesGap: "Clinical Trial Documentation",
    title: "ICH-GCP & Trial Documentation",
    type: "Workshop",
    provider: "ACRC India",
    duration: "2 days",
    why: "Hands-on practice with case report forms and trial records.",
  },
];

const mockEvidence: EvidenceSummary = {
  total: 12,
  verified: 8,
  processing: 3,
  needsReview: 1,
  items: [
    {
      id: "ev-1",
      title: "Academic Transcript",
      kind: "Academic",
      issuer: "AIIA · Registrar",
      status: "verified",
    },
    {
      id: "ev-2",
      title: "Python for Research Certificate",
      kind: "Certificate",
      issuer: "NPTEL · Swayam",
      status: "verified",
    },
    {
      id: "ev-3",
      title: "Research Project Report",
      kind: "Project",
      issuer: "AIIA · Dept. of Research",
      status: "verified",
    },
    {
      id: "ev-4",
      title: "Summer Internship Certificate",
      kind: "Certificate",
      issuer: "CCRAS",
      status: "processing",
    },
    {
      id: "ev-5",
      title: "Clinical Skills Log",
      kind: "Log",
      issuer: "OPD Rotation · AIIA",
      status: "needs review",
    },
  ],
};

const mockPortfolio: PortfolioSummary = {
  projects: 4,
  certificates: 6,
  verifiedSkills: 18,
  featured: [
    { title: "AYUSH Trends Data Review", tag: "Data Analysis" },
    { title: "Herbal Safety Literature Scan", tag: "Research" },
    { title: "Case Series: OPD Outcomes", tag: "Clinical" },
  ],
};

const mockDashboard: StudentDashboard = {
  student: mockStudent,
  stats: {
    profileCompletion: 82,
    skillConfidence: 78,
    bestMatch: 92,
  },
  skills: mockSkills,
  gaps: mockGaps,
  bestMatch: mockBestMatch,
  applications: mockApplications,
  recommendations: mockRecommendations,
  evidence: mockEvidence,
  portfolio: mockPortfolio,
};

/** Mock transport — swap the body for a real fetch once the API exists. */
export const studentApi = {
  async getDashboard(): Promise<StudentDashboard> {
    // Simulated network latency so loading/refresh states behave like production.
    await new Promise((resolve) => setTimeout(resolve, 350));
    return structuredClone(mockDashboard);
  },
};
