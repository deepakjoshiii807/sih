import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, GraduationCap, Code, Target, Heart, IndianRupee, MapPin, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

const steps = [
  { id: "education", title: "Education", icon: GraduationCap, label: "Tell us about your education" },
  { id: "skills", title: "Skills", icon: Code, label: "What skills do you have?" },
  { id: "goal", title: "Career Goal", icon: Target, label: "What's your dream role?" },
  { id: "interests", title: "Interests", icon: Heart, label: "What excites you?" },
  { id: "budget", title: "Budget", icon: IndianRupee, label: "Your learning budget" },
  { id: "location", title: "Location", icon: MapPin, label: "Where are you based?" },
  { id: "preference", title: "Learning Style", icon: BookOpen, label: "How do you learn best?" },
];

const skillOptions = ["Python", "JavaScript", "SQL", "Machine Learning", "Data Analysis", "React", "Node.js", "Java", "C++", "HTML/CSS", "Flutter", "AWS", "Git", "Statistics", "Deep Learning"];
const interestOptions = ["AI & ML", "Web Dev", "Cybersecurity", "Data Science", "Cloud Computing", "Mobile Dev", "DevOps", "Blockchain", "IoT", "UI/UX"];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState<Record<string, string | string[]>>({
    education: "", degree: "", year: "",
    skills: [], goal: "", interests: [],
    budget: "", location: "", preference: "",
  });
  const navigate = useNavigate();
  const step = steps[current];

  const update = (key: string, value: string | string[]) => setForm((p) => ({ ...p, [key]: value }));
  const toggleArray = (key: string, val: string) => {
    const arr = (form[key] as string[]) || [];
    update(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const renderStep = () => {
    switch (step.id) {
      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7A7570] mb-2 block sans-ui">Degree / Program</label>
              <select value={form.education as string} onChange={(e) => update("education", e.target.value)} className="w-full px-4 py-3 bg-[#FAF8F2] ink-border text-[14px] editorial focus:outline-none focus:border-[#3D4F6F]">
                <option value="">Select your program</option>
                <option>BCA</option><option>B.Tech CSE</option><option>B.Sc CS</option><option>MCA</option><option>M.Tech</option><option>BBA</option><option>MBA</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7A7570] mb-2 block sans-ui">Year</label>
              <select value={form.year as string} onChange={(e) => update("year", e.target.value)} className="w-full px-4 py-3 bg-[#FAF8F2] ink-border text-[14px] editorial focus:outline-none focus:border-[#3D4F6F]">
                <option value="">Select year</option>
                <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Graduate</option><option>Post-Graduate</option>
              </select>
            </div>
          </div>
        );
      case "skills":
        return (
          <div>
            <p className="text-[12px] text-[#7A7570] mb-4 sans-ui">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((s) => (
                <button key={s} onClick={() => toggleArray("skills", s)} className={cn("px-3 py-1.5 text-[12px] font-medium sans-ui transition-all", (form.skills as string[]).includes(s) ? "btn-ink" : "bg-[#FAF8F2] ink-border-subtle text-[#7A7570] hover:border-[#8A8580]")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      case "goal":
        return (
          <div className="space-y-3">
            {["Software Developer", "Data Scientist", "ML Engineer", "Product Manager", "Cloud Architect", "Cybersecurity Analyst", "UI/UX Designer", "DevOps Engineer", "Entrepreneur", "Not sure yet"].map((g) => (
              <button key={g} onClick={() => update("goal", g)} className={cn("w-full text-left px-4 py-3 text-[13px] ink-border-subtle bg-[#FAF8F2] transition-all sans-ui", form.goal === g ? "ink-border font-semibold text-[#1A1A1A] paper-shadow" : "text-[#7A7570] hover:border-[#8A8580]")}>
                {g}
              </button>
            ))}
          </div>
        );
      case "interests":
        return (
          <div>
            <p className="text-[12px] text-[#7A7570] mb-4 sans-ui">Pick your top interests</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((s) => (
                <button key={s} onClick={() => toggleArray("interests", s)} className={cn("px-3 py-1.5 text-[12px] font-medium sans-ui transition-all", (form.interests as string[]).includes(s) ? "btn-ink" : "bg-[#FAF8F2] ink-border-subtle text-[#7A7570] hover:border-[#8A8580]")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      case "budget":
        return (
          <div className="space-y-3">
            {["Free only", "Under ₹5,000", "Under ₹20,000", "Under ₹50,000", "No budget limit"].map((b) => (
              <button key={b} onClick={() => update("budget", b)} className={cn("w-full text-left px-4 py-3 text-[13px] ink-border-subtle bg-[#FAF8F2] transition-all sans-ui", form.budget === b ? "ink-border font-semibold text-[#1A1A1A] paper-shadow" : "text-[#7A7570] hover:border-[#8A8580]")}>
                {b}
              </button>
            ))}
          </div>
        );
      case "location":
        return (
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7A7570] mb-2 block sans-ui">City / State</label>
            <input type="text" value={form.location as string} onChange={(e) => update("location", e.target.value)} placeholder="e.g., Bangalore, Karnataka" className="w-full px-4 py-3 bg-[#FAF8F2] ink-border text-[14px] editorial placeholder:text-[#D4CFC4] focus:outline-none focus:border-[#3D4F6F]" />
            <div className="flex flex-wrap gap-2 mt-4">
              {["Online only", "Hybrid", "Willing to relocate", "Remote"].map((l) => (
                <button key={l} onClick={() => update("location", l)} className={cn("px-3 py-1.5 text-[12px] font-medium sans-ui transition-all", form.location === l ? "btn-ink" : "bg-[#FAF8F2] ink-border-subtle text-[#7A7570] hover:border-[#8A8580]")}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        );
      case "preference":
        return (
          <div className="space-y-3">
            {["Video lectures", "Reading / docs", "Hands-on projects", "Live classes", "Self-paced", "Mentorship"].map((p) => (
              <button key={p} onClick={() => update("preference", p)} className={cn("w-full text-left px-4 py-3 text-[13px] ink-border-subtle bg-[#FAF8F2] transition-all sans-ui", form.preference === p ? "ink-border font-semibold text-[#1A1A1A] paper-shadow" : "text-[#7A7570] hover:border-[#8A8580]")}>
                {p}
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center gap-1 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex-1 h-1">
              <div className={cn("h-full transition-colors", i <= current ? "bg-[#1A1A1A]" : "bg-[#D4CFC4]")} />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.2em] sans-ui">
            Step {current + 1} of {steps.length}
          </span>
          <span className="text-[10px] text-[#D4CFC4]">•</span>
          <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.15em] sans-ui">{step.title}</span>
        </div>

        <h2 className="heading-lg text-2xl text-[#1A1A1A] mb-8">{step.label}</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-[#FAF8F2] ink-border paper-shadow p-6 notebook-lines relative">
              <div className="relative z-10">
                {renderStep()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className={cn("btn-paper btn-outline text-[12px]", current === 0 && "opacity-30 cursor-not-allowed")}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {current < steps.length - 1 ? (
            <button onClick={() => setCurrent((c) => c + 1)} className="btn-paper btn-ink text-[12px]">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => navigate("/dashboard")} className="btn-paper btn-ink text-[12px]">
              Start Exploring <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
