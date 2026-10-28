import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { process } from "../data";
import { Reveal, SectionHead } from "./ui";

/* ================================================================== */
export function Process() {
  return (
    <section id="process" className="relative border-t border-bone/12 bg-graphite px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
      <Reveal>
        <SectionHead index="06" kicker="How I work" sinhala="පියවර" title="Four steps," italic="no theatre." />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-bone/12 bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.07}>
            <div className="h-full bg-graphite px-7 py-9 transition-colors duration-500 hover:bg-graphite-2">
              <div className="flex items-baseline gap-4">
                <span className="display text-[3.5rem] leading-none text-safelight/85">{p.step}</span>
                <h3 className="display text-2xl text-paper">{p.title}</h3>
              </div>
              <p className="mt-5 text-sm leading-[1.8] text-bone/70">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
type Values = { name: string; email: string; discipline: string; message: string };

const disciplines = [
  "Web development",
  "Graphic design",
  "Photography",
  "VFX study commission",
  "Something else",
];

export function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", discipline: disciplines[0], message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Partial<Record<keyof Values, string>> = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "A working email address, please.";
    if (values.message.trim().length < 12) next.message = "Tell me a little more — a sentence at least.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  const field =
    "w-full border-b border-ink/25 bg-transparent px-0 py-3 text-ink placeholder:text-ink/35 focus:border-ember focus:outline-none";

  return (
    <section id="contact" className="relative bg-paper text-ink">
      <div className="sprockets-x h-3 w-full opacity-25" />
      <div className="px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
        <Reveal>
          <SectionHead
            index="07"
            kicker="Contact"
            tone="light"
            sinhala="සම්බන්ධ වන්න"
            title="Let's make something"
            italic="worth looking at."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-[1.75] text-ink/75">
              Tell me what you&apos;re building, what it needs to do, and when it needs to exist. If it&apos;s a VFX
              commission, I&apos;ll tell you honestly whether I&apos;m the right person yet.
            </p>

            <ul className="mt-10 space-y-5 border-t border-ink/15 pt-8">
              <li className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                <div>
                  <p className="label text-ink/50">Email</p>
                  <a
                    href="mailto:hello@ravinduperera.com"
                    className="rule-hover mt-1 inline-block text-lg text-ink hover:text-ember"
                  >
                    hello@ravinduperera.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                <div>
                  <p className="label text-ink/50">Phone / WhatsApp</p>
                  <a href="tel:+94771234567" className="rule-hover mt-1 inline-block text-lg text-ink hover:text-ember">
                    +94 77 123 4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                <div>
                  <p className="label text-ink/50">Studio</p>
                  <p className="mt-1 text-lg text-ink/80">Colombo 05, Sri Lanka — working island-wide &amp; remote</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-l-2 border-ember/60 pl-5">
              <p className="sinhala text-base text-ink/70">
                ව්‍යාපෘති අදහස් සඳහා ලියන්න. පැය 24 ක් ඇතුළත පිළිතුරු ලැබේවි.
              </p>
              <p className="label mt-2 text-ink/50">Reply within 24 hours · Sinhala &amp; English</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border border-ink/15 bg-[#FBF8F2] p-7 sm:p-10">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[26rem] flex-col items-start justify-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ember text-paper">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="display mt-7 text-[clamp(2.1rem,4vw,3rem)] text-ink">Message queued.</h3>
                  <p className="mt-4 max-w-md text-ink/70">
                    Thanks, {values.name.split(" ")[0] || "friend"} — I&apos;ll come back to you within 24 hours with
                    either a first thought or a couple of questions.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setValues({ name: "", email: "", discipline: disciplines[0], message: "" });
                    }}
                    className="label mt-9 inline-flex items-center gap-2 border border-ink/25 px-5 py-3 text-ink transition-colors hover:border-ember hover:text-ember"
                  >
                    Send another <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="label text-ink/55">
                        Your name
                      </label>
                      <input
                        id="c-name"
                        value={values.name}
                        onChange={set("name")}
                        placeholder="Nadeesha Silva"
                        className={`${field} mt-2 ${errors.name ? "border-ember" : ""}`}
                      />
                      {errors.name && <p className="mt-2 text-sm text-ember">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="label text-ink/55">
                        Email
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={values.email}
                        onChange={set("email")}
                        placeholder="you@studio.lk"
                        className={`${field} mt-2 ${errors.email ? "border-ember" : ""}`}
                      />
                      {errors.email && <p className="mt-2 text-sm text-ember">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-discipline" className="label text-ink/55">
                      What do you need?
                    </label>
                    <select
                      id="c-discipline"
                      value={values.discipline}
                      onChange={set("discipline")}
                      className={`${field} mt-2 cursor-pointer`}
                    >
                      {disciplines.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-message" className="label text-ink/55">
                      Project notes
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={values.message}
                      onChange={set("message")}
                      placeholder="What is it, who is it for, and when does it need to launch?"
                      className={`${field} mt-2 resize-none ${errors.message ? "border-ember" : ""}`}
                    />
                    {errors.message && <p className="mt-2 text-sm text-ember">{errors.message}</p>}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
                    <p className="label max-w-[16rem] text-ink/45">
                      No newsletters, no automated funnels — this goes straight to my inbox.
                    </p>
                    <button
                      type="submit"
                      className="label inline-flex items-center gap-2 bg-ink px-7 py-4 text-paper transition-colors hover:bg-ember"
                    >
                      Send enquiry <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
