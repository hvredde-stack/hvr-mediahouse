"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[50vh] place-items-center p-8 text-center">
      <div>
        <h2 className="font-display text-xl font-bold">Something went wrong</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          A temporary error occurred loading this page — usually the database
          waking up. Your session is still active.
        </p>
        <button
          onClick={reset}
          className="gradient-bg mt-5 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
