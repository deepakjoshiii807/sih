"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Globe,
} from "lucide-react";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";

export default function SiteFooter() {
  const footerLinks = [
    {
      title: "About",
      links: [
        { label: "Our Mission", href: "#" },
        { label: "How It Works", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Support", href: "#" },
        { label: "Community", href: "#" },
        {
          label: "Live Chat",
          href: "#",
          pulse: true,
        },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#22C55E]" />,
      text: "hello@lead2learn.in",
      href: "mailto:hello@lead2learn.in",
    },
    {
      icon: <Phone size={18} className="text-[#22C55E]" />,
      text: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: <MapPin size={18} className="text-[#22C55E]" />,
      text: "India",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Globe size={20} />, label: "Website", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-4 sm:m-8">
      <div className="max-w-7xl mx-auto p-8 sm:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#22C55E] text-3xl font-extrabold">L2L</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Lead2Learn — discover courses, scholarships, internships and jobs
              tailored to your skills, goals and interests.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#E1E0CC] text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-[#22C55E] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-[#E1E0CC] text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/50 hover:text-[#22C55E] transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-white/50 hover:text-[#22C55E] transition-colors text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/[0.06] my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-white/30">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#22C55E] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-center md:text-left">
            &copy; {new Date().getFullYear()} Lead2Learn. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="Lead2Learn" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
