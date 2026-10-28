import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowUp } from "lucide-react";
import { ApertureMark, Marquee } from "./ui";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

export function FilmRail() {
  const { scrollYProgress } = useScroll();
  const [frame, setFrame] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setFrame(Math.max(1, Math.round(v * 999))));

  return (
    <aside
      aria-hidden
      className="fixed inset-y-0 left-0 z-40 hidden w-14 flex-col items-center justify-between border-r border-bone/10 bg-ink/80 py-5 lg:flex"
    >
      <div className="sprockets absolute inset-y-0 left-0 w-3 opacity-70" />
      <ApertureMark className="h-6 w-6 text-safelight" />
      <div className="flex flex-1 items-center">
        <p className="label rotate-180 text-ash [writing-mode:vertical-rl]">
          R. Perera — Portfolio MMXXVI — Colombo
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="label text-safelight">FR</span>
        <span className="font-mono text-[0.6875rem] tabular-nums text-bone/70">{String(frame).padStart(3, "0")}</span>
        <span className="h-8 w-px bg-bone/20" />
      </div>
    </aside>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-safelight"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 lg:pl-14 ${
          scrolled ? "border-b border-bone/10 bg-ink/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
          <a href="#top" className="group flex items-center gap-3">
            <ApertureMark className="h-7 w-7 text-safelight transition-transform duration-700 group-hover:rotate-[60deg]" />
            <span className="leading-tight">
              <span className="label block text-paper">Ravindu Perera</span>
              <span className="label block text-[0.6rem] text-ash">Web · Design · Photo · VFX</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="label rule-hover text-bone/75 transition-colors hover:text-paper">
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="label inline-flex items-center gap-2 border border-safelight/60 bg-safelight/10 px-4 py-2.5 text-safelight transition-colors hover:bg-safelight hover:text-ink"
            >
              Let&apos;s talk <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="label flex items-center gap-2 border border-bone/20 px-3 py-2 text-bone md:hidden"
          >
            Menu <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink px-6 pb-10 pt-5 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="label text-ash">Index</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="label flex items-center gap-2 border border-bone/20 px-3 py-2 text-bone"
              >
                Close <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-bone/10 pb-4"
                >
                  <span className="label text-safelight">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-5xl text-paper">{l.label}</span>
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="label mt-auto inline-flex items-center justify-center gap-2 bg-safelight px-6 py-4 text-ink"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function DisciplineBand() {
  return (
    <div className="relative border-y border-ember/40 bg-safelight text-ink">
      <Marquee
        items={[
          "Web Development",
          "Graphic Design",
          "Photography",
          "VFX — in training",
          "Colombo, Sri Lanka",
          "Available for freelance",
        ]}
        separator="◆"
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-bone/10 bg-ink lg:pl-14">
      <div className="sprockets-x h-3 w-full opacity-60" />
      <div className="px-6 py-14 sm:px-10 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <ApertureMark className="h-8 w-8 text-safelight" />
              <p className="display text-3xl text-paper">
                Ravindu <em className="italic text-safelight">Perera</em>
              </p>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">
              Web development, graphic design and photography from Colombo. Currently learning VFX and taking on small
              study commissions.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label text-ash">Contact</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a className="rule-hover text-bone hover:text-paper" href="mailto:hello@ravinduperera.com">
                  hello@ravinduperera.com
                </a>
              </li>
              <li>
                <a className="rule-hover text-bone hover:text-paper" href="tel:+94771234567">
                  +94 77 123 4567
                </a>
              </li>
              <li className="text-ash">Colombo 05, Sri Lanka</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label text-ash">Elsewhere</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                { label: "Instagram — @ravindu.frames", href: "https://instagram.com" },
                { label: "Behance — ravinduperera", href: "https://behance.net" },
                { label: "GitHub — ravindu-p", href: "https://github.com" },
                { label: "LinkedIn — ravinduperera", href: "https://linkedin.com" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    className="rule-hover inline-flex items-center gap-1.5 text-bone hover:text-paper"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label} <ArrowUpRight className="h-3.5 w-3.5 text-safelight" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ash">
            RP-2026 · Frame 001 · Kodak 5219 · Colombo — <span className="text-bone/60">© 2026 Ravindu Perera</span>
          </p>
          <a href="#top" className="label inline-flex items-center gap-2 text-safelight">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
