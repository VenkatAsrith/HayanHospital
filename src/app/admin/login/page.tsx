"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="text-2xl font-bold tracking-tight text-[#111111]">
            HAYAN
          </span>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#164B61] mt-0.5">
            General &amp; Children&apos;s Hospital
          </p>
        </Link>
        <h2 className="mt-6 text-xl font-semibold text-[#111111]">
          Hospital Management Portal
        </h2>
        <p className="mt-2 text-xs text-[#626262]">
          Authorized staff &amp; administration access only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-[#E5E7E7] shadow-sm">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#444444] mb-1.5">
                Staff Master Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7E7] text-sm text-[#111111] focus:outline-none focus:border-[#164B61]"
                />
                <Lock className="w-4 h-4 text-[#8A8F93] absolute left-3.5 top-3" />
              </div>
              <p className="text-[11px] text-[#8C9499] mt-1.5">
                Default setup credential: <code className="bg-[#F7F8F6] px-1 py-0.5 rounded text-[#164B61]">hayan@2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#164B61] hover:bg-[#0f3444] disabled:opacity-50 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>{loading ? "Authenticating..." : "Access Admin Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#F0F2F2] flex items-center justify-between text-xs text-[#8A8F93]">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#164B61]" />
              <span>Encrypted Session</span>
            </div>
            <Link href="/" className="hover:text-[#111111]">
              &larr; Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
