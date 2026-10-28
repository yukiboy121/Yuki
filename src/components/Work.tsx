import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { categoryLabel, projects, toolkit, type Category, type Project } from "../data";
import { Reveal, SectionHead } from "./ui";

/* ================================================================== */
function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Project[];
  index: number | null;
  onIndex: (i: number | null) => void;
  onClose: () => void;
}) {
  const count = items.length;
  const prev = useCallback(() => onIndex(index === null ? null : (index - 1 + count) % count), [index, count, onIndex]);
  const next = useCallback(() => onIndex(index === null ? null : (index + 1) % count), [index, count, onIndex]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, next, prev]);

  const item = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/96 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-bone/12 px-5 py-4 sm:px-8">
            <p className="label text-safelight">
              Frame {String(index === null ? 0 : index + 1).padStart(3, "0")} / {String(count).padStart(3, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="label flex items-center gap-2 border border-bone/20 px-3 py-2 text-bone transition-colors hover:border-safelight hover:text-safelight"
            >
              Close <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:px-10">
            <motion.img
              key={item.id}
              src={item.image}
              alt={item.title}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full max-w-full object-contain shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
            />
          </div>

          <div className="border-t border-bone/12 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="label text-ash">
                  {categoryLabel[item.category]} · {item.year} · {item.role}
                </p>
                <h3 className="display mt-2 text-[clamp(1.9rem,4vw,2.9rem)] text-paper">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone/75">{item.note}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous frame"
                  className="flex h-11 w-11 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-safelight hover:text-safelight"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next frame"
                  className="flex h-11 w-11 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-safelight hover:text-safelight"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
const filters: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "web", label: "Web Development" },
  { key: "design", label: "Graphic Design" },
  { key: "photo", label: "Photography" },
  { key: "vfx", label: "VFX Study" },
];

export function Work() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="work" className="relative px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <Reveal>
        <SectionHead
          index="03"
          kicker="Selected work"
          sinhala="තෝරාගත් කාර්යයන්"
          title="Eight projects,"
          italic="three disciplines."
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3 border-y border-bone/12 py-4">
          <span className="label mr-2 text-ash">Filter</span>
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  setFilter(f.key);
                  setIndex(null);
                }}
                className={`label border px-4 py-2.5 transition-colors duration-300 ${
                  active
                    ? "border-safelight bg-safelight text-ink"
                    : "border-bone/15 text-bone/70 hover:border-bone/40 hover:text-paper"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          <span className="label ml-auto text-ash">
            {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} frames
          </span>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => {
            const wide = p.span.includes("12");
            return (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`group ${p.span}`}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="block w-full cursor-pointer text-left"
                  aria-label={`Open ${p.title}`}
                >
                  <div className="relative overflow-hidden bg-graphite">
                    <img
                      src={p.image}
                      alt={p.subtitle}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055] ${
                        wide ? "aspect-[21/9]" : "aspect-[4/3]"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-6">
                      <div>
                        <p className="label text-safelight">
                          {p.index} — {categoryLabel[p.category]}
                        </p>
                        <h3 className="display mt-2 text-[clamp(1.75rem,3.2vw,2.6rem)] text-paper">{p.title}</h3>
                        <p className="mt-1 text-sm text-bone/70">{p.subtitle}</p>
                      </div>
                      <span className="label hidden shrink-0 text-bone/60 sm:block">{p.year}</span>
                    </div>
                    <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center border border-paper/25 bg-ink/50 text-paper opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Plus className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-12">
                    <p className="text-sm leading-relaxed text-bone/70 sm:col-span-8">{p.note}</p>
                    <ul className="flex flex-wrap gap-1.5 sm:col-span-4 sm:justify-end">
                      {p.tools.map((t) => (
                        <li key={t} className="label border border-bone/12 px-2 py-1 text-ash">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <div className="mt-16 border border-dashed border-bone/20 px-8 py-20 text-center">
          <p className="display text-3xl text-paper">Nothing filed under that — yet.</p>
          <p className="mt-3 text-bone/60">The drawer is empty for this discipline. Try another filter.</p>
        </div>
      )}

      <Lightbox items={visible} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </section>
  );
}

/* ================================================================== */
const photoSet = projects.filter((p) => p.category === "photo");

export function Photography() {
  const [index, setIndex] = useState<number | null>(null);
  const [feature, ...rest] = photoSet;

  return (
    <section id="photography" className="relative border-y border-bone/12 bg-graphite">
      <div className="sprockets-x h-3 w-full opacity-50" />
      <div className="px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
        <Reveal>
          <SectionHead
            index="04"
            kicker="Darkroom"
            sinhala="ඡායාරූප ශිල්පය"
            title="Photographs,"
            italic="made on film and sensor."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="group relative mt-14 block w-full cursor-pointer overflow-hidden bg-ink text-left"
          >
            <img
              src={feature.image}
              alt={feature.subtitle}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] md:aspect-[21/9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/20 to-ink/25" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 sm:p-10">
              <div>
                <p className="label text-safelight">{feature.index} — Contact sheet, frame 07</p>
                <h3 className="display mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] text-paper">{feature.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-bone/75">{feature.note}</p>
              </div>
              <span className="label border border-paper/25 px-4 py-2.5 text-paper transition-colors group-hover:border-safelight group-hover:text-safelight">
                Open frame
              </span>
            </div>
          </button>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setIndex(i + 1)}
                className="group block w-full cursor-pointer overflow-hidden bg-ink text-left"
              >
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.subtitle}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="label text-safelight">
                      {p.index} — {p.year}
                    </p>
                    <h4 className="display mt-2 text-3xl text-paper">{p.title}</h4>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-bone/70">{p.note}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="sprockets-x h-3 w-full opacity-50" />

      <Lightbox items={photoSet} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </section>
  );
}

/* ================================================================== */
export function Toolkit() {
  return (
    <section id="toolkit" className="relative px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
      <Reveal>
        <SectionHead index="05" kicker="Toolkit" sinhala="මෙවලම්" title="The bench," italic="and what's on it." />
      </Reveal>

      <div className="mt-14 border-t border-bone/12">
        {toolkit.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-4 border-b border-bone/12 py-7 md:grid-cols-12">
              <div className="md:col-span-3">
                <h3 className="display text-2xl text-paper">{g.group}</h3>
                <p className="sinhala mt-1 text-xs text-ash">{g.sinhala}</p>
              </div>
              <ul className="flex flex-wrap items-start gap-2 md:col-span-9">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className={`label px-3 py-2 ${
                      item.includes("learning")
                        ? "border border-leader/40 text-leader"
                        : "border border-bone/15 text-bone/75"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { k: "Colour", v: "Graded on a calibrated BenQ SW271, Rec.709 reference, X-Rite i1 profiling." },
            { k: "Delivery", v: "Figma + Git + documented components. Source files always handed over." },
            { k: "Turning around", v: "Sites 3–6 weeks · identity 4–8 weeks · shoots 1–2 weeks." },
          ].map((b) => (
            <div key={b.k} className="border-t border-safelight/50 pt-5">
              <p className="label text-safelight">{b.k}</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/75">{b.v}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}


