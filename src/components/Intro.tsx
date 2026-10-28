import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { images, services, stats } from "../data";
import { Reveal, SectionHead } from "./ui";

/* ================================================================== */
export function Hero() {
  const reduce = useReducedMotion();
  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: "0.35em" },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={images.hero}
          alt="Prints, a camera body and a loupe on a studio desk under a single tungsten lamp"
          className="h-full w-full object-cover object-[72%_center]"
          initial={reduce ? undefined : { scale: 1.08 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/55 md:to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      </div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-30 origin-top bg-safelight"
          initial={{ y: 0 }}
          animate={{ y: "-101%" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        />
      )}

      <div className="relative z-20 px-6 pb-16 pt-32 sm:px-10 lg:px-12">
        <motion.div {...line(0.55)} className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="label text-safelight">Portfolio — 2026</span>
          <span className="h-px w-14 bg-bone/25" />
          <span className="label text-ash">Colombo, Sri Lanka · 06°55′N 79°51′E</span>
        </motion.div>

        <h1 className="display mt-8 text-[clamp(3.15rem,11vw,9.5rem)] text-paper">
          <motion.span {...line(0.68)} className="block">
            Ravindu
          </motion.span>
          <motion.span {...line(0.8)} className="block italic text-safelight">
            Perera
          </motion.span>
        </h1>

        <motion.p {...line(0.92)} className="mt-8 max-w-2xl text-lg leading-relaxed text-bone/90 sm:text-xl">
          Web developer, graphic designer and photographer. I build the site, shape the identity, and shoot the pictures
          it runs on — and I&apos;m currently learning <span className="text-leader">VFX &amp; compositing</span>.
        </motion.p>

        <motion.p {...line(1.02)} className="sinhala mt-4 max-w-2xl text-sm text-bone/60">
          වෙබ් සංවර්ධනය · ග්‍රැෆික් නිර්මාණ · ඡායාරූප ශිල්පය — දැන් VFX කලාව ඉගෙන ගනිමින්.
        </motion.p>

        <motion.div {...line(1.12)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="label inline-flex items-center gap-2 bg-safelight px-6 py-4 text-ink transition-colors hover:bg-paper"
          >
            Selected work <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="label inline-flex items-center gap-2 border border-bone/25 px-6 py-4 text-bone transition-colors hover:border-safelight hover:text-safelight"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          {...line(1.24)}
          className="mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden border border-bone/12 bg-bone/12 sm:grid-cols-3"
        >
          {[
            { k: "Build", v: "React · Next.js · Tailwind" },
            { k: "Design", v: "Identity · Print · Posters" },
            { k: "Camera", v: "Leica Q2 · Sony A7IV" },
          ].map((c) => (
            <div key={c.k} className="bg-ink/85 px-5 py-4 backdrop-blur-sm">
              <p className="label text-safelight">{c.k}</p>
              <p className="mt-2 text-sm text-bone/80">{c.v}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...line(1.36)}
          className="mt-6 inline-flex flex-wrap items-center gap-x-4 gap-y-2 border-l-2 border-leader pl-4"
        >
          <span className="label text-leader">Now learning</span>
          <span className="text-sm text-bone/80">VFX &amp; compositing — rotoscoping, set extension, particle work</span>
          <span className="relative h-1.5 w-32 overflow-hidden bg-bone/15">
            <motion.span
              className="absolute inset-y-0 left-0 bg-leader"
              initial={{ width: reduce ? "38%" : 0 }}
              animate={{ width: "38%" }}
              transition={{ duration: 1.4, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          <span className="font-mono text-xs tabular-nums text-leader">38%</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
export function About() {
  return (
    <section id="about" className="relative px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <Reveal>
        <SectionHead
          index="01"
          kicker="About"
          sinhala="මා ගැන තොරතුරු"
          title="Three crafts,"
          italic="one eye."
        />
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <blockquote className="border-l-2 border-safelight pl-6">
            <p className="display text-[2rem] leading-[1.06] text-paper">
              <em className="italic">&ldquo;The layout, the letterform and the frame are the same problem —</em> what to
              leave out.&rdquo;
            </p>
            <footer className="label mt-6 text-ash">— Working note, pinned above the desk</footer>
          </blockquote>

          <dl className="mt-10 space-y-4 border-t border-bone/12 pt-6">
            {[
              ["Based in", "Colombo 05, Sri Lanka"],
              ["Working with", "Studios, founders, agencies"],
              ["Languages", "Sinhala, English"],
              ["Availability", "Freelance — from March 2026"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6">
                <dt className="label text-ash">{k}</dt>
                <dd className="text-right text-sm text-bone/85">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <div className="space-y-6 text-lg leading-[1.75] text-bone/80">
            <p>
              I started in 2019 retouching product shots in a small Colombo studio, learned to code because the
              websites our designs landed on kept letting them down, and picked up the camera because nobody else was
              shooting the work the way it deserved to be seen.
            </p>
            <p>
              Seven years later those three things are one practice. A brand system is designed knowing how it will
              behave at 375px wide. A site is built knowing what the photography can carry. And the photography is made
              with the final grade already in mind.
            </p>
            <p>
              The fourth thing — <span className="text-leader">VFX</span> — is new, and I say so plainly. I&apos;m
              working through compositing, rotoscoping and particle work in the evenings, taking on small study
              commissions where the client knows they&apos;re hiring someone in training, and getting better one plate at
              a time.
            </p>
            <p className="sinhala text-base text-bone/60">
              වෙබ් සංවර්ධනය, ග්‍රැෆික් නිර්මාණ සහ ඡායාරූප ශිල්පය මගේ ප්‍රධාන වෘත්තීන් තුනයි. VFX කලාව මම තවම ඉගෙන ගනිමින්
              සිටිමි.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <dl className="mt-20 grid grid-cols-2 gap-px border border-bone/12 bg-bone/12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink px-6 py-8">
              <dt className="display text-[3.25rem] leading-none text-safelight">{s.value}</dt>
              <dd className="label mt-3 text-ash">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
export function Services() {
  return (
    <section id="services" className="relative border-y border-bone/12 bg-graphite px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
      <Reveal>
        <SectionHead
          index="02"
          kicker="Expertise"
          sinhala="මගේ විශේෂඥතා"
          title="What I do — and"
          italic="what I'm learning."
        />
      </Reveal>

      <div className="mt-16 border-t border-bone/12">
        {services.map((s, i) => (
          <Reveal key={s.num} delay={i * 0.06}>
            <article className="group grid grid-cols-1 gap-x-10 gap-y-6 border-b border-bone/12 px-2 py-10 transition-colors duration-500 hover:bg-graphite-2 md:grid-cols-12 md:px-4">
              <div className="md:col-span-1">
                <span className="label text-safelight">{s.num}</span>
              </div>

              <div className="md:col-span-5">
                <h3 className="display text-[clamp(2.1rem,4.4vw,3.15rem)] text-paper transition-colors duration-500 group-hover:text-safelight">
                  {s.title}
                </h3>
                <p className="sinhala mt-2 text-sm text-ash">{s.sinhala}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <li key={t} className="label border border-bone/15 px-2.5 py-1.5 text-bone/65">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-6">
                <p className="max-w-xl text-base leading-[1.8] text-bone/75">{s.blurb}</p>
                {s.status && (
                  <div className="mt-6 max-w-md">
                    <div className="flex items-baseline justify-between">
                      <span className="label text-leader">{s.status.label}</span>
                      <span className="font-mono text-xs tabular-nums text-leader">{s.status.value}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden bg-bone/12">
                      <motion.div
                        className="h-full bg-leader"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.status.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-ash">
                      Evening study, 2025 → now. Available for low-risk study commissions.
                    </p>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
