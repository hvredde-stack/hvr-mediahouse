"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { keerthi } from "@/lib/keerthi";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full border-0 border-b border-[#d8d1d5] bg-transparent px-0 py-3 text-[#20191d] outline-none transition-colors placeholder:text-[#8b7d84] focus:border-[#a51d52]";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const service = String(data.get("service") || "");
    const eventDate = String(data.get("event_date") || "");
    const notes = String(data.get("notes") || "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: keerthi.name,
          service: `Keerthi booking: ${service}`,
          message: [
            `Requested service: ${service}`,
            `Event date: ${eventDate || "Not provided"}`,
            `Notes: ${notes || "None"}`,
          ].join("\n"),
          company_website: data.get("company_website"),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Unable to send your inquiry.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[28rem] flex-col items-center justify-center text-center"
      >
        <CheckCircle2 className="text-[#a51d52]" size={48} />
        <h3 className="mt-5 text-2xl font-semibold text-[#20191d]">
          Your inquiry is in.
        </h3>
        <p className="mt-3 max-w-md text-[#665960]">
          Keerthi&apos;s team will review the date and service details before
          confirming availability.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-sm font-semibold text-[#a51d52] hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
      aria-busy={status === "submitting"}
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Field label="Your name" name="name" autoComplete="name" required />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        required
      />
      <Field label="Event date" name="event_date" type="date" />

      <label className="block">
        <span className="text-xs font-semibold uppercase text-[#665960]">
          Service
        </span>
        <select name="service" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose a service
          </option>
          {keerthi.packages.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name} - from ${item.price}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase text-[#665960]">
          Notes
        </span>
        <input
          name="notes"
          className={fieldClass}
          placeholder="Venue, getting-ready time, party size..."
        />
      </label>

      {status === "error" && (
        <p
          role="alert"
          className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2"
        >
          {error}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#20191d] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a51d52] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Request availability
              <Send size={16} />
            </>
          )}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-[#7d7077]">
          Prices are starting rates in CAD. Final timing, travel and booking
          details are confirmed before a retainer is requested.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase text-[#665960]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={fieldClass}
      />
    </label>
  );
}
