import Link from "next/link";

const navItems = [
    { label: "Proyek", href: "/#projects" },
    { label: "Pengalaman", href: "/#experience" },
    { label: "Catatan", href: "/#notes" },
    { label: "Kontak", href: "/#contact" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 border-b border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-100 hover:text-white">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span>nabil.fabian</span>
                </Link>

                <nav className="flex items-center gap-6 text-sm text-zinc-400">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="transition-colors duration-150 hover:text-zinc-100">
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}