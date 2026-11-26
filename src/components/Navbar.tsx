"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Proyek", href: "/projects" },
    { label: "Pengalaman", href: "/experience" },
    { label: "Catatan", href: "/notes" },
    { label: "Kontak", href: "/#contact" },
];

export function Navbar() {
    //Membaca halaman apa yang sedang terbuka saat ini
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
            <div className="flex h-16 w-full items-center justify-between px-6 md:px-10 lg:px-12">
                <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-100 transition-colors hover::text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span>nabil.fabian</span>
                </Link>

                <nav className="flex items-center gap-5 text-sm sm:gap-7">
                    {navItems.map((item) => {
                        const isActive =
                            item.href !== "#contact" && (pathname === item.href || pathname.startsWith('${item.href}/'));
                        
                        return (
                            <Link key={item.href} href={item.href} className={`transition-colors duration-150 ${isActive ? "text-accent" : "text-zinc-400 hover:text-zinc-100"}`}>
                                {item.label}
                            </Link>
                        );
                        
                    })}

                </nav>
            </div>
        </header>
    );
}