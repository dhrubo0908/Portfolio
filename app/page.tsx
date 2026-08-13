"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  BriefcaseBusiness,
  ChevronRight,
  Command,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Mail,
  Moon,
  MousePointer2,
  Search,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { skillGroups } from "@/data/skills";
import { socials } from "@/data/socials";
import { stats } from "@/data/stats";
import { cn } from "@/lib/utils";

const sections = ["home", "about", "skills", "projects", "experience", "contact"];

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const interval = window.setInterval(() => setWordIndex((index) => (index + 1) % personal.roleWords.length), 2100);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0);
    };
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const commandItems = useMemo(
    () => [
      ...sections.map((section) => ({ label: `Go to ${section}`, href: `#${section}` })),
      ...(personal.resumeUrl ? [{ label: "Download resume", href: personal.resumeUrl }] : []),
      { label: "Send email", href: `mailto:${personal.email}` }
    ],
    []
  );

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <CursorGlow />
      <LoadingScreen />
      <FloatingSocials />

      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${personal.name} home`}>
          <span>TD</span>
          <strong>{personal.name}</strong>
        </a>
        <nav className={cn("nav", menuOpen && "is-open")}>
          {sections.slice(1).map((section) => (
            <a key={section} href={`#${section}`} onClick={() => setMenuOpen(false)}>
              {section}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Open command palette" title="Command palette" onClick={() => setCommandOpen(true)}>
            <Command size={18} />
          </button>
          <button className="icon-button" aria-label="Toggle theme" title="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <section id="home" className="hero section-pad">
        <Image src={personal.heroImage} alt="" fill priority className="hero-bg" />
        <div className="noise" />
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, index) => <span key={index} />)}
        </div>
        <motion.div className="hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="eyebrow"><Sparkles size={16} /> {personal.availability}</span>
          <h1>{personal.name}</h1>
          <p className="typing">{personal.roleWords[wordIndex]}</p>
          <p className="hero-copy">{personal.headline}</p>
          <div className="hero-actions">
            {personal.resumeUrl ? (
              <>
                <MagneticLink href={personal.resumeUrl} className="primary-button" download><Download size={18} /> Download Resume</MagneticLink>
                <MagneticLink href={personal.resumeUrl} className="secondary-button" target="_blank"><ExternalLink size={18} /> View Resume</MagneticLink>
              </>
            ) : (
              <button className="primary-button" type="button" disabled title="Add public/resume.pdf and update data/personal.ts to enable download"><Download size={18} /> Resume Coming Soon</button>
            )}
            <MagneticLink href="#projects" className="secondary-button"><MousePointer2 size={18} /> View Projects</MagneticLink>
          </div>
        </motion.div>
        <motion.div className="portrait-shell" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}>
          <Image src={personal.portrait} alt={`${personal.name} professional portrait`} width={420} height={520} />
        </motion.div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about"><ChevronRight size={20} /></a>
      </section>

      <Section id="about" kicker="About" title="Curiosity, code, and crisp digital craft.">
        <div className="about-grid">
          <div className="glass-panel about-copy">
            <p>{personal.summary}</p>
            <div className="info-grid">
              <Info label="Degree" value={personal.degree} />
              <Info label="CGPA" value={personal.cgpa} />
              <Info label="Location" value={personal.location} />
            </div>
          </div>
          <div className="interest-list">
            {personal.interests.map((interest) => <motion.span whileHover={{ y: -4 }} key={interest}>{interest}</motion.span>)}
          </div>
        </div>
      </Section>

      <Section id="skills" kicker="Skills" title="A practical stack with room for imagination.">
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <motion.article className="skill-card" key={group.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <h3>{group.title}</h3>
              <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="projects" kicker="Projects" title="Selected work built with practical curiosity.">
        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.button className="project-card" key={project.title} onClick={() => setActiveProject(project)} whileHover={{ y: -8, rotateX: 2, rotateY: -2 }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Image src={project.image} alt="" width={720} height={460} />
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </motion.button>
          ))}
        </div>
      </Section>

      <section className="stats-band section-pad" aria-label="Achievements">
        {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <Section id="experience" kicker="Experience" title="Ready for serious work, and hungry for the hard parts.">
        <div className="timeline">
          {education.map((item) => (
            <article key={item.degree} className="timeline-item">
              <GraduationCap />
              <div><h3>{item.degree}</h3><p>{item.field}</p><span>{item.institution} - {item.location} - {item.result}</span></div>
            </article>
          ))}
          <article className="timeline-item">
            <BriefcaseBusiness />
            <div><h3>{experience.title}</h3><p>{experience.description}</p><span>{experience.options.join(" - ")}</span></div>
          </article>
        </div>
        <div className="service-grid">
          {services.map((service) => <motion.div whileHover={{ y: -6 }} className="service-card" key={service}>{service}</motion.div>)}
        </div>
      </Section>

      <Section id="contact" kicker="Contact" title="Let's build something polished enough to remember.">
        <div className="contact-grid contact-grid-single">
          <form className="contact-form" action={`mailto:${personal.email}`} method="post" encType="text/plain">
            <input aria-label="Name" name="name" placeholder="Name" required />
            <input aria-label="Email" name="email" placeholder="Email" type="email" required />
            <textarea aria-label="Message" name="message" placeholder="Message" rows={5} required />
            <button type="submit" className="primary-button"><Mail size={18} /> Send Message</button>
          </form>
        </div>
      </Section>

      <footer className="footer">
        <p>© 2026 {personal.name}. Built for clarity, craft, and momentum.</p>
        <a href="#home" aria-label="Back to top"><ArrowUp size={18} /></a>
      </footer>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <CommandPalette open={commandOpen} items={commandItems} onClose={() => setCommandOpen(false)} />
    </main>
  );
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="content-section section-pad">
      <motion.div className="section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span>{kicker}</span>
        <h2>{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

function MagneticLink({ href, className, children, download, target }: { href: string; className: string; children: React.ReactNode; download?: boolean; target?: string }) {
  return <motion.a href={href} className={className} download={download} target={target} rel={target === "_blank" ? "noreferrer" : undefined} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>{children}</motion.a>;
}

function CursorGlow() {
  useEffect(() => {
    const glow = document.querySelector<HTMLElement>(".cursor-glow");
    const onMove = (event: MouseEvent) => {
      if (glow) {
        glow.style.setProperty("--x", `${event.clientX}px`);
        glow.style.setProperty("--y", `${event.clientY}px`);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="cursor-glow" />;
}

function LoadingScreen() {
  return (
    <motion.div className="loader" initial={{ opacity: 1 }} animate={{ opacity: 0, pointerEvents: "none" }} transition={{ delay: 0.65, duration: 0.55 }}>
      <span>TD</span>
    </motion.div>
  );
}

function FloatingSocials() {
  const visibleSocials = socials.filter(({ href }) => href && href !== "#");
  if (!visibleSocials.length) {
    return null;
  }
  return (
    <aside className="floating-socials" aria-label="Social links">
      {visibleSocials.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} aria-label={label} title={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
          <Icon size={17} />
          <span>{label}</span>
        </a>
      ))}
    </aside>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[number] | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.article className="project-modal" initial={{ opacity: 0, y: 36, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}>
            <button className="icon-button close" aria-label="Close project" onClick={onClose}><X size={18} /></button>
            <Image src={project.image} alt="" width={900} height={520} />
            <span>{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="badges">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
            {(project.github !== "#" || project.live !== "#") && (
              <div className="modal-actions">
                {project.github !== "#" && <a href={project.github}><Github size={18} /> GitHub</a>}
                {project.live !== "#" && <a href={project.live}><ExternalLink size={18} /> Live Demo</a>}
              </div>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CommandPalette({ open, items, onClose }: { open: boolean; items: { label: string; href: string }[]; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="command-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="command-menu" initial={{ y: -16, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -12, scale: 0.98 }}>
            <div className="command-search"><Search size={18} /><span>Command palette</span><kbd>Esc</kbd></div>
            {items.map((item) => <a key={item.label} href={item.href} onClick={onClose}>{item.label}<ChevronRight size={16} /></a>)}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
