"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md p-8 md:p-12 glass rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,245,255,0.05)]">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[var(--color-teal-accent)]/10 flex items-center justify-center border border-[var(--color-teal-accent)]/30">
            <Lock className="text-[var(--color-teal-accent)]" size={32} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2 uppercase tracking-widest font-syncopate">
          Admin Portal
        </h1>
        <p className="text-white/50 text-center mb-8 text-sm">
          Enter your password to access the CMS
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-teal-accent)]/50 focus:bg-white/5 transition-all duration-300"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-xl border border-red-400/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-3 w-full bg-[var(--color-teal-accent)] text-black font-bold uppercase tracking-widest py-4 rounded-2xl hover:bg-[var(--color-teal-accent)]/90 transition-all duration-300 disabled:opacity-50 group"
          >
            {loading ? "Authenticating..." : "Login"}
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
}
