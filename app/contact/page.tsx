"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PERSONAL_INFO } from "../data/content";
import PageBackground from "../components/PageBackground";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const service = (form.elements.namedItem("service") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const text = `Hi Shishir, I'd like to book an appointment.\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/8801869511046?text=${encodeURIComponent(text)}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=New Appointment Request - ${name}&body=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");
    window.location.href = mailtoUrl;
  };

  return (
    <div className="flex flex-col pt-10 pb-20 relative">
      <PageBackground />
      <motion.div 
        className="text-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white/50 tracking-widest text-sm mb-4 uppercase">Home &gt; <span className="text-[var(--color-teal-accent)]">Contact</span></p>
        <h1 className="text-5xl md:text-7xl font-syncopate font-bold uppercase mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)]">Let&apos;s connect</h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto font-sans">
          Have a project in mind? Let&apos;s talk. I typically reply within 24 hours.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div 
          className="flex flex-col gap-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Information</h2>
          
          <div className="flex flex-col gap-8">
            <ContactItem 
              icon={<Mail className="text-[var(--color-teal-accent)]" size={24} />}
              title="Email"
              content={PERSONAL_INFO.email}
              href={`mailto:${PERSONAL_INFO.email}`}
            />
            <ContactItem 
              icon={<Phone className="text-[var(--color-teal-accent)]" size={24} />}
              title="Phone / WhatsApp"
              content={PERSONAL_INFO.phone}
              href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`}
            />
            <ContactItem 
              icon={<MapPin className="text-[var(--color-teal-accent)]" size={24} />}
              title="Location"
              content={`${PERSONAL_INFO.location}${PERSONAL_INFO.availableWorldwide ? " — Available Worldwide" : ""}`}
            />
          </div>

          {/* Social Links */}
          <div className="glass p-8 rounded-3xl border border-[var(--color-teal-accent)]/20 shadow-[0_0_30px_rgba(0,245,255,0.05)]">
            <h3 className="text-xl font-bold mb-6">Find me on</h3>
            <div className="flex flex-wrap gap-3">
              {PERSONAL_INFO.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-sm bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 capitalize font-sans flex items-center gap-2"
                >
                  <div 
                    className="w-4 h-4 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
                    dangerouslySetInnerHTML={{ __html: social.iconSvg.replace(/width=".*?"/g, 'width="100%"').replace(/height=".*?"/g, 'height="100%"') }}
                  />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          id="contact-form"
        >
          <form className="glass p-8 md:p-12 rounded-[2.5rem] flex flex-col gap-6" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">Book an Appointment</h3>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-white/60 uppercase tracking-widest font-sans ml-2">Name</label>
              <input type="text" id="name" name="name" autoComplete="name" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-white/5 transition-all duration-300 font-sans" placeholder="Your name" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-white/60 uppercase tracking-widest font-sans ml-2">Email</label>
              <input type="email" id="email" name="email" autoComplete="email" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-white/5 transition-all duration-300 font-sans" placeholder="you@example.com" />
            </div>

            <div className="flex flex-col gap-2 relative z-20">
              <label htmlFor="service" className="text-sm text-white/60 uppercase tracking-widest font-sans ml-2">Service needed</label>
              <CustomDropdown />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-white/60 uppercase tracking-widest font-sans ml-2">Message</label>
              <textarea id="message" name="message" rows={5} className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-white/5 transition-all duration-300 font-sans resize-none" placeholder="Tell me about your project..." />
            </div>

            <button 
              type="submit"
              className="mt-4 flex items-center justify-center gap-3 w-full bg-[var(--color-teal-accent)] text-black font-bold uppercase tracking-widest py-5 rounded-2xl hover:bg-[var(--color-teal-accent)]/90 transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] group"
            >
              Book Appointment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

const SERVICES_OPTIONS = [
  "Brand Identity Design",
  "Packaging Design",
  "Graphics & Visual Design",
  "Social Media Design",
  "Video Editing",
  "Motion Graphics",
  "Other"
];

function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <input type="hidden" name="service" value={value} />
      <button
        type="button"
        id="service"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-white/5 transition-all duration-300 font-sans flex justify-between items-center"
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value || "Select a service..."}
        </span>
        <ChevronDown size={20} className={`text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {SERVICES_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setValue(opt);
                  setIsOpen(false);
                }}
                className="w-full text-left px-6 py-3.5 text-white/70 hover:text-white hover:bg-[var(--color-teal-accent)]/20 transition-colors font-sans text-[15px]"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactItem({ icon, title, content, href }: { icon: React.ReactNode, title: string, content: string, href?: string }) {
  const contentNode = <span className="text-lg font-medium text-white/90">{content}</span>;
  return (
    <div className="flex items-start gap-6 group">
      <div className="w-14 h-14 rounded-full glass flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[var(--color-teal-accent)]/30 transition-all duration-300">
        {icon}
      </div>
      <div className="flex flex-col pt-1">
        <h4 className="text-sm text-white/40 uppercase tracking-widest font-sans mb-1">{title}</h4>
        {href ? (
          <a href={href} className="hover:text-[var(--color-teal-accent)] transition-colors duration-300">{contentNode}</a>
        ) : contentNode}
      </div>
    </div>
  );
}
