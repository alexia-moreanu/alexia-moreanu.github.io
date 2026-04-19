import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import hebaPhoto from "@assets/Screenshot_2026-02-21_at_8.21.42_PM_1771734328894.png";
import {
  MapPin,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Code2,
  Mail,
  ExternalLink,
  ChevronDown,
  Star,
  Sparkles,
  BookOpen,
  Menu,
  Lightbulb,
  Quote,
  MessageSquareQuote,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  ChevronUp,
} from "lucide-react";
import {
  SiGithub,
  SiLinkedin,
  SiGoogle,
  SiSnapchat,
  SiUber,
  SiNvidia,
  SiMongodb,
  SiSalesforce,
} from "react-icons/si";

function ArabesqueDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 20 Q25 0 50 20 T100 20 T150 20 T200 20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M0 20 Q25 40 50 20 T100 20 T150 20 T200 20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="50" cy="20" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="150" cy="20" r="3" fill="currentColor" opacity="0.4" />
      <path
        d="M90 10 L100 5 L110 10 L110 30 L100 35 L90 30 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

function StarField() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-primary/60"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FloatingGeometry() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rotate-45"
        animate={{ rotate: [45, 90, 45], y: [-10, 10, -10] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 border border-primary/8 rounded-full"
        animate={{ scale: [1, 1.1, 1], x: [-5, 5, -5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-16 h-16 border border-primary/10"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function SectionHeading({
  title,
  icon: Icon,
}: {
  title: string;
  icon: typeof Briefcase;
}) {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <div className="flex items-center gap-3">
        <ArabesqueDecoration className="w-20 h-6 text-primary hidden sm:block" />
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            {title}
          </h2>
        </div>
        <ArabesqueDecoration className="w-20 h-6 text-primary hidden sm:block transform scale-x-[-1]" />
      </div>
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}

function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [mobileOpen]);

  const links: { label: string; href: string }[] = [];

  return (
    <motion.nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 h-16">
        <a
          href="#"
          className="font-serif text-xl font-bold text-primary"
          data-testid="link-logo"
        >
          H.A.
        </a>
        
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/heba-alazzeh/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-linkedin-nav"
            aria-label="LinkedIn profile"
          >
            <Button size="icon" variant="ghost" aria-label="LinkedIn">
              <SiLinkedin className="w-4 h-4" />
            </Button>
          </a>
          <a
            href="https://github.com/hebaalazzeh"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-github-nav"
            aria-label="GitHub profile"
          >
            <Button size="icon" variant="ghost" aria-label="GitHub">
              <SiGithub className="w-4 h-4" />
            </Button>
          </a>

          <div className="md:hidden relative">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Open menu"
              data-testid="button-mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-12 w-48 bg-card border border-border rounded-md overflow-hidden z-50"
              >
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    className="block px-4 py-3 text-sm text-foreground/80 font-serif transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/hero-bg.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        <div
          className="absolute inset-0 opacity-[0.04] bg-repeat"
          style={{
            backgroundImage: "url(/images/pattern-overlay.png)",
            backgroundSize: "200px",
          }}
        />
      </motion.div>

      <StarField />

      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
        </motion.div>

        <motion.p
          className="text-primary font-serif text-lg md:text-xl tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          data-testid="text-hero-subtitle"
        >
          Computer Science and Natural Sciences
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          data-testid="text-hero-name"
        >
          Alexia Moreanu
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-2 text-white/70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm md:text-base font-sans">
            Minerva University
          </span>
          <span className="mx-2 text-primary">|</span>
          <MapPin className="w-4 h-4" />
          <span className="text-sm md:text-base font-sans">
            San Francisco Bay Area
          </span>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {["Product", "AI", "Research"].map((company) => (
            <Badge
              key={company}
              variant="outline"
              className="backdrop-blur-sm no-default-hover-elevate no-default-active-elevate"
              data-testid={`badge-company-${company.toLowerCase().replace(/[^a-z]/g, "-")}`}
            >
              {company}
            </Badge>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a href="#experience" data-testid="button-explore-work">
            <Button className="gap-2">
              <Star className="w-4 h-4" />
              Explore My Work
            </Button>
          </a>
          <a href="#contact" data-testid="button-get-in-touch">
            <Button variant="outline" className="backdrop-blur-sm">
              Get in Touch
            </Button>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-primary/60" />
      </motion.div>
    </section>
  );
}

const orgLogos: { name: string; icon?: typeof SiGoogle; textStyle?: string }[] = [
  { name: "Snap", icon: SiSnapchat },
  { name: "Uber", icon: SiUber },
  { name: "Stanford", textStyle: "font-serif font-bold" },
  { name: "Berkeley", textStyle: "font-serif font-bold" },
  { name: "NVIDIA", icon: SiNvidia },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Salesforce", icon: SiSalesforce },
  { name: "Kodely", textStyle: "font-bold" },
  { name: "SMCCCD", textStyle: "font-bold" },
  { name: "Tessellations", textStyle: "font-bold" },
  { name: "LinkedIn", icon: SiLinkedin },
  { name: "ColorStack", textStyle: "font-bold" },
  { name: "Girls Who Code", textStyle: "font-bold" },
  { name: "Rewriting The Code", textStyle: "font-bold" },
  { name: "Break Through Tech", textStyle: "font-bold" },
  { name: "Harvard WECode", textStyle: "font-mono font-bold" },
  { name: "Columbia University", textStyle: "font-serif font-bold" },
  { name: "Cornell Tech", textStyle: "font-serif font-bold" },
  { name: "BNY", textStyle: "font-bold tracking-wider" },
  { name: "Liberty Mutual", textStyle: "font-bold" },
  { name: "GDC", textStyle: "font-bold tracking-wider" },
];

function LogoCarousel() {
  const doubled = [...orgLogos, ...orgLogos];

  return (
    <div className="w-full overflow-hidden py-6" data-testid="logo-carousel">
      <motion.div
        className="flex gap-8 items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubled.map((org, idx) => (
          <div
            key={`${org.name}-${idx}`}
            className="flex items-center gap-2 px-4 py-2 shrink-0 text-muted-foreground/70"
            data-testid={`text-org-${org.name.toLowerCase().replace(/\s+/g, "-")}-${idx}`}
          >
            {org.icon ? (
              <>
                <org.icon className="w-5 h-5" />
                <span className="text-sm font-medium whitespace-nowrap">{org.name}</span>
              </>
            ) : (
              <span className={`text-sm whitespace-nowrap ${org.textStyle || ""}`}>
                {org.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AboutSection() {
  return (
    <AnimatedSection
      id="about"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto relative"
    >
      <FloatingGeometry />
      <SectionHeading title="About Me" icon={BookOpen} />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={hebaPhoto}
            alt="Alexia Moreanu"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-[center_20%] border-4 border-primary/30 shadow-lg shadow-primary/10"
            data-testid="img-about-photo"
          />
        </motion.div>
        <div className="space-y-4 text-center md:text-left">
          <p className="text-lg leading-relaxed text-foreground/90" data-testid="text-about-intro">
            Hi, my name is Alexia! Third-year double major in Natural Sciences and Computational Sciences at Minerva University, interested in biology, complex systems, and AI-driven approaches to real-world problems.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Organizations & Companies
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <LogoCarousel />
        </div>
      </div>
    </AnimatedSection>
  );
}

const experiences = [
  {
    company: "Buenos Aires Medical School",
    role: "Program Manager, Vaccine Discovery (Research Assistant)",
    period: "Sept 2025 - Present",
    icon: FlaskConical,
    color: "text-green-500",
    description: [
      "Designed and implemented scalable R/Python genomic analysis pipelines, reducing candidate screening time by 50%.",
      "Integrated computational workflows with wet-lab validation, accelerating vaccine development timelines by 25%.",
      "Version-controlled pipelines using Git and documented reproducible workflows for cross-team use.",
    ],
    tags: ["Python", "R", "Genomics", "Pipelines"],
  },
  {
    company: "Minerva University",
    role: "Program Lead, Content Creator & Student Ambassador",
    period: "Sep 2024 - Present",
    icon: Users,
    color: "text-blue-500",
    description: [
      "Managed content strategy and boosted engagement by 15% across 6 channels through content automation.",
      "Led a 3-person team across 3 time zones to deliver projects on time.",
      "Launched a targeted content series driving 10% organic growth.",
    ],
    tags: ["Content Strategy", "Leadership", "Growth"],
  },
  {
    company: "Minerva University Psychology Lab",
    role: "Program Lead, Research Infrastructure",
    period: "Jun 2025 - Sept 2025",
    icon: FlaskConical,
    color: "text-purple-500",
    description: [
      "Built automated Python pipelines across 20+ studies, reducing processing time by 80%.",
      "Standardized workflows, reducing onboarding time by 30%.",
    ],
    tags: ["Python", "Data Pipelines", "Research"],
  },
  {
    company: "Kyung Hee University Hospital",
    role: "Research Assistant, Computational Multi-Omics Lab",
    period: "Jan 2025 - Apr 2025",
    icon: FlaskConical,
    color: "text-pink-500",
    description: [
      "Conducted RNA-seq analysis using DESeq2 and Seurat.",
      "Built reproducible genomic workflows and contributed to a manuscript.",
    ],
    tags: ["RNA-seq", "R", "Seurat", "DESeq2"],
  },
];

function ExperienceSection() {
  return (
    <AnimatedSection
      id="experience"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <SectionHeading title="Experience" icon={Briefcase} />

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={exp.company}
                className={`relative flex items-start gap-6 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="hidden md:block md:w-1/2" />

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center z-10">
                  <Icon className={`w-5 h-5 ${exp.color}`} />
                </div>

                <div className="md:w-1/2 pl-14 md:pl-0">
                  <Card
                    className={`p-6 ${isLeft ? "md:mr-8" : "md:ml-8"}`}
                    data-testid={`card-experience-${exp.company.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-serif text-xl font-bold">
                          {exp.company}
                        </h3>
                        <p className="text-primary text-sm font-medium">
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center gap-1.5 text-sm text-primary"
                        data-testid={`link-experience-${exp.company.toLowerCase().replace(/[^a-z]/g, "-")}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {exp.linkLabel || "View More"}
                      </a>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

const researchItems: any[] = [];

function ResearchSection() {
  return (
    <AnimatedSection
      id="research"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <SectionHeading title="Research & Publications" icon={FlaskConical} />

      <div className="grid md:grid-cols-2 gap-6">
        {researchItems.map((item, idx) => (
          <motion.div
            key={item.org}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <Card
              className="p-6 h-full flex flex-col"
              data-testid={`card-research-${idx}`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold">{item.org}</h3>
                  <p className="text-primary text-sm font-medium">{item.role}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              <ul className="space-y-2 flex-1">
                {item.description.map((desc, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40"
                  >
                    {desc}
                  </li>
                ))}
              </ul>

              {item.publication && (
                <a
                  href={item.publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-sm text-primary"
                  data-testid="link-publication"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {item.publication.title}
                </a>
              )}

              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-sm text-primary"
                  data-testid={`link-research-github-${idx}`}
                >
                  <SiGithub className="w-3.5 h-3.5" />
                  View on GitHub
                </a>
              )}

              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

const leadershipItems = [
  {
    title: "Stanford SERIS Scholar",
    org: "Stanford University School of Engineering",
    period: "Dec 2024 - Feb 2026",
    description: "Competitively selected 1 of 23 undergraduates across the U.S. for Stanford's Engineering Research Introductions Scholar program. Engaged with world-class researchers and faculty in immersive workshops.",
  },
  {
    title: "Break Through Tech AI Fellow",
    org: "Break Through Tech (Cornell University)",
    period: "Mar 2025 - Jun 2025",
    description: "Selected as one of 1,000 fellows nationwide for a rigorous AI/ML program. Completed Machine Learning Foundations coursework and AI Studio projects with real-world datasets.",
  },
  {
    title: "Girls Who Code Club — Founder & President",
    org: "College of San Mateo",
    period: "Apr 2024 - May 2025",
    description: "Founded and led the CSM Girls Who Code Club, organizing coding workshops, guest speaker events, and community outreach to promote diversity and inclusion in STEM.",
  },
  {
    title: "CS Club Vice President & AI Club Marketing Manager",
    org: "College of San Mateo",
    period: "Jan 2024 - May 2025",
    description: "Led digital strategies to amplify presence within the tech community. Curated compelling content and fostered meaningful connections with students, faculty, and industry professionals.",
  },
  {
    title: "Experience Berkeley Transfer Ambassador Intern",
    org: "Stiles Hall / UC Berkeley",
    period: "Aug 2025 - Dec 2025",
    description: "Mentored community college transfer students through the UC application process. Provided feedback on Personal Insight Questions and hosted advising sessions via Zoom.",
  },
  {
    title: "Kodely — Operations Coordinator & Lead Instructor",
    org: "Kodely",
    period: "Dec 2023 - Jan 2025",
    description: "Developed and delivered STEM lessons covering UX/UI design, coding (Python beginner to advanced), game design, app design, and circuit design for K-12 students.",
  },
  {
    title: "ColorStack x Reboot Scholar — GDC (2x)",
    org: "Game Developers Conference",
    period: "Mar 2025 - Present",
    description: "Selected as a scholarship recipient to attend the 2025 & 2026 Game Developers Conference in San Francisco for industry networking and professional development.",
  },
  {
    title: "Harvard WECode Tech Fellow",
    org: "Harvard WECode Conference",
    period: "Jan 2025 - Feb 2025",
    description: "Selected for a competitive fellowship at the world's largest student-run Women in Tech conference, engaging with industry leaders on cutting-edge technologies.",
  },
  {
    title: "NVIDIA GTC Scholar",
    org: "NVIDIA",
    period: "Mar 2025",
    description: "Selected for a sponsored opportunity to attend NVIDIA GTC, engaging with industry leaders and researchers on AI, machine learning, and accelerated computing.",
  },
  {
    title: "Columbia EngAGE Scholar",
    org: "Columbia University",
    period: "Mar 2025",
    description: "Accepted into Engineering Achievers in Graduate Education (engAGE), an exclusive program bringing together the brightest young minds in engineering and applied science.",
  },
  {
    title: "Salesforce Futureforce Tech Accelerator",
    org: "Salesforce",
    period: "Jul 2025",
    description: "Selected for a competitive 3-day accelerator focused on AI, automation, and human-AI collaboration with Salesforce technical leaders.",
  },
  {
    title: "BNY Sophomore Summit Fellow",
    org: "BNY",
    period: "Apr 2025 - Jun 2025",
    description: "Selected for a competitive six-week virtual program with senior leaders, tackling real-world challenges in the financial services industry.",
  },
  {
    title: "ColorStack Stacked Up Summit Scholar",
    org: "ColorStack",
    period: "Jul 2025 - Aug 2025",
    description: "Awarded scholarship to attend ColorStack's Stacked Up Summit, a selective conference supporting under-represented students in tech.",
  },
  {
    title: "LinkedIn [In]spire Day Attendee (2x)",
    org: "LinkedIn Women in Tech",
    period: "Mar 2025 - Apr 2025",
    description: "Chosen by LinkedIn's Women in Tech group for a selective professional development event with keynotes, AI-powered resume workshops, and mock interviews.",
  },
  {
    title: "Liberty Mutual Women in Technology Summit",
    org: "Liberty Mutual Insurance",
    period: "Feb 2025 - Jun 2025",
    description: "Attended an exclusive summit focused on advancing women in technology, fostering leadership, and promoting diversity in STEM.",
  },
  {
    title: "MongoDB Women in CS Summit",
    org: "MongoDB",
    period: "Feb 2025 - May 2025",
    description: "Attended a competitive summit for women in CS, exploring database technologies, software engineering best practices, and distributed computing.",
  },
];

function LeadershipSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? leadershipItems : leadershipItems.slice(0, 6);

  return (
    <AnimatedSection
      id="leadership"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <SectionHeading title="Leadership & Involvement" icon={Users} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card className="p-5 h-full flex flex-col" data-testid={`card-leadership-${idx}`}>
              <h3 className="font-serif text-sm font-bold leading-snug">{item.title}</h3>
              <p className="text-xs text-primary mt-1">{item.org}</p>
              <p className="text-xs text-muted-foreground mt-0.5 mb-2">{item.period}</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {leadershipItems.length > 6 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            data-testid="button-leadership-view-more"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View All {leadershipItems.length} Experiences
              </>
            )}
          </Button>
        </div>
      )}
    </AnimatedSection>
  );
}

const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "R", "SQL", "JavaScript", "TypeScript"],
  },
  {
    title: "Web",
    skills: ["HTML", "CSS"],
  },
  {
    title: "Tools",
    skills: ["Git", "Jira", "Asana", "Notion"],
  },
  {
    title: "Product & Management",
    skills: ["SCRUM", "MVP Development", "RICE", "MoSCoW"],
  },
  {
    title: "Languages",
    skills: ["English (C2)", "Romanian", "Spanish (B2)", "German (A2)"],
  },
];

function SkillsSection() {
  return (
    <AnimatedSection
      id="skills"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <SectionHeading title="Technical Skills" icon={Code2} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card
              className="p-5"
              data-testid={`card-skills-${category.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h3 className="font-serif text-lg font-bold mb-3 text-primary">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

const educationData = [
  {
    school: "University of California, Berkeley",
    degree: "Bachelor of Arts, Computer Science",
    period: "May 2025 - May 2027",
    gpa: "4.0",
    testId: "card-education-berkeley",
  },
  {
    school: "College of San Mateo",
    degree: "Associate of Science — Computer Science, Physics, and Mathematics",
    period: "June 2023 - May 2025",
    gpa: "4.0",
    honors: "Summa Cum Laude (3x)",
    testId: "card-education-csm",
  },
];

const relevantCoursework =
  "Data Structures & Algorithms, Computer Architecture, Discrete Mathematics & Probability, Structure & Interpretation of Computer Programs, Designing Information Devices & Systems, Object Oriented Programming, Systems Programming, Software Engineering Methods, Linear Algebra, Calculus I–III, Physics I–II";

function EducationSection() {
  return (
    <AnimatedSection
      id="education"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <SectionHeading title="Education" icon={GraduationCap} />

      <div className="space-y-6">
        {educationData.map((edu, idx) => (
          <motion.div
            key={edu.school}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
          >
            <Card className="p-6" data-testid={edu.testId}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-serif text-xl font-bold">{edu.school}</h3>
                  <p className="text-primary text-sm font-medium mt-1">
                    {edu.degree}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {edu.gpa && (
                    <Badge variant="default" className="text-xs">
                      GPA: {edu.gpa}
                    </Badge>
                  )}
                  {edu.honors && (
                    <Badge variant="secondary" className="text-xs">
                      {edu.honors}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <Card className="p-6" data-testid="card-education-coursework">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground/70">
                <BookOpen className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                Relevant Coursework:
              </span>{" "}
              {relevantCoursework}
            </p>
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

const projects = [
  {
    title: "Marketing Automation System",
    description:
      "Built automation workflows using Make.com to streamline content distribution and engagement tracking.",
    tags: ["Automation", "Make.com", "No-code"],
  },
];

function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <AnimatedSection
      id="projects"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <SectionHeading title="Projects" icon={Lightbulb} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card
              className="p-6 h-full flex flex-col"
              data-testid={`card-project-${idx}`}
            >
              <h3 className="font-serif text-lg font-bold mb-2" data-testid={`text-project-title-${idx}`}>
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1" data-testid={`text-project-desc-${idx}`}>
                {project.description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-sm text-primary"
                  data-testid={`link-project-${idx}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {project.linkLabel || "View Project"}
                </a>
              )}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {projects.length > 6 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            data-testid="button-projects-view-more"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View All {projects.length} Projects
              </>
            )}
          </Button>
        </div>
      )}
    </AnimatedSection>
  );
}

const recommendations = [
  {
    name: "Sebrianne Ferguson",
    title: "IT Web Services/Security @ SMCCCD | CompTIA Security+ Certified",
    relationship: "Senior colleague at SMCCCD ITS",
    quote:
      "I had the pleasure of working with Heba when she was our student assistant at SMCCCD ITS. She is highly motivated, energetic and always open to learning new things and solving problems. Any task I gave her was completed cleanly, quickly and professionally. She has a very rare and inspiring aptitude to learn and grow, and I give her my highest recommendation.",
  },
  {
    name: "Sri Narayanan",
    title: "Founder of Kodely | Forbes 30u30",
    relationship: "Direct manager at Kodely",
    quote:
      "I am pleased to highly recommend Alexia Moreanu for any role in operations, logistics, or project management. Having worked closely with Heba in her role as Operations Coordinator at Kodely, I have seen firsthand her exceptional ability to think outside the box, solve complex challenges, and drive efficiency in fast-paced environments.",
  },
  {
    name: "Michael Fariss",
    title: "Making IT more personable",
    relationship: "Direct manager",
    quote:
      "Heba was great to work with and did a fantastic job with the programming projects that were assigned. Heba took the time to research possible solutions and implemented them cleanly. Additionally, when something needed clarification or a change to the design was needed Heba clearly communicated the tradeoffs so that we could decide how to move forward.",
  },
];

function RecommendationsSection() {
  const [currentRec, setCurrentRec] = useState(0);

  const next = () => setCurrentRec((prev) => (prev + 1) % recommendations.length);
  const prev = () => setCurrentRec((prev) => (prev - 1 + recommendations.length) % recommendations.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const rec = recommendations[currentRec];

  return (
    <AnimatedSection
      id="recommendations"
      className="py-14 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      <SectionHeading title="Recommendations" icon={MessageSquareQuote} />

      <div className="relative">
        <Card className="p-8 md:p-10" data-testid={`card-recommendation-${currentRec}`}>
          <Quote className="w-10 h-10 text-primary/20 mb-4" />
          <motion.div
            key={currentRec}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-base text-muted-foreground leading-relaxed italic" data-testid={`text-recommendation-quote-${currentRec}`}>
              "{rec.quote}"
            </p>
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="font-serif font-bold" data-testid={`text-recommendation-name-${currentRec}`}>{rec.name}</p>
              <p className="text-sm text-primary mt-0.5">{rec.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{rec.relationship}</p>
            </div>
          </motion.div>
        </Card>

        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            data-testid="button-recommendation-prev"
            aria-label="Previous recommendation"
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex gap-2">
            {recommendations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentRec(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentRec ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                data-testid={`button-recommendation-dot-${idx}`}
                aria-label={`Go to recommendation ${idx + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            data-testid="button-recommendation-next"
            aria-label="Next recommendation"
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}

const certifications = [
  { name: "Google IT Automation with Python", issuer: "Google", date: "Apr 2025" },
  { name: "Introduction to AI in Digital Marketing", issuer: "HubSpot", date: "Mar 2025" },
  { name: "Configuration Management and the Cloud", issuer: "Google", date: "Jan 2025" },
  { name: "Troubleshooting and Debugging Techniques", issuer: "Google", date: "Dec 2024" },
  { name: "Introduction to Git and GitHub", issuer: "Google", date: "Dec 2024" },
  { name: "Using Python to Interact with the Operating System", issuer: "Google", date: "Dec 2024" },
  { name: "Crash Course on Python", issuer: "Google", date: "Dec 2024" },
  { name: "Stanford Science Small Groups — U-Net AI for Biomedical Image Segmentation", issuer: "Stanford University", date: "Nov 2024" },
  { name: "Stanford CCOP Bootcamp — Certificate of Completion", issuer: "Stanford University", date: "Aug 2024" },
  { name: "Stanford Fair for Community College Students", issuer: "Stanford University", date: "May 2025" },
  { name: "IRB Administration", issuer: "CITI Program", date: "Jun 2024" },
  { name: "Responsible Conduct of Research for Engineers", issuer: "CITI Program", date: "Jun 2024" },
  { name: "Stanford Code in Place — Certificate of Completion", issuer: "Stanford / Code in Place", date: "Jun 2024" },
];

function CertificationsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, 6);

  return (
    <AnimatedSection
      id="certifications"
      className="py-14 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <SectionHeading title="Certifications" icon={Award} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCerts.map((cert, idx) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card className="p-4 h-full" data-testid={`card-certification-${idx}`}>
              <p className="font-medium text-sm leading-snug" data-testid={`text-certification-name-${idx}`}>{cert.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-primary">{cert.issuer}</span>
                <span className="text-xs text-muted-foreground">{cert.date}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {certifications.length > 6 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            data-testid="button-certifications-view-more"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View All {certifications.length} Certifications
              </>
            )}
          </Button>
        </div>
      )}
    </AnimatedSection>
  );
}

function ContactSection() {
  return (
    <AnimatedSection
      id="contact"
      className="py-14 px-4 sm:px-6 max-w-4xl mx-auto text-center"
    >
      <SectionHeading title="Get in Touch" icon={Mail} />

      <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
        I'm always open to discussing new opportunities, collaborations, or
        just connecting. Feel free to reach out!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a href="mailto:alexia@uni.minerva.edu" data-testid="link-contact-email">
          <Button className="gap-2">
            <Mail className="w-4 h-4" />
            alazzehheba@gmail.com
          </Button>
        </a>
        <a
          href="https://www.linkedin.com/in/alexia-moreanu/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-contact-linkedin-follow"
        >
          <Button variant="outline" className="gap-2">
            <SiLinkedin className="w-4 h-4" />
            Follow on LinkedIn
          </Button>
        </a>
        <a
          href="https://github.com/alexia-moreanu"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-contact-github"
        >
          <Button variant="outline" className="gap-2">
            <SiGithub className="w-4 h-4" />
            GitHub
          </Button>
        </a>
      </div>
    </AnimatedSection>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <ArabesqueDecoration className="w-12 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-serif">
            Alexia Moreanu
          </span>
          <ArabesqueDecoration className="w-12 h-4 text-primary transform scale-x-[-1]" />
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Alexia Moreanu
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ResearchSection />
      <ProjectsSection />
      <LeadershipSection />
      <SkillsSection />
      <CertificationsSection />
      <RecommendationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
