export type OpportunityType = "course" | "scholarship" | "internship" | "job";

export type OpportunityMode = "online" | "offline" | "hybrid" | "remote";

export interface Opportunity {
  id: string;
  title: string;
  provider: string;
  type: OpportunityType;
  matchPercentage: number;
  cost: string;
  duration: string;
  location: string;
  eligibility: string;
  mode: OpportunityMode;
  verified: boolean;
  deadline: string;
  description: string;
  whyRecommended: string;
  skills: string[];
  tags: string[];
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Thread {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  community: string;
  upvotes: number;
  comments: Comment[];
  tags: string[];
  createdAt: string;
  preview: string;
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  upvotes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "locked" | "recommended";
  resource?: string;
  description?: string;
}

export interface SkillGap {
  skill: string;
  progress: number;
  completed: boolean;
}

export interface Community {
  id: string;
  name: string;
  memberCount: number;
  description: string;
}
