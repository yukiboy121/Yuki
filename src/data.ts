import heroImg from "./assets/images/hero.jpg";
import webA from "./assets/images/web-a.jpg";
import webB from "./assets/images/web-b.jpg";
import designA from "./assets/images/design-a.jpg";
import designB from "./assets/images/design-b.jpg";
import photo1 from "./assets/images/photo-1.jpg";
import photo2 from "./assets/images/photo-2.jpg";
import photo3 from "./assets/images/photo-3.jpg";
import vfxA from "./assets/images/vfx-a.jpg";

export const images = {
  hero: heroImg,
  webA,
  webB,
  designA,
  designB,
  photo1,
  photo2,
  photo3,
  vfx: vfxA,
};

export type Category = "web" | "design" | "photo" | "vfx";

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Category;
  year: string;
  role: string;
  tools: string[];
  image: string;
  note: string;
  span: string;
};

export const categoryLabel: Record<Category, string> = {
  web: "Web Development",
  design: "Graphic Design",
  photo: "Photography",
  vfx: "VFX Study",
};

export const projects: Project[] = [
  {
    id: "serendib-trails",
    index: "01",
    title: "Serendib Trails",
    subtitle: "Booking platform & trail journal",
    category: "web",
    year: "2025",
    role: "Design + Front-end",
    tools: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Mapbox"],
    image: images.webA,
    note: "Rebuilt the enquiry flow for a boutique trekking company in Ella. LCP dropped from 4.1s to 1.6s and enquiries tripled in the first quarter.",
    span: "lg:col-span-7",
  },
  {
    id: "ceylon-roast",
    index: "02",
    title: "Ceylon Roast",
    subtitle: "Specialty coffee commerce",
    category: "web",
    year: "2025",
    role: "Full build",
    tools: ["React", "Hydrogen", "Shopify", "GSAP"],
    image: images.webB,
    note: "Headless storefront for a Colombo roastery — subscription flow, brew guides, and a grind-selector that lifted repeat orders by 28%.",
    span: "lg:col-span-5",
  },
  {
    id: "sanka-studio",
    index: "03",
    title: "Sanka Studio",
    subtitle: "Identity & print system",
    category: "design",
    year: "2025",
    role: "Art direction",
    tools: ["Illustrator", "InDesign", "Letterpress"],
    image: images.designB,
    note: "A quiet, tactile identity for an architecture practice — blind-embossed mark, two-paper stock system, and a 40-page standards book.",
    span: "lg:col-span-5",
  },
  {
    id: "ruhunu-fest",
    index: "04",
    title: "Ruhunu Fest",
    subtitle: "Poster series, 6 sheets",
    category: "design",
    year: "2024",
    role: "Design + screenprint",
    tools: ["Photoshop", "Illustrator", "Risograph"],
    image: images.designA,
    note: "Hand-separated colour for a southern arts festival. Printed two-colour on uncoated stock so the ink sat heavy and the grain stayed visible.",
    span: "lg:col-span-7",
  },
  {
    id: "monsoon-galle",
    index: "05",
    title: "Monsoon, Galle",
    subtitle: "Photo series · 24 frames",
    category: "photo",
    year: "2025",
    role: "Photography + edit",
    tools: ["Leica Q2", "Portra 400", "Lightroom"],
    image: images.photo1,
    note: "Three weeks of rain inside the fort walls, shot entirely on available sodium light. Exhibited at the Colombo Photo Show, 2025.",
    span: "lg:col-span-4",
  },
  {
    id: "hill-country-fog",
    index: "06",
    title: "Hill Country Fog",
    subtitle: "Photo series · 18 frames",
    category: "photo",
    year: "2024",
    role: "Photography",
    tools: ["Sony A7IV", "85mm", "Capture One"],
    image: images.photo2,
    note: "Long-lens studies of the tea terraces above Nuwara Eliya, made between 5:40 and 7:10 in the morning over one season.",
    span: "lg:col-span-4",
  },
  {
    id: "night-market",
    index: "07",
    title: "Night Market, Pettah",
    subtitle: "Photo series · 12 frames",
    category: "photo",
    year: "2025",
    role: "Photography",
    tools: ["Leica Q2", "Tripod", "Lightroom"],
    image: images.photo3,
    note: "Long exposures between the stalls — the street kept moving and the architecture held still. Shot over four Friday nights.",
    span: "lg:col-span-4",
  },
  {
    id: "smoke-ember",
    index: "08",
    title: "Smoke & Ember",
    subtitle: "Compositing study",
    category: "vfx",
    year: "2026",
    role: "Learning · personal study",
    tools: ["After Effects", "Blender", "DaVinci Resolve"],
    image: images.vfx,
    note: "A personal plate-and-comp exercise: volumetric smoke, ember particles and a graded integration pass. Still learning — and documenting every mistake.",
    span: "lg:col-span-12",
  },
];

export type Service = {
  num: string;
  title: string;
  sinhala: string;
  blurb: string;
  tools: string[];
  status?: { label: string; value: number };
};

export const services: Service[] = [
  {
    num: "01",
    title: "Web Development",
    sinhala: "වෙබ් සංවර්ධනය",
    blurb:
      "Fast, accessible, hand-built sites — from a one-page portfolio to a headless commerce build. Design systems that survive contact with real content, and front-ends that score green on Core Web Vitals.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind", "Sanity", "Shopify"],
  },
  {
    num: "02",
    title: "Graphic Design",
    sinhala: "ග්‍රැෆික් නිර්මාණ",
    blurb:
      "Identity systems, print, packaging and poster work. I start with the paper and the press, not the mockup — because a mark that only works on a screen is only half designed.",
    tools: ["Illustrator", "InDesign", "Photoshop", "Figma", "Risograph"],
  },
  {
    num: "03",
    title: "Photography",
    sinhala: "ඡායාරූප ශිල්පය",
    blurb:
      "Documentary, street and interior photography across Sri Lanka. Natural light where possible, a single tungsten source where not. Full edit, colour and retouch included.",
    tools: ["Leica Q2", "Sony A7IV", "Lightroom", "Capture One"],
  },
  {
    num: "04",
    title: "VFX & Compositing",
    sinhala: "VFX ඉගෙන ගනිමින්",
    blurb:
      "Currently in training: rotoscoping, set extension, particle work and colour-managed comp. I take on small, honest study commissions — priced as learning, delivered with the same care.",
    tools: ["After Effects", "Blender", "DaVinci Resolve", "Nuke (learning)"],
    status: { label: "In training", value: 38 },
  },
];

export const stats = [
  { value: "07", label: "Years in practice" },
  { value: "60+", label: "Projects delivered" },
  { value: "24k", label: "Frames exposed" },
  { value: "03+1", label: "Disciplines (one in training)" },
];

export const toolkit: { group: string; sinhala: string; items: string[] }[] = [
  {
    group: "Build",
    sinhala: "තාක්ෂණ",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node", "Sanity", "Vite", "Figma → code"],
  },
  {
    group: "Design",
    sinhala: "නිර්මාණ",
    items: ["Illustrator", "Photoshop", "InDesign", "Figma", "Blender", "Letterpress"],
  },
  {
    group: "Camera",
    sinhala: "කැමරා",
    items: ["Leica Q2", "Sony A7IV", "35mm / 85mm", "Lightroom", "Capture One", "Darkroom printing"],
  },
  {
    group: "Motion & VFX",
    sinhala: "චලනය",
    items: ["After Effects", "DaVinci Resolve", "Blender", "Premiere", "Nuke — learning"],
  },
];

export const process = [
  { step: "01", title: "Listen", text: "A call, a walk-through of what exists, and the honest constraints — budget, timeline, who signs off." },
  { step: "02", title: "Frame", text: "References, a written direction and one clear route. No mood-board theatre; a decision you can approve." },
  { step: "03", title: "Make", text: "Built in the open, shared weekly. You see the rough cuts, not just the reveal." },
  { step: "04", title: "Deliver", text: "Files, source, documentation and a hand-over session — so the work keeps running without me." },
];
