import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  GraduationCap,
  BookOpen,
  FileText,
  TrendingUp,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { YEARS, BRANCHES, SUBJECTS } from "@/lib/types";
import { useState } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [search, setSearch] = useState("");

  // Collect all subjects for search
  const allSubjects: { branch: string; semester: string; subject: string }[] = [];
  Object.entries(SUBJECTS).forEach(([branch, sems]) => {
    Object.entries(sems).forEach(([sem, subjects]) => {
      subjects.forEach((s) => allSubjects.push({ branch, semester: sem, subject: s }));
    });
  });
  const filtered = search
    ? allSubjects.filter((s) =>
        s.subject.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="min-h-screen pt-16">
      {/* Glow background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      {/* Hero */}
      <section className="relative py-20 sm:py-32 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            B.Tech R23 Regulation
          </div>
                  <h1 className="text-5xl sm:text-7xl font-heading font-bold mb-4">
          <span className="text-violet-400">NEC</span>{" "}
          Edu<span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Stack</span>{" "}
          <span className="text-violet-300">R23</span>
        </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Your Academic Stack, <span className="text-foreground font-medium">Simplified</span>
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search subjects, notes, PYQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg"
            />
            {filtered.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 glass-card p-2 z-20">
                {filtered.map((s, i) => (
                  <Link
                    key={i}
                    to={`/browse/${s.branch}/${s.semester}/${encodeURIComponent(s.subject)}`}
                    className="block px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-left"
                    onClick={() => setSearch("")}
                  >
                    <span className="text-foreground font-medium">{s.subject}</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {s.branch} · {s.semester}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Explore by Year */}
      <section className="page-container">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h2 className="section-title">Explore by Year</h2>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {YEARS.map((y) => (
            <motion.div key={y.year} variants={item}>
              <Link
                to={`/browse?year=${y.year}`}
                className="block glass-card-hover p-6 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${y.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-lg font-bold text-background">{y.year}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {y.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {y.semesters.join(" & ")}
                </p>
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-3 group-hover:translate-x-1 group-hover:text-primary transition-all" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Access */}
      <section className="page-container">
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-6 h-6 text-warning" />
          <h2 className="section-title">Quick Access</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, label: "Syllabus", desc: "Complete syllabi for all branches", to: "/syllabus", gradient: "from-emerald-500 to-teal-500" },
            { icon: FileText, label: "Important Materials", desc: "Tagged & curated resources", to: "/browse", gradient: "from-amber-500 to-orange-500" },
            { icon: TrendingUp, label: "Trending Subjects", desc: "Most accessed this week", to: "/browse", gradient: "from-rose-500 to-pink-500" },
          ].map((q) => (
            <Link key={q.label} to={q.to} className="glass-card-hover p-6 group">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${q.gradient} flex items-center justify-center mb-4`}>
                <q.icon className="w-5 h-5 text-background" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{q.label}</h3>
              <p className="text-sm text-muted-foreground">{q.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Branches */}
      <section className="page-container">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-accent" />
          <h2 className="section-title">All Branches</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {BRANCHES.map((b) => (
            <Link
              key={b}
              to={`/browse?branch=${b}`}
              className="px-5 py-2.5 rounded-xl glass-card-hover text-sm font-medium text-foreground"
            >
              {b}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
