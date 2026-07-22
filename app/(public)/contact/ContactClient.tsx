"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import PageBackground from "@/components/PageBackground";
import { PersonalInfoType, CMSService } from "../../../lib/db";

export default function ContactClient({ personalInfo, services }: { personalInfo: PersonalInfoType, services: CMSService[] }) {
  const [state, handleSubmit] = useForm('mvzeovdz');

  const servicesOptions = [
    ...services.map(s => s.title),
    "Custom Service"
  ];

  return (
    <div className="flex flex-col pt-10 pb-20 relative">
      <PageBackground />
      <motion.div 
        className="text-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-foreground-muted tracking-widest text-sm mb-4 uppercase">Home &gt; <span className="text-[var(--color-teal-accent)]">Contact</span></p>
        <h1 className="text-5xl md:text-7xl font-syncopate font-bold uppercase mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)]">Let&apos;s connect</h1>
        <p className="text-xl text-foreground-muted max-w-2xl mx-auto font-sans">
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
              content={personalInfo.email}
              href={`mailto:${personalInfo.email}`}
            />
            <ContactItem 
              icon={<Phone className="text-[var(--color-teal-accent)]" size={24} />}
              title="Phone / WhatsApp"
              content={personalInfo.phone}
              href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
            />
            <ContactItem 
              icon={<MapPin className="text-[var(--color-teal-accent)]" size={24} />}
              title="Location"
              content={`${personalInfo.location}${personalInfo.availableWorldwide ? " | Available Worldwide" : ""}`}
            />
          </div>

          {/* Direct Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a 
              href={`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi " + personalInfo.name.split(' ')[0] + ", I'd like to discuss a project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-[var(--color-teal-accent)] text-background font-bold uppercase tracking-widest py-4 px-6 rounded-2xl hover:bg-[var(--color-teal-accent)]/90 transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] group"
            >
              Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={`mailto:${personalInfo.email}?subject=Project%20Inquiry`}
              className="flex-1 flex items-center justify-center gap-3 glass border border-[var(--color-teal-accent)]/50 text-foreground font-bold uppercase tracking-widest py-4 px-6 rounded-2xl hover:bg-foreground-faint hover:border-[var(--color-teal-accent)] transition-all duration-300 group"
            >
              Email Me <Mail size={20} />
            </a>
          </div>

          {/* Social Links */}
          <div className="glass p-8 rounded-3xl border border-[var(--color-teal-accent)]/20 shadow-[0_0_30px_rgba(0,245,255,0.05)]">
            <h3 className="text-xl font-bold mb-6">Find me on</h3>
            <div className="flex flex-wrap gap-3">
              {personalInfo.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-sm bg-foreground-faint border border-border-color text-foreground-muted hover:text-foreground hover:border-border-subtle transition-all duration-300 capitalize font-sans flex items-center gap-2"
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
          {state.succeeded ? (
            <div className="glass p-8 md:p-12 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 text-center h-full min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-[var(--color-teal-accent)]/20 flex items-center justify-center text-[var(--color-teal-accent)] mb-2 shadow-[0_0_30px_rgba(0,245,255,0.2)]">
                <Mail size={40} />
              </div>
              <h3 className="text-3xl font-syncopate font-bold uppercase tracking-wide text-foreground">Message Sent!</h3>
              <p className="text-foreground-muted font-sans max-w-md leading-relaxed">
                Thank you for reaching out. I've received your message and will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[2.5rem] flex flex-col gap-6">
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">Book an Appointment</h3>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-foreground-muted uppercase tracking-widest font-sans ml-2">Name</label>
                <input type="text" id="name" name="name" autoComplete="name" required className="w-full bg-input-bg border border-border-color rounded-2xl px-6 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-foreground-faint transition-all duration-300 font-sans" placeholder="Your name" />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs ml-2 font-sans" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-foreground-muted uppercase tracking-widest font-sans ml-2">Email</label>
                <input type="email" id="email" name="email" autoComplete="email" required className="w-full bg-input-bg border border-border-color rounded-2xl px-6 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-foreground-faint transition-all duration-300 font-sans" placeholder="you@example.com" />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs ml-2 font-sans" />
              </div>

              <div className="flex flex-col gap-2 relative z-20">
                <label htmlFor="service" className="text-sm text-foreground-muted uppercase tracking-widest font-sans ml-2">Service needed</label>
                <CustomDropdown options={servicesOptions} />
                <ValidationError prefix="Service" field="service" errors={state.errors} className="text-red-400 text-xs ml-2 font-sans" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-foreground-muted uppercase tracking-widest font-sans ml-2">Message</label>
                <textarea id="message" name="message" rows={5} required className="w-full bg-input-bg border border-border-color rounded-2xl px-6 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-foreground-faint transition-all duration-300 font-sans resize-none" placeholder="Tell me about your project..." />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs ml-2 font-sans" />
              </div>

              <button 
                type="submit"
                disabled={state.submitting}
                className="mt-4 flex items-center justify-center gap-3 w-full bg-transparent border border-[var(--color-teal-accent)] text-[var(--color-teal-accent)] font-bold uppercase tracking-widest py-5 rounded-2xl hover:bg-[var(--color-teal-accent)]/10 transition-all duration-300 shadow-none hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? "Sending..." : "Send Message"} {!state.submitting && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function CustomDropdown({ options }: { options: string[] }) {
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
    <div className="relative w-full flex flex-col gap-2" ref={ref}>
      <input type="hidden" name="service" value={value === "Custom Service" ? "" : value} />
      <button
        type="button"
        id="service"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-input-bg border border-border-color rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-foreground-faint transition-all duration-300 font-sans flex justify-between items-center"
      >
        <span className={value ? "text-foreground" : "text-foreground-muted"}>
          {value || "Select a service..."}
        </span>
        <ChevronDown size={20} className={`text-foreground-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 z-50 w-full mt-2 bg-[#0f0f0f] border border-border-color rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setValue(opt);
                  setIsOpen(false);
                }}
                className="w-full text-left px-6 py-3.5 text-foreground-muted hover:text-foreground hover:bg-[var(--color-teal-accent)]/20 transition-colors font-sans text-[15px]"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conditionally render custom service text input */}
      <AnimatePresence>
        {value === "Custom Service" && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <input 
              type="text" 
              name="customService" 
              className="w-full bg-input-bg border border-border-color rounded-2xl px-6 py-4 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-foreground-faint transition-all duration-300 font-sans" 
              placeholder="Please describe your custom service..." 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactItem({ icon, title, content, href }: { icon: React.ReactNode, title: string, content: string, href?: string }) {
  const contentNode = <span className="text-lg font-medium text-foreground">{content}</span>;
  return (
    <div className="flex items-start gap-6 group">
      <div className="w-14 h-14 rounded-full glass flex items-center justify-center shrink-0 border border-border-color group-hover:border-[var(--color-teal-accent)]/30 transition-all duration-300">
        {icon}
      </div>
      <div className="flex flex-col pt-1">
        <h4 className="text-sm text-foreground-muted uppercase tracking-widest font-sans mb-1">{title}</h4>
        {href ? (
          <a href={href} className="hover:text-[var(--color-teal-accent)] transition-colors duration-300">{contentNode}</a>
        ) : contentNode}
      </div>
    </div>
  );
}
