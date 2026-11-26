import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categoryLabel: Record<string, string> = {
  FULLSTACK: "Fullstack",
  CYBERSEC: "Cybersecurity",
  DATA_AI: "Data & AI",
};

const experienceLabel: Record<string, string> = {
  WORK: "Kerja & Proyek",
  LAB: "Lab & Komunitas",
  CERT: "Sertifikasi",
};

function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function HomePage() {
  const [projects, experiences, latestNotes] = await Promise.all([
    prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    }),
    prisma.experience.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.note.findMany({
      where: { published: true },
      include: { topic: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* 00 / HERO EDITORIAL */}
      <section className="grid gap-10 border-b border-zinc-800/80 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400">
            Fullstack Web &amp; Cybersecurity
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl sm:leading-[1.1]">
            M. Nabil Fabian
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            Mahasiswa S1 Teknologi Informasi Telkom University. Membangun aplikasi web
            berbasis Laravel, Next.js, dan PostgreSQL untuk instansi pemerintahan serta
            bisnis, dengan fokus kuat pada arsitektur data dan keamanan aplikasi web.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="rounded-md bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
            >
              Lihat Proyek
            </Link>
            <Link
              href="/notes"
              className="rounded-md border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Baca Catatan
            </Link>
            <a
              href="https://github.com/blowmamain-spec"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2.5 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100"
            >
              github.com/blowmamain-spec ↗
            </a>
          </div>
        </div>

        {/* Kartu Ringkasan Faktual (Asimetris) */}
        <aside className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 md:col-span-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="font-mono text-xs text-zinc-400">STATUS.JSON</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to Intern / Project
            </span>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-xs text-zinc-500">DOMISILI</dt>
              <dd className="text-right text-zinc-200">Bandung / Kepri</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-xs text-zinc-500">STACK UTAMA</dt>
              <dd className="text-right text-zinc-200">Next.js, Laravel, PostgreSQL</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-xs text-zinc-500">KEAMANAN</dt>
              <dd className="text-right text-zinc-200">OWASP Top 10, RLS, Linux/Docker</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-xs text-zinc-500">DATA LIVE</dt>
              <dd className="font-mono text-xs tabular-nums text-amber-400">
                {projects.length} proyek · {latestNotes.length} catatan
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* 01 / PROYEK */}
      <section id="projects" className="border-b border-zinc-800/80 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-zinc-500">01 / PROYEK</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
              Karya &amp; Studi Kasus
            </h2>
          </div>
          <span className="font-mono text-xs tabular-nums text-zinc-500">
            {projects.length} item dari PostgreSQL
          </span>
        </div>

        {projects.length === 0 ? (
          <p className="mt-8 rounded-lg border border-dashed border-zinc-800 p-8 text-sm text-zinc-500">
            Belum ada proyek yang dipublikasikan.
          </p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/35 p-6 transition-colors duration-150 hover:border-zinc-600 hover:bg-zinc-900/70"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-amber-400">
                      {categoryLabel[project.category] ?? project.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-zinc-200">
                      Detail →
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-100">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {project.tagline}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-zinc-800/80 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 02 / PENGALAMAN & SERTIFIKASI */}
      <section id="experience" className="border-b border-zinc-800/80 py-16">
        <p className="font-mono text-xs text-zinc-500">02 / REKAM JEJAK</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Pengalaman, Lab &amp; Sertifikasi
        </h2>

        <div className="mt-8 divide-y divide-zinc-800/80 rounded-xl border border-zinc-800 bg-zinc-900/25">
          {experiences.map((exp) => (
            <div key={exp.id} className="grid gap-4 p-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="font-mono text-xs tabular-nums text-zinc-400">
                  {exp.period}
                </p>
                <span className="mt-2 inline-block rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                  {experienceLabel[exp.type] ?? exp.type}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-base font-semibold text-zinc-100">{exp.role}</h3>
                <p className="text-sm text-amber-400/90">{exp.organization}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
                  {exp.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-zinc-600">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 / CATATAN TERBARU (JOIN note_topics <-> notes) */}
      <section className="border-b border-zinc-800/80 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-zinc-500">03 / CATATAN</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
              Tulisan &amp; Catatan Belajar
            </h2>
          </div>
          <Link
            href="/notes"
            className="font-mono text-xs text-zinc-400 transition-colors hover:text-amber-400"
          >
            Semua catatan →
          </Link>
        </div>

        {latestNotes.length === 0 ? (
          <p className="mt-8 rounded-lg border border-dashed border-zinc-800 p-8 text-sm text-zinc-500">
            Belum ada catatan yang dipublikasikan.
          </p>
        ) : (
          <div className="mt-8 divide-y divide-zinc-800/80 rounded-xl border border-zinc-800 bg-zinc-900/25">
            {latestNotes.map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.slug}`}
                className="group flex flex-col justify-between gap-3 p-5 transition-colors hover:bg-zinc-900/70 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-amber-400">
                      {note.topic.name}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-zinc-500">
                      {formatDate(note.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-medium text-zinc-100 group-hover:text-white">
                    {note.title}
                  </h3>
                  {note.summary && (
                    <p className="mt-1 text-sm text-zinc-400">{note.summary}</p>
                  )}
                </div>
                <span className="shrink-0 font-mono text-xs text-zinc-500 group-hover:text-zinc-200">
                  Baca →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 04 / PLACEHOLDER KONTAK (Diisi di Langkah 3C) */}
      <section id="contact" className="py-16">
        <p className="font-mono text-xs text-zinc-500">04 / KONTAK</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Hubungi Saya
        </h2>
        <p className="mt-3 max-w-lg text-sm text-zinc-400">
          Form kontak terhubung ke tabel <code className="font-mono text-zinc-200">contact_messages</code>{" "}
          akan kita bangun di Langkah 3C bersama validasi Zod dan Server Action.
        </p>
      </section>
    </div>
  );
}
