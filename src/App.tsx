import "./index.css";
import { DisciplineBand, FilmRail, Footer, Nav } from "./components/Chrome";
import { About, Hero, Services } from "./components/Intro";
import { Photography, Toolkit, Work } from "./components/Work";
import { Contact, Process } from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink">
      <div className="grain" aria-hidden />
      <FilmRail />
      <Nav />
      <main className="lg:pl-14">
        <Hero />
        <DisciplineBand />
        <About />
        <Services />
        <Work />
        <Photography />
        <Toolkit />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
