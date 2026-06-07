"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { site, serviceOptions, budgetOptions } from "@/lib/site";
import { Reveal } from "../Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
          {/* Left: calm editorial intro */}
          <Reveal className="lg:col-span-2">
            <p className="overline mb-4">Get in touch</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Let&apos;s grow your{" "}
              <span className="italic text-brand">brand</span>.
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              Tell us a little about your brand and goals. We&apos;ll reply
              within one business day with next steps — no pressure, no jargon.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 text-fg transition-colors hover:text-brand"
              >
                <Mail size={18} className="text-brand" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="group flex items-center gap-3 text-fg transition-colors hover:text-brand"
              >
                <Phone size={18} className="text-brand" />
                {site.phone}
              </a>
              <div className="flex items-center gap-3 text-muted">
                <MapPin size={18} className="text-brand" />
                {site.location}
              </div>
            </div>
          </Reveal>

          {/* Right: the form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <Reveal className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
                <CheckCircle2 size={52} className="text-brand" />
                <h3 className="mt-5 font-display text-2xl font-semibold">
                  Thanks — message received.
                </h3>
                <p className="mt-3 max-w-sm text-muted">
                  We&apos;ve got your details and will be in touch within one
                  business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold text-brand hover:underline"
                >
                  Send another message
                </button>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    name="name"
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <Field
                    label="Company (optional)"
                    name="company"
                    autoComplete="organization"
                  />
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <SelectField
                    label="Service"
                    name="service"
                    options={serviceOptions}
                  />
                  <SelectField
                    label="Monthly budget"
                    name="budget"
                    options={budgetOptions}
                  />
                </div>
                <Field
                  label="How can we help?"
                  name="message"
                  required
                  textarea
                />

                {status === "error" && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="gradient-bg inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-strong/20 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send size={17} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-fg placeholder:text-muted/50 transition-colors focus:border-brand focus:outline-none";

function Field({
  label,
  name,
  type = "text",
  required = false,
  textarea = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "search";
}) {
  return (
    <label className="block">
      <span className="overline mb-2 block text-muted">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          placeholder="Tell us about your brand and goals…"
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={inputClass}
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="overline mb-2 block text-muted">
        {label}
      </span>
      <select name={name} defaultValue="" className={inputClass}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
