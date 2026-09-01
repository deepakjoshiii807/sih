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
  const [form, setForm] = useState<Record<string, string | string[]>>({ education: "", degree: "", year: "", skills: [], goal: "", interests: [], budget: "", location: "", preference: "" });
  const navigate = useNavigate();
  const step = steps[current];

  const update = (key: string, val: string | string[]) => setForm((p) => ({ ...p, [key]: val }));
  const toggleArr = (key: string, val: string) => {
    const arr = (form[key] as string[]) || [];
    update(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const glassSelect = "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-white/80 focus:outline-none focus:border-[#7C6BF0]/40 focus:shadow-[0_0_0_3px_rgba(124,107,240,0.1)] transition-all sans appearance-none";

  const renderStep = () => {
    switch (step.id) {
      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-2 block sans">Degree / Program</label>
              <select value={form.education as string} onChange={(e) => update("education", e.target.value)} className={glassSelect}>
                <option value="" className="bg-[#1a1a2e]">Select your program</option>
                {["BCA", "B.Tech CSE", "B.Sc CS", "MCA", "M.Tech", "BBA", "MBA", "Other"].map((o) => <option key={o} value={o} className="bg-[#1a1a2e]">{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-2 block sans">Year</label>
              <select value={form.year as string} onChange={(e) => update("year", e.target.value)} className={glassSelect}>
                <option value="" className="bg-[#1a1a2e]">Select year</option>
                {["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate", "Post-Graduate"].map((o) => <option key={o} value={o} className="bg-[#1a1a2e]">{o}</option>)}
              </select>
            </div>
          </div>
        );
      case "skills":
        return (
          <div>
            <p className="text-[11px] text-white/30 mb-4 sans">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((s) => (
                <button key={s} onClick={() => toggleArr("skills", s)} className={cn("px-3 py-1.5 text-[11px] font-medium rounded-xl transition-all sans", (form.skills as string[]).includes(s) ? "bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white shadow-lg shadow-purple-500/10" : "glass text-white/35 hover:text-white/50")}>{s}</button>
              ))}
            </div>
          </div>
        );
      case "goal":
        return (
          <div className="space-y-2">
            {["Software Developer", "Data Scientist", "ML Engineer", "Product Manager", "Cloud Architect", "Cybersecurity Analyst", "UI/UX Designer", "DevOps Engineer", "Entrepreneur", "Not sure yet"].map((g) => (
              <button key={g} onClick={() => update("goal", g)} className={cn("w-full text-left px-4 py-3 text-[12px] rounded-xl transition-all sans", form.goal === g ? "glass-strong text-white font-semibold border-[#7C6BF0]/30" : "glass text-white/35 hover:text-white/50 hover:bg-white/[0.04]")}>{g}</button>
            ))}
          </div>
        );
      case "interests":
        return (
          <div>
            <p className="text-[11px] text-white/30 mb-4 sans">Pick your top interests</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((s) => (
                <button key={s} onClick={() => toggleArr("interests", s)} className={cn("px-3 py-1.5 text-[11px] font-medium rounded-xl transition-all sans", (form.interests as string[]).includes(s) ? "bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white shadow-lg shadow-purple-500/10" : "glass text-white/35 hover:text-white/50")}>{s}</button>
              ))}
            </div>
          </div>
        );
      case "budget":
        return (
          <div className="space-y-2">
            {["Free only", "Under ₹5,000", "Under ₹20,000", "Under ₹50,000", "No budget limit"].map((b) => (
              <button key={b} onClick={() => update("budget", b)} className={cn("w-full text-left px-4 py-3 text-[12px] rounded-xl transition-all sans", form.budget === b ? "glass-strong text-white font-semibold border-[#7C6BF0]/30" : "glass text-white/35 hover:text-white/50 hover:bg-white/[0.04]")}>{b}</button>
            ))}
          </div>
        );
      case "location":
        return (
          <div>
            <label className="text-[10px] font-semibold text-white/35 uppercase tracking-wider mb-2 block sans">City / State</label>
            <input type="text" value={form.location as string} onChange={(e) => update("location", e.target.value)} placeholder="e.g., Bangalore, Karnataka" className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-white placeholder:text-white/15 focus:outline-none focus:border-[#7C6BF0]/40 transition-all sans" />
            <div className="flex flex-wrap gap-2 mt-4">
              {["Online only", "Hybrid", "Willing to relocate", "Remote"].map((l) => (
                <button key={l} onClick={() => update("location", l)} className={cn("px-3 py-1.5 text-[11px] font-medium rounded-xl transition-all sans", form.location === l ? "bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white" : "glass text-white/35 hover:text-white/50")}>{l}</button>
              ))}
            </div>
          </div>
        );
      case "preference":
        return (
          <div className="space-y-2">
            {["Video lectures", "Reading / docs", "Hands-on projects", "Live classes", "Self-paced", "Mentorship"].map((p) => (
              <button key={p} onClick={() => update("preference", p)} className={cn("w-full text-left px-4 py-3 text-[12px] rounded-xl transition-all sans", form.preference === p ? "glass-strong text-white font-semibold border-[#7C6BF0]/30" : "glass text-white/35 hover:text-white/50 hover:bg-white/[0.04]")}>{p}</button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center gap-1 mb-8">{steps.map((_, i) => <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/[0.05]"><div className={cn("h-full transition-colors rounded-full", i <= current ? "bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF]" : "")} /></div>)}</div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[10px] font-semibold text-white/25 uppercase tracking-wider sans">Step {current + 1} of {steps.length}</span>
          <span className="text-[10px] text-white/10">•</span>
          <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider sans">{step.title}</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">{step.label}</h2>
        <AnimatePresence mode="wait">
          <motion.div key={step.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="glass rounded-2xl p-6">{renderStep()}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between mt-8">
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className={cn("inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium glass rounded-xl text-white/40 hover:text-white/60 transition-all sans", current === 0 && "opacity-20 cursor-not-allowed")}><ArrowLeft className="w-4 h-4" /> Back</button>
          {current < steps.length - 1 ? (
            <button onClick={() => setCurrent((c) => c + 1)} className="inline-flex items-center gap-1.5 px-5 py-2 text-[12px] font-semibold text-white bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">Next <ArrowRight className="w-4 h-4" /></button>
          ) : (
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-1.5 px-5 py-2 text-[12px] font-semibold text-white bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">Start Exploring <ArrowRight className="w-4 h-4" /></button>
          )}
        </div>
      </div>
    </div>
  );
}
