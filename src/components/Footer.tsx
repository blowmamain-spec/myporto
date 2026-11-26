import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800/80 py-10 text-xs text-zinc-500">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono tabular-nums">
          © {new Date().getFullYear()} M. Nabil Fabian. Dibangun dengan Next.js &amp; PostgreSQL.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/blowmamain-spec"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mnfabian"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            LinkedIn
          </a>
          <Link href="/admin" className="font-mono transition-colors hover:text-amber-400">
            /admin
          </Link>
        </div>
      </div>
    </footer>
  );
}