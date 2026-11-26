import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800/80 py-10 text-xs text-zinc-500">
      <div className="flex w-full flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-12">
        <p className="font-mono tabular-nums">
          © {new Date().getFullYear()} M. Nabil Fabian
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/blowmamain-spec"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mnfabian"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <Link href="/admin" className="font-mono transition-colors hover:text-accent">
            /admin
          </Link>
        </div>
      </div>
    </footer>
  );
}