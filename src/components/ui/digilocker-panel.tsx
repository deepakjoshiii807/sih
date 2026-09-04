"use client";

import { motion } from "framer-motion";
import { Shield, Check, ArrowLeftRight, Lock, FileCheck, BadgeCheck } from "lucide-react";

export default function DigiLockerPanel() {
  return (
    <section className="bg-white pb-10 sm:pb-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div
          className="relative overflow-hidden rounded-[20px] sm:rounded-[28px]"
          style={{
            background: "linear-gradient(135deg, #f3f0ff 0%, #ede9fe 40%, #f5f3ff 100%)",
            border: "1px solid rgba(139, 92, 246, 0.12)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 p-5 sm:p-10 lg:p-14">
            {/* Left — Visual */}
            <div className="flex-1 flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 min-w-0">
              {/* Shield */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="shrink-0"
              >
                <div className="w-16 h-20 sm:w-24 sm:h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                  <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-white" strokeWidth={1.8} />
                  <Check className="absolute w-4 h-4 sm:w-6 sm:h-6 text-white mt-4 sm:mt-6" strokeWidth={3} />
                </div>
              </motion.div>

              {/* Dashed arrow */}
              <div className="hidden sm:flex flex-col items-center gap-1 text-emerald-400">
                <ArrowLeftRight className="w-5 h-5" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  ))}
                </div>
              </div>

              {/* DigiLocker card */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="shrink-0 bg-white rounded-2xl p-4 sm:p-6 shadow-md shadow-purple-100 border border-purple-100/50 min-w-[140px] sm:min-w-[160px]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">DL</span>
                  </div>
                  <div>
                    <p className="text-[13px] sm:text-sm font-bold text-gray-900 leading-tight">DigiLocker</p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400">Your documents anytime</p>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-indigo-500 font-medium text-center leading-snug">
                  Document Wallet to<br />Empower Citizens
                </p>
              </motion.div>
            </div>

            {/* Right — Content */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                New
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2 sm:mb-3">
                DigiLocker Integration
              </h2>

              <p className="text-xs sm:text-base font-semibold text-gray-700 mb-2">
                Secure. Verified. Digital.
              </p>

              <p className="text-xs sm:text-[15px] text-gray-500 leading-relaxed mb-4 sm:mb-6 max-w-lg">
                Lead2Learn integrates with DigiLocker to help students securely access and verify eligible digital documents with user consent, simplifying document management and verification during their career journey.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Lock, label: "Consent-Based Access" },
                  { icon: FileCheck, label: "Secure & Encrypted" },
                  { icon: BadgeCheck, label: "Government Verified" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-violet-600 bg-violet-50 border border-violet-100"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
