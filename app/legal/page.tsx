import Link from "next/link";
import PageBackground from "../components/PageBackground";

export default function LegalPage() {
  return (
    <div className="min-h-screen py-32 flex flex-col relative max-w-5xl mx-auto px-6 lg:px-20">
      <PageBackground />
      {/* Background grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--color-teal-accent)] mb-12 transition-colors font-sans text-sm tracking-widest uppercase">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Home
      </Link>

      <h1 className="text-4xl md:text-6xl font-syncopate font-bold uppercase tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)]">
        Legal Notices
      </h1>
      <div className="w-20 h-1 bg-[var(--color-teal-accent)] mb-12 shadow-[0_0_10px_rgba(0,245,255,0.4)]" />

      <div className="space-y-12 text-white/70 font-sans leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest font-syncopate">1. Copyright & Intellectual Property</h2>
          <p className="mb-4">
            All content, designs, concepts, and materials showcased on this website are the intellectual property of Shishir Zaman, unless otherwise stated. This includes but is not limited to logos, UI/UX designs, case studies, graphics, and textual content.
          </p>
          <p>
            Unauthorized reproduction, distribution, or use of any material from this portfolio without explicit written permission is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest font-syncopate">2. Disclaimer of Liability</h2>
          <p className="mb-4">
            The information and materials on this website are provided "as is" without any warranties of any kind. While I strive to keep the information up to date and correct, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest font-syncopate">3. External Links</h2>
          <p>
            This website may contain links to external websites that are not provided or maintained by or in any way affiliated with me. Please note that I do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest font-syncopate">4. Privacy Policy</h2>
          <p>
            Any personal information collected through the contact forms or communication channels provided on this website will be kept strictly confidential and will only be used for the purpose of communicating regarding potential projects or inquiries. Your data will not be shared with or sold to third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
