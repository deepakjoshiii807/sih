"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    image: "https://cdn.21st.dev/assets/mirror/be/be1b2e97582f627f0b12c78b4659a78dd89731065529b2d92f1d6aa7c7906c14.png",
    title: "Feedback analyser",
    desc: "Get instant insights into your finances with live dashboards.",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/b6/b6e8f44114cb6b12a5b19ef51876a8217c76fe1fcf014b3251a004377453f29a.png",
    title: "User management",
    desc: "Get instant insights into your finances with live dashboards.",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/48/48f0b980c99986438bdcc25df7482983be83095e483abe5d525595a6290ffd6e.png",
    title: "Better invoicing",
    desc: "Get instant insights into your finances with live dashboards.",
  },
];

export default function FeatureSections() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full py-16 px-4 sm:px-6" ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        .feature-poppins * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="feature-poppins max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-3xl font-semibold text-[#E1E0CC]">
            Powerful Features
          </h1>
          <p className="text-sm text-white/40 mt-2">
            Everything you need to manage, track, and grow your finances, securely and efficiently.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="flex flex-wrap items-start justify-center gap-10">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-80 hover:-translate-y-0.5 transition duration-300"
            >
              <img
                className="rounded-xl w-full"
                src={feature.image}
                alt={feature.title}
              />
              <h3 className="text-base font-semibold text-[#E1E0CC] mt-4">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 mt-1">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
