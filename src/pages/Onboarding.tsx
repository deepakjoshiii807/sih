import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PixelGraduation, PixelBriefcase, PixelDocument, PixelHeart, PixelStar, PixelTarget, PixelGraph } from "@/components/PixelIcons";
import { cn } from "@/lib/utils";

const steps = [
  { id: "education", title: "Education", pixelIcon: PixelGraduation, label: "Tell us about your education" },
  { id: "skills", title: "Skills", pixelIcon: PixelBriefcase, label: "What skills do you have?" },
  { id: "goal", title: "Career Goal", pixelIcon: PixelTarget, label: "What's your dream role?" },
  { id: "interests", title: "Interests", pixelIcon: PixelHeart, label: "What excites you?" },
  { id: "budget", title: "Budget", pixelIcon: PixelStar, label: "Your learning budget" },
  { id: "location", title: "Location", pixelIcon: PixelGraph, label: "Where are you based?" },
  { id: "preference", title: "Learning Style", pixelIcon: PixelDocument, label: "How do you learn best?" },
];

const skillOptions = ["Python", "JavaScript", "SQL", "Machine Learning", "Data Analysis", "React", "Node.js", "Java", "C++", "HTML/CSS", "Flutter", "AWS", "Git", "Statistics", "Deep Learning"];
const interestOptions = ["AI & ML", "Web Dev", "Cybersecurity", "Data Science", "Cloud Computing", "Mobile Dev", "DevOps", "Blockchain", "IoT", "UI/UX"];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState<Record<string, string | string[]>>({ education: "", degree: "", year: "", skills: [], goal: "", interests: [], budget: "", location: "", preference: "" });
  const navigate = useNavigate();
  const step = steps[current];

  const update = (key: string, val: string | string[]) => setForm((p) => ({ ...p, [key]: val }));
  const toggleArr = (key: string, val: string) => {
    const arr = (form[key] as string[]) || [];
    update(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const pixelSelect = "w-full px-4 py-3 bg-cream border-2 border-ink shadow-[3px_3px_0px_var(--border)] rounded text-[13px] text-ink font-medium focus:outline-none focus:border-forest focus:shadow-[3px_3px_0px_var(--forest)] transition-all sans appearance-none";

  const renderStep = () => {
    switch (step.id) {
      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="section-pixel mb-2 block">Degree / Program</label>
              <select value={form.education as string} onChange={(e) => update("education", e.target.value)} className={pixelSelect}>
                <option value="" className="bg-cream">Select your program</option>
                {["BCA", "B.Tech CSE", "B.Sc CS", "MCA", "M.Tech", "BBA", "MBA", "Other"].map((o) => <option key={o} value={o} className="bg-cream">{o}</option>)}
              </select>
            </div>
            <div>
              <label className="section-pixel mb-2 block">Year</label>
              <select value={form.year as string} onChange={(e) => update("year", e.target.value)} className={pixelSelect}>
                <option value="" className="bg-cream">Select year</option>
                {["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate", "Post-Graduate"].map((o) => <option key={o} value={o} className="bg-cream">{o}</option>)}
              </select>
            </div>
          </div>
        );
      case "skills":
        return (
          <div>
            <p className="text-[11px] text-ink-muted mb-4 sans">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((s) => (
                <button key={s} onClick={() => toggleArr("skills", s)} className={cn("px-3 py-1.5 text-[11px] font-bold rounded border-2 transition-all sans", (form.skills as string[]).includes(s) ? "bg-forest text-white border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35]" : "bg-cream border-border text-ink-muted hover:text-ink hover:border-ink-muted shadow-[2px_2px_0px_var(--border)]")}>{s}</button>
              ))}
            </div>
          </div>
        );
      case "goal":
        return (
          <div className="space-y-2">
            {["Software Developer", "Data Scientist", "ML Engineer", "Product Manager", "Cloud Architect", "Cybersecurity Analyst", "UI/UX Designer", "DevOps Engineer", "Entrepreneur", "Not sure yet"].map((g) => (
              <button key={g} onClick={() => update("goal", g)} className={cn("w-full text-left px-4 py-3 text-[12px] font-semibold rounded border-2 transition-all sans", form.goal === g ? "bg-forest text-white border-[#2A4A35] shadow-[3px_3px_0px_#2A4A35]" : "bg-card border-border text-ink-light hover:text-ink hover:border-ink-muted shadow-[2px_2px_0px_var(--border)]")}>{g}</button>
            ))}
          </div>
        );
      case "interests":
        return (
          <div>
            <p className="text-[11px] text-ink-muted mb-4 sans">Pick your top interests</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((s) => (
                <button key={s} onClick={() => toggleArr("interests", s)} className={cn("px-3 py-1.5 text-[11px] font-bold rounded border-2 transition-all sans", (form.interests as string[]).includes(s) ? "bg-forest text-white border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35]" : "bg-cream border-border text-ink-muted hover:text-ink hover:border-ink-muted shadow-[2px_2px_0px_var(--border)]")}>{s}</button>
              ))}
            </div>
          </div>
        );
      case "budget":
        return (
          <div className="space-y-2">
            {["Free only", "Under ₹5,000", "Under ₹20,000", "Under ₹50,000", "No budget limit"].map((b) => (
              <button key={b} onClick={() => update("budget", b)} className={cn("w-full text-left px-4 py-3 text-[12px] font-semibold rounded border-2 transition-all sans", form.budget === b ? "bg-forest text-white border-[#2A4A35] shadow-[3px_3px_0px_#2A4A35]" : "bg-card border-border text-ink-light hover:text-ink hover:border-ink-muted shadow-[2px_2px_0px_var(--border)]")}>{b}</button>
            ))}
          </div>
        );
      case "location":
        return (
          <div>
            <label className="section-pixel mb-2 block">City / State</label>
            <input type="text" value={form.location as string} onChange={(e) => update("location", e.target.value)} placeholder="e.g., Bangalore, Karnataka" className="pixel-input" />
            <div className="flex flex-wrap gap-2 mt-4">
              {["Online only", "Hybrid", "Willing to relocate", "Remote"].map((l) => (
                <button key={l} onClick={() => update("location", l)} className={cn("px-3 py-1.5 text-[11px] font-bold rounded border-2 transition-all sans", form.location === l ? "bg-forest text-white border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35]" : "bg-cream border-border text-ink-muted hover:text-ink hover:border-ink-muted shadow-[2px_2px_0px_var(--border)]")}>{l}</button>
              ))}
            </div>
          </div>
        );
      case "preference":
        return (
          <div className="space-y-2">
            {["Video lectures", "Reading / docs", "Hands-on projects", "Live classes", "Self-paced", "Mentorship"].map((p) => (
              <button key={p} onClick={() => update("preference", p)} className={cn("w-full text-left px-4 py-3 text-[12px] font-semibold rounded border-2 transition-all sans", form.preference === p ? "bg-forest text-white border-[#2A4A35] shadow-[3px_3px_0px_#2A4A35]" : "bg-card border-border text-ink-light hover:text-ink hover:border-ink-muted shadow-[2px_2px_0px_var(--border)]")}>{p}</button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-8">{steps.map((_, i) => <div key={i} className="flex-1 h-2 rounded overflow-hidden bg-cream-dark border border-border"><div className={cn("h-full transition-colors rounded", i <= current ? "bg-forest" : "")} /></div>)}</div>

        <div className="flex items-center gap-2 mb-6">
          <span className="section-pixel">Step {current + 1} of {steps.length}</span>
          <span className="text-ink-muted">•</span>
          <span className="section-pixel text-ink">{step.title}</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-forest border-[3px] border-[#2A4A35] shadow-[3px_3px_0px_#2A4A35] flex items-center justify-center">
            <step.pixelIcon className="text-cream" size={22} />
          </div>
          <h2 className="text-2xl font-extrabold text-ink tracking-tight">{step.label}</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="pixel-card bg-card p-6">{renderStep()}</div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className={cn("pixel-btn pixel-btn-secondary", current === 0 && "opacity-20 cursor-not-allowed")}><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
          {current < steps.length - 1 ? (
            <button onClick={() => setCurrent((c) => c + 1)} className="pixel-btn pixel-btn-primary">Next <ArrowRight className="w-3.5 h-3.5" /></button>
          ) : (
            <button onClick={() => navigate("/dashboard")} className="pixel-btn pixel-btn-primary">Start Exploring <ArrowRight className="w-3.5 h-3.5" /></button>
          )}
        </div>
      </div>
    </div>
  );
}
