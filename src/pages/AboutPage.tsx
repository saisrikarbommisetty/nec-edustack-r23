import { motion } from "framer-motion";
import { Target, Eye, User, Zap, Clock, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-3">About NEC EduStack R23</h1>
        <p className="text-muted-foreground max-w-3xl mb-12 text-lg">
          A centralized academic platform built for B.Tech R23 regulation students —
          structured, accessible, and always up-to-date.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="glass-card p-8">
          <Target className="w-8 h-8 text-primary mb-4" />
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Mission</h2>
          <p className="text-muted-foreground">
            Simplify and centralize academic resources so every student can focus
            on learning — not hunting for notes.
          </p>
        </div>
        <div className="glass-card p-8">
          <Eye className="w-8 h-8 text-accent mb-4" />
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Vision</h2>
          <p className="text-muted-foreground">
            Become the default academic platform for R23 students across all branches,
            evolving with AI-powered recommendations and community contributions.
          </p>
        </div>
      </div>

      <h2 className="section-title mb-6">Why EduStack?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {[
          { icon: Layers, title: "Structured Learning", desc: "Materials organized by year, semester, branch, and unit." },
          { icon: Clock, title: "Saves Time", desc: "Find any PDF within 3 clicks. No more digging through WhatsApp groups." },
          { icon: Zap, title: "Eliminates Confusion", desc: "One source of truth for R23 regulation. Always current." },
        ].map((w) => (
          <div key={w.title} className="glass-card p-6">
            <w.icon className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-1">{w.title}</h3>
            <p className="text-sm text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 max-w-xl mb-16">
        <User className="w-8 h-8 text-primary mb-4" />
        <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Built by</h2>
        <p className="text-lg text-foreground font-medium">SAI SRIKAR BOMMISETTY - A Student, Builder & Innovator</p>
        <p className="text-muted-foreground mt-2">
          Passionate about making education accessible and organized. EduStack was built
          to solve the real problems students face every semester.
        </p>
      </div>

      <h2 className="section-title mb-6">About Me</h2>
      <div className="glass-card p-8 border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h3 className="font-heading text-2xl font-bold text-foreground mb-1">BOMMISETTY SAI SRIKAR</h3>
          <p className="text-primary font-medium mb-4">B.Tech CSE Student · Full-Stack Developer · Advanced DSA  · AI Engineer · Tech Enthusiast </p>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            A passionate engineering student focused on building impactful tech products.
            I specialize in modern web development and love turning complex problems into
            simple, elegant solutions. EduStack R23 is my flagship project — built to
            centralize and simplify academic resources for thousands of students.
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "Framer Motion", "Node.js", "Git"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-4 border border-accent/20">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">🚀 Project Highlight</h4>
            <p className="text-foreground font-medium">EduStack R23</p>
            <p className="text-sm text-muted-foreground">
              A premium academic platform serving B.Tech R23 students across all branches and semesters.
              Features structured material access, smart navigation, and a modern glassmorphism UI.
            </p>
          </div>
        </div>
      </div>


      <section className="w-full py-20 px-6 md:px-16 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
  <div className="max-w-4xl mx-auto text-center">

    {/* HEADLINE */}
    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
      Building intelligent systems that{" "}
      <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
        explain, adapt, and scale
      </span>
    </h2>

    {/* NAME SIGNATURE */}
    <p className="text-lg text-gray-400 mb-4">
      Crafted by{" "}
      <span className="text-violet-400 font-semibold">
        Sai Srikar
      </span>
    </p>

    {/* DESCRIPTION */}
    <p className="text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
      I design and develop AI-powered platforms that go beyond prediction into clarity and real-world impact. 
      From building <span className="text-violet-400 font-medium">EchoVerse</span> — a time capsule messaging system — 
      to developing <span className="text-violet-400 font-medium">explainable machine learning frameworks</span>, 
      my focus is on creating systems that are not just powerful, but understandable and scalable.
    </p>

    {/* MICRO CARDS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div className="bg-white/5 p-4 rounded-xl backdrop-blur-md">
        <h4 className="text-sm font-semibold text-violet-400 mb-1">What I Build</h4>
        <p className="text-xs text-gray-300">AI Systems</p>
      </div>

      <div className="bg-white/5 p-4 rounded-xl backdrop-blur-md">
        <h4 className="text-sm font-semibold text-violet-400 mb-1">Stack</h4>
        <p className="text-xs text-gray-300">Full Stack + ML</p>
      </div>

      <div className="bg-white/5 p-4 rounded-xl backdrop-blur-md">
        <h4 className="text-sm font-semibold text-violet-400 mb-1">Focus</h4>
        <p className="text-xs text-gray-300">Explainable AI</p>
      </div>

      <div className="bg-white/5 p-4 rounded-xl backdrop-blur-md">
        <h4 className="text-sm font-semibold text-violet-400 mb-1">Mission</h4>
        <p className="text-xs text-gray-300">Real-world Impact</p>
      </div>
    </div>

    {/* CTA */}
    <a
      href="https://www.linkedin.com/in/sai-srikar-bommisetty"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90 rounded-lg transition shadow-lg font-medium"
    >
      Explore My Work →
    </a>

  </div>
</section>
    </div>
  );
}
