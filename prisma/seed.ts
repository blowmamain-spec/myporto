import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Seed Projects
  const projects = [
    {
      slug: "gurindam-hub",
      title: "GURINDAM HUB",
      tagline: "Sistem layanan dan verifikasi data UMKM & Koperasi Provinsi Kepulauan Riau.",
      summary:
        "Aplikasi web multi-role untuk pengelolaan berkas mitra UMKM dan Koperasi di lingkungan DKUKM Kepri dengan alur verifikasi bertahap, ekspor Excel, dan keamanan Row Level Security.",
      content: `## Latar Belakang
Dibangun untuk merapikan proses pendaftaran, verifikasi berkas, dan pelaporan data UMKM serta Koperasi di DKUKM Provinsi Kepulauan Riau.

## Arsitektur Utama
- **Frontend**: Vite MPA, Vanilla JS, tema identitas daerah (Navy/Gold), Chart.js, dan ExcelJS.
- **Backend & Database**: PostgreSQL dengan Row Level Security (RLS) untuk 6 level role berbeda serta Edge Functions untuk manajemen akun.
- **Quality Control**: Sinkronisasi skema field otomatis dan unit test Vitest.`,
      category: "FULLSTACK" as const,
      techStack: ["Vite", "JavaScript", "PostgreSQL", "Supabase", "RLS", "Vitest"],
      featured: true,
      published: true,
      sortOrder: 1,
    },
    {
      slug: "staff-performance-saas",
      title: "Staff Performance Monitoring SaaS",
      tagline: "Platform SaaS multi-tenant untuk pemantauan kinerja dan dokumentasi tim.",
      summary:
        "Aplikasi monitoring kinerja berbasis isolasi organisasi (Organization -> Team -> User) dengan 4 hirarki peran menggunakan Next.js App Router, Prisma, dan PostgreSQL.",
      content: `## Fokus Arsitektur
Dirancang dari nol untuk menerapkan pola isolasi data multi-tenant yang aman antar organisasi.

## Fitur Inti
- Hirarki 4 peran: Platform Admin, Org Admin, Supervisor, dan Member.
- Pemisahan tegas antara Server Components untuk query database dan Client Components untuk interaksi UI.
- Manajemen absensi, skor kinerja, dan dokumen internal per tim.`,
      category: "FULLSTACK" as const,
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      featured: true,
      published: true,
      sortOrder: 2,
    },
    {
      slug: "adikara-2026-data-mining",
      title: "Prediksi Interaksi Media Sosial (ADIKARA 2026)",
      tagline: "Pipeline feature engineering dan pemodelan regresi untuk Final Lomba Data Mining ADIKARA 2026.",
      summary:
        "Eksperimen validasi silang, transformasi target logaritmik, dan ensemble gradient boosting dengan metrik evaluasi RMSLE.",
      content: `## Tantangan
Memprediksi jumlah likes pada data teks media sosial dengan distribusi target sangat miring (heavy-tailed).

## Pendekatan Teknis
- Evaluasi ketat memakai Cross-Validation agar skor lokal selaras dengan leaderboard.
- Ekstraksi fitur teks, temporal, dan interaksi akun.
- Optimasi langsung terhadap metrik RMSLE.`,
      category: "DATA_AI" as const,
      techStack: ["Python", "Scikit-learn", "LightGBM", "Pandas", "Jupyter"],
      featured: true,
      published: true,
      sortOrder: 3,
    },
    {
      slug: "owasp-ztna-security-labs",
      title: "Web App Pentest & ZTNA Lab",
      tagline: "Eksplorasi audit keamanan aplikasi web (OWASP Top 10) dan arsitektur Zero Trust.",
      summary:
        "Kumpulan studi penilaian kerentanan web (SQLi, IDOR, Broken Access Control), eskalasi privilege container Docker, dan implementasi lab ZTNA berbasis Keycloak + OpenZiti.",
      content: `## Ruang Lingkup
- Pengujian 10 kategori kerentanan OWASP Top 10 beserta rekomendasi mitigasi di level kode.
- Lab isolasi jaringan Zero Trust (Keycloak + OpenZiti) pada 4 VM Ubuntu.
- Latihan privilege escalation Docker dan analisis CTF (Hack The Box, COMPFEST).`,
      category: "CYBERSEC" as const,
      techStack: ["OWASP", "Burp Suite", "Docker", "Linux", "Keycloak", "OpenZiti"],
      featured: false,
      published: true,
      sortOrder: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  // 2. Seed Experiences
  const experiences = [
    {
      id: "exp-dkukm-kepri",
      role: "Software Developer & Operational Support",
      organization: "DKUKM Provinsi Kepulauan Riau",
      period: "2025 - Sekarang",
      type: "WORK" as const,
      highlights: [
        "Merancang dan mengembangkan sistem GURINDAM HUB untuk layanan data UMKM dan Koperasi.",
        "Mengelola skema PostgreSQL, kebijakan RLS, serta alur verifikasi multi-role.",
      ],
      sortOrder: 1,
    },
    {
      id: "exp-pt-perorangan",
      role: "Founder & Fullstack Developer",
      organization: "Perseroan Perorangan (Software & SaaS)",
      period: "2026 - Sekarang",
      type: "WORK" as const,
      highlights: [
        "Membangun produk template sistem monitoring, approval instansi, dan arsip digital.",
        "Menangani pengembangan web custom berbasis Laravel, Next.js, dan PostgreSQL.",
      ],
      sortOrder: 2,
    },
    {
      id: "exp-labs-telu",
      role: "Peserta Study Group & Pelatihan Lab",
      organization: "MBC Lab, Lab NOS & NetSchool Telkom University",
      period: "2025 - 2026",
      type: "LAB" as const,
      highlights: [
        "Membangun lab Zero Trust Network Access (Keycloak + OpenZiti) dan hardening container Docker.",
        "Mendalami jaringan komputer, cloud computing, dan keamanan sistem.",
      ],
      sortOrder: 3,
    },
    {
      id: "exp-aws-aif",
      role: "AWS Certified AI Practitioner (AIF-C01)",
      organization: "Amazon Web Services",
      period: "2026",
      type: "CERT" as const,
      highlights: [
        "Tersertifikasi pada fundamental AI/ML, Generative AI, dan tata kelola keamanan AI di AWS.",
      ],
      sortOrder: 4,
    },
    {
      id: "exp-cisometric",
      role: "Offensive Security Class (Grade A / 87)",
      organization: "Cisometric Academy Batch 4",
      period: "2026",
      type: "CERT" as const,
      highlights: [
        "Menyelesaikan pelatihan praktik web application pentesting dan pelaporan kerentanan.",
      ],
      sortOrder: 5,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: exp,
      create: exp,
    });
  }

  // 3. Seed Note Topics (Relasi 1-to-Many)
  const topicFullstack = await prisma.noteTopic.upsert({
    where: { slug: "fullstack-engineering" },
    update: {
      name: "Fullstack Engineering",
      description: "Catatan arsitektur Next.js, Laravel, PostgreSQL, dan Docker.",
      sortOrder: 1,
    },
    create: {
      slug: "fullstack-engineering",
      name: "Fullstack Engineering",
      description: "Catatan arsitektur Next.js, Laravel, PostgreSQL, dan Docker.",
      sortOrder: 1,
    },
  });

  const topicCybersec = await prisma.noteTopic.upsert({
    where: { slug: "cybersecurity-ctf" },
    update: {
      name: "Cybersecurity & CTF",
      description: "Writeup lab keamanan aplikasi web, OWASP Top 10, dan hardening Linux.",
      sortOrder: 2,
    },
    create: {
      slug: "cybersecurity-ctf",
      name: "Cybersecurity & CTF",
      description: "Writeup lab keamanan aplikasi web, OWASP Top 10, dan hardening Linux.",
      sortOrder: 2,
    },
  });

  // 4. Seed Notes (terhubung ke NoteTopic lewat topicId)
  const notes = [
    {
      slug: "catatan-prisma-7-docker-postgres",
      topicId: topicFullstack.id,
      title: "Catatan Setup Prisma 7 + Docker PostgreSQL di Next.js",
      summary: "Ringkasan perubahan penting di Prisma 7: config terpisah, driver adapter pg, dan named volume Docker.",
      content: `## Poin Penting
1. Di Prisma 7, koneksi CLI diatur di file konfigurasi terpisah (\`prisma7.config.ts\`), bukan lagi di \`schema.prisma\`.
2. Koneksi runtime memakai driver adapter \`@prisma/adapter-pg\` dan \`pg\` Pool.
3. Selalu gunakan **Named Volume** di Docker Compose agar data PostgreSQL tetap aman saat container di-restart.

\`\`\`bash
docker compose up -d
npx prisma migrate dev --name init_portfolio_schema
npx prisma generate
\`\`\``,
      tags: ["prisma", "postgresql", "docker", "nextjs"],
      published: true,
      publishedAt: new Date("2026-11-25T14:00:00Z"),
    },
    {
      slug: "checklist-dasar-keamanan-aplikasi-web",
      topicId: topicCybersec.id,
      title: "Checklist Awal Hardening Web App Sebelum Deploy",
      summary: "Langkah minimum yang selalu dicek sebelum merilis aplikasi web ke publik.",
      content: `## Checklist Minimum
- Validasi semua input di sisi server (jangan hanya mengandalkan validasi HTML/client).
- Simpan sesi login admin di cookie \`HttpOnly\`, \`Secure\`, dan \`SameSite=Lax\`.
- Pastikan tidak ada file \`.env\` atau kredensial yang ikut masuk ke commit Git.
- Pasang rate limiting pada endpoint sensitif seperti login dan form kontak.`,
      tags: ["owasp", "security", "checklist"],
      published: true,
      publishedAt: new Date("2026-11-25T14:30:00Z"),
    },
  ];

  for (const note of notes) {
    await prisma.note.upsert({
      where: { slug: note.slug },
      update: note,
      create: note,
    });
  }

  console.log("Seed selesai: projects, experiences, note_topics, dan notes berhasil diisi.");
}

main()
  .catch((error) => {
    console.error("Gagal menjalankan seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
