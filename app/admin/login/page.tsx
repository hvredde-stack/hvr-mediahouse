"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Login failed.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="matte gradient-border rounded-2xl p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="gradient-bg grid h-10 w-10 place-items-center rounded-xl text-white">
              <Lock size={18} />
            </span>
            <div>
              <h1 className="font-display text-xl font-semibold">Admin login</h1>
              <p className="text-sm text-muted">Sign in to view your leads</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-bg-2 px-4 py-3 text-fg focus:border-brand-purple/60 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-border bg-bg-2 px-4 py-3 text-fg focus:border-brand-purple/60 focus:outline-none"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="gradient-bg inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          ← Back to{" "}
          <a href="/" className="text-fg hover:underline">
            the website
          </a>
        </p>
      </div>
    </main>
  );
}
