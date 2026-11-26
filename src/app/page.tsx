// Modul Node.js (jalan di server) untuk cek apakah thumbnail proyek ada di public/
import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

const categoryLabel: Record<string, string> = {
  FULLSTACK: "Fullstack",
  CYBERSEC: "Cybersecurity",
  DATA_AI: "Data & AI",
};

function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

// Mengecek gambar preview proyek di public/images/projects/<slug>.(jpg/png/webp)
function findPublicImage(basePath: string): string | null {
  const extensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const matchedExt = extensions.find((ext) =>
    fs.existsSync(path.join(process.cwd(), "public", `${basePath}${ext}`))
  );
  return matchedExt ? `/${basePath}${matchedExt}` : null;
}

export default async function HomePage() {
  const [
    featuredProjects,
    recentExperiences,
    latestNotes,
    totalProjects,
    totalExperiences,
    totalNotes,
  ] = await Promise.all([
    prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
    prisma.experience.findMany({
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
    prisma.note.findMany({
      where: { published: true },
      include: { topic: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.project.count({ where: { published: true } }),
    prisma.experience.count(),
    prisma.note.count({ where: { published: true } }),
  ]);

  const heroDesktop = findPublicImage("images/hero-desktop");
  const heroMobile = findPublicImage("images/hero-mobile");

  return (
    <div className="w-full px-6 md:px-10 lg:px-12">
      {/* ================= 00 / FULLSCREEN HERO (100vh) ================= */}
      {/* min-h-[calc(100vh-4rem)] membuat Hero mengisi 1 layar penuh di bawah Navbar */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col justify-between border-b border-zinc-800/80 py-6 lg:py-8">
        {/* Atas: Strip 4 kolom metadata HUD */}
        <div className="grid grid-cols-2 gap-4 border-b border-zinc-800/80 pb-4 font-mono text-xs uppercase tracking-wider sm:grid-cols-4">
          <div>
            <p className="text-zinc-500">CLASS</p>
            <p className="mt-1 text-zinc-200">Fullstack &amp; Cybersec</p>
          </div>
          <div>
            <p className="text-zinc-500">SERVER</p>
            <p className="mt-1 text-zinc-200">Bandung · Kepri</p>
          </div>
          <div>
            <p className="text-zinc-500">STATUS</p>
            <p className="mt-1 flex items-center gap-2 text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Ready for Quest
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-zinc-500">BUILD</p>
            <p className="mt-1 tabular-nums text-zinc-200">№ 01 / 2026</p>
          </div>
        </div>

                {/* Tengah: Area Nama + Background Responsif (tanpa rounded-lg -> sudut tajam) */}
        <div className="relative my-4 flex flex-1 min-h-[38vh] items-end overflow-hidden md:items-center">
          {/* Lapis 1A: Foto Desktop hanya mengisi 48% sisi kanan (rasio ~3:2 -> tidak nge-zoom!) */}
          {heroDesktop && (
            <div className="pointer-events-none absolute inset-y-0 right-0 left-0 opacity-0 transition-opacity duration-500 ease-out md:left-auto md:w-[48%] md:opacity-100">
              <Image
                src={heroDesktop}
                alt="Hero backdrop desktop"
                fill
                priority
                unoptimized={heroDesktop.endsWith(".gif")}
                className="object-cover object-center"
              />
              {/* Gradasi halus di tepi kiri foto agar menyatu ke latar hitam di belakang nama */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/30 to-transparent" />
            </div>
          )}

          {/* Lapis 1B: Foto Mobile tegak 3:4 */}
          {heroMobile && (
            <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500 ease-out md:opacity-0">
              <Image
                src={heroMobile}
                alt="Hero backdrop mobile"
                fill
                priority
                unoptimized={heroMobile.endsWith(".gif")}
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Lapis 2B: Gradasi Mobile (hitam dari bawah ke atas agar nama di pojok kiri bawah tajam) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent md:hidden" />
          {/* Lapis 2C: Gradasi tipis tepi atas-bawah */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950" />

          {/* Lapis 3 (z-10): Teks Nama paling depan */}
          <Reveal className="relative z-10 p-3 pb-5 md:p-0">
            <h1 className="text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-zinc-50">
              M. Nabil
              <br />
              <span className="text-zinc-300">Fabian</span>
            </h1>
          </Reveal>
        </div>

        {/* Bawah: Tagline besar + tombol + strip statistik live */}
        <Reveal delay={0.1}>
          <div className="flex flex-col justify-between gap-6 border-t border-zinc-800/80 pt-6 md:flex-row md:items-end">
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:text-xl">
              Membangun aplikasi web dengan Next.js, Laravel, dan PostgreSQL
              dengan fokus pada arsitektur data dan keamanan aplikasi.
            </p>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/projects"
                className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-accent-strong lg:text-base"
              >
                Explore Quests
              </Link>
              <Link
                href="#contact"
                className="rounded-md border border-zinc-800 bg-surface px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-accent/50 lg:text-base"
              >
                Kontak
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-500 sm:text-sm">
            <span className="text-accent">SCROLL TO EXPLORE ↓</span>
            <div className="flex flex-wrap items-center gap-4 tabular-nums">
              <span>
                <strong className="text-zinc-200">{totalProjects}</strong> Quests
              </span>
              <span>·</span>
              <span>
                <strong className="text-zinc-200">{totalExperiences}</strong> Career Logs
              </span>
              <span>·</span>
              <span>
                <strong className="text-zinc-200">{totalNotes}</strong> Field Notes
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= № 01 // SELECTED QUESTS (PROYEK) ================= */}
      <section className="border-b border-zinc-800/80 py-20 lg:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-4 border-b border-zinc-800/80 pb-5">
            <div>
              <p className="font-mono text-xs text-accent sm:text-sm">
                № 01 // SELECTED QUESTS
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
                Proyek Pilihan
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-accent sm:text-sm"
            >
              Lihat semua ({totalProjects}) →
            </Link>
          </div>
        </Reveal>

        <div className="divide-y divide-zinc-800/80">
          {featuredProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            const totalStr = String(featuredProjects.length).padStart(2, "0");
            const thumbImage = findPublicImage(`images/projects/${project.slug}`);

            return (
              <Reveal key={project.id} delay={index * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid items-center gap-8 py-10 transition-colors hover:bg-zinc-900/35 md:grid-cols-12 md:px-4"
                >
                  {/* Kiri: Indeks + Kategori + Stack */}
                  <div className="md:col-span-3">
                    <p className="font-mono text-sm tabular-nums text-zinc-500">
                      {num} / {totalStr}
                    </p>
                    <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-accent">
                      {categoryLabel[project.category] ?? project.category}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tengah: Kotak gambar preview proyek */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-800 bg-surface transition-colors group-hover:border-accent/40 md:col-span-5">
                    {thumbImage ? (
                      <Image
                        src={thumbImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full flex-col justify-between p-5">
                        <span className="font-mono text-xs text-zinc-600">
                          PREVIEW // {num}
                        </span>
                        <span className="font-mono text-sm text-zinc-400">
                          /{project.slug}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Kanan: Judul besar + tagline + OPEN QUEST -> */}
                  <div className="flex flex-col justify-between md:col-span-4 md:text-right">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-zinc-100 group-hover:text-accent lg:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400 lg:text-base">
                        {project.tagline}
                      </p>
                    </div>
                    <span className="mt-6 inline-block font-mono text-xs tracking-wider text-zinc-400 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent sm:text-sm">
                      OPEN QUEST →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================= № 02 // CAREER LOG (PENGALAMAN) ================= */}
      <section className="border-b border-zinc-800/80 py-20 lg:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-4 border-b border-zinc-800/80 pb-5">
            <div>
              <p className="font-mono text-xs text-accent sm:text-sm">
                № 02 // CAREER LOG
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
                Pengalaman &amp; Sertifikasi
              </h2>
            </div>
            <Link
              href="/experience"
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-accent sm:text-sm"
            >
              Lihat lengkap ({totalExperiences}) →
            </Link>
          </div>
        </Reveal>

        <div className="divide-y divide-zinc-800/80">
          {recentExperiences.map((exp, index) => (
            <Reveal key={exp.id} delay={index * 0.06}>
              <div className="grid gap-2 py-6 sm:grid-cols-12 sm:items-center sm:gap-6">
                <span className="font-mono text-xs tabular-nums text-zinc-500 sm:col-span-3 sm:text-sm">
                  {exp.period}
                </span>
                <span className="text-base font-medium text-zinc-100 sm:col-span-5 lg:text-lg">
                  {exp.role}
                </span>
                <span className="text-sm text-zinc-400 sm:col-span-4 sm:text-right lg:text-base">
                  {exp.organization}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= № 03 // FIELD NOTES (CATATAN) ================= */}
      <section className="border-b border-zinc-800/80 py-20 lg:py-28">
        <Reveal>
          <div className="flex items-end justify-between gap-4 border-b border-zinc-800/80 pb-5">
            <div>
              <p className="font-mono text-xs text-accent sm:text-sm">
                № 03 // FIELD NOTES
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
                Catatan Terbaru
              </h2>
            </div>
            <Link
              href="/notes"
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-accent sm:text-sm"
            >
              Semua catatan ({totalNotes}) →
            </Link>
          </div>
        </Reveal>

        <div className="divide-y divide-zinc-800/80">
          {latestNotes.map((note, index) => (
            <Reveal key={note.id} delay={index * 0.06}>
              <Link
                href={`/notes/${note.slug}`}
                className="group flex flex-col justify-between gap-3 py-6 transition-colors hover:bg-zinc-900/35 sm:flex-row sm:items-center sm:px-4"
              >
                <div className="flex flex-wrap items-center gap-3.5">
                  <span className="rounded border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                    {note.topic.name}
                  </span>
                  <span className="text-base font-medium text-zinc-100 group-hover:text-accent lg:text-lg">
                    {note.title}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-xs tabular-nums text-zinc-500 sm:text-sm">
                  {formatDate(note.publishedAt)}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= № 04 // OPEN CHANNEL (KONTAK) ================= */}
      <section id="contact" className="py-20 lg:py-28">
        <Reveal>
          <p className="font-mono text-xs text-accent sm:text-sm">
            № 04 // OPEN CHANNEL
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
            Siap untuk quest berikutnya?
          </h2>
          <p className="mt-4 max-w-xl text-base text-zinc-400 lg:text-lg">
            Form pesan langsung ke PostgreSQL akan kita pasang di sini setelah
            halaman /projects, /experience, dan /notes selesai.
          </p>
        </Reveal>
      </section>
    </div>
  );
}