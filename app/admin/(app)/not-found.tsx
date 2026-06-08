import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="grid min-h-[50vh] place-items-center p-8 text-center">
      <div>
        <h2 className="font-display text-xl font-bold">Not found</h2>
        <p className="mt-2 text-sm text-muted">
          That record doesn&apos;t exist or was deleted.
        </p>
        <Link
          href="/admin"
          className="gradient-bg mt-5 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
