import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/* Aperture monogram — six-blade iris, drawn by hand. One colour,       */
/* legible at 16px, scales to any size.                                */
/* ------------------------------------------------------------------ */
export function ApertureMark({ className, title = "Ravindu Perera" }: { className?: string; title?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <path id={`${id}-blade`} d="M33 24 L40.1 37.5" />
      </defs>
      <circle cx="24" cy="24" r="21" />
      <path d="M33 24 L28.5 31.8 L19.5 31.8 L15 24 L19.5 16.2 L28.5 16.2 Z" />
      <use href={`#${id}-blade`} />
      <use href={`#${id}-blade`} transform="rotate(60 24 24)" />
      <use href={`#${id}-blade`} transform="rotate(120 24 24)" />
      <use href={`#${id}-blade`} transform="rotate(180 24 24)" />
      <use href={`#${id}-blade`} transform="rotate(240 24 24)" />
      <use href={`#${id}-blade`} transform="rotate(300 24 24)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
export function SectionHead({
  index,
  kicker,
  title,
  italic,
  sinhala,
  tone = "dark",
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  italic?: string;
  sinhala?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dim = tone === "dark" ? "text-ash" : "text-ink/55";
  const strong = tone === "dark" ? "text-bone" : "text-ink";
  return (
    <div className={clsx("grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-12", className)}>
      <div className="md:col-span-3">
        <div className="flex items-baseline gap-3">
          <span className={clsx("label", tone === "dark" ? "text-safelight" : "text-ember")}>{index}</span>
          <span className={clsx("label", dim)}>{kicker}</span>
        </div>
        <div className={clsx("mt-3 h-px w-full", tone === "dark" ? "bg-bone/15" : "bg-ink/15")} />
        {sinhala && (
          <p className={clsx("sinhala mt-4 text-sm", tone === "dark" ? "text-ash" : "text-ink/60")}>{sinhala}</p>
        )}
      </div>
      <h2 className={clsx("display text-[clamp(2.6rem,6.4vw,5.25rem)] md:col-span-9", strong)}>
        {title}{" "}
        {italic && <em className={clsx("italic", tone === "dark" ? "text-safelight" : "text-ember")}>{italic}</em>}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function Marquee({
  items,
  className,
  slow = false,
  separator = "◆",
}: {
  items: string[];
  className?: string;
  slow?: boolean;
  separator?: string;
}) {
  const run = [...items, ...items];
  return (
    <div className={clsx("relative flex overflow-hidden", className)}>
      <div className={clsx("flex min-w-max shrink-0 items-center", slow ? "animate-marquee-slow" : "animate-marquee")}>
        {run.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="label px-6 py-3 text-current">{item}</span>
            <span aria-hidden className="text-[0.55rem] opacity-50">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
