import { useEffect, useState } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen, FileText, Loader2 } from "lucide-react";
import { YEARS, BRANCHES, SUBJECTS } from "@/lib/types";
import { supabaseExternal, isSupabaseConfigured, type MaterialRow } from "@/lib/supabase";
import { toast } from "sonner";

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function BrowsePage() {
  const [params] = useSearchParams();
  const { branch: pBranch, semester: pSemester, subject: pSubject } = useParams();

  const yearFilter = params.get("year");
  const branchFilter = params.get("branch") || pBranch;
  const semesterFilter = pSemester;

  // Subject detail
  if (pSubject && pBranch && pSemester) {
    return <SubjectView branch={pBranch} semester={pSemester} subject={decodeURIComponent(pSubject)} />;
  }

  // Show subjects for branch + semester
  if (branchFilter && semesterFilter) {
    const subjects = SUBJECTS[branchFilter]?.[semesterFilter] || [];
    return (
      <div className="min-h-screen pt-20 page-container">
        <Breadcrumb items={[
          { label: "Browse", to: "/browse" },
          { label: branchFilter, to: `/browse?branch=${branchFilter}` },
          { label: semesterFilter },
        ]} />
        <h1 className="section-title mb-8">{branchFilter} — {semesterFilter} Subjects</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {subjects.map((s) => (
            <motion.div key={s} variants={item}>
              <Link
                to={`/browse/${branchFilter}/${semesterFilter}/${encodeURIComponent(s)}`}
                className="glass-card-hover p-6 flex items-center justify-between group block"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{s}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Show semesters for a branch (filtered by year if provided)
  if (branchFilter) {
    const selectedYear = yearFilter ? parseInt(yearFilter) : null;
    const semesters = selectedYear
      ? YEARS.find((y) => y.year === selectedYear)?.semesters || []
      : Array.from({ length: 8 }, (_, i) => `Sem${i + 1}`);

    return (
      <div className="min-h-screen pt-20 page-container">
        <Breadcrumb items={[
          { label: "Browse", to: "/browse" },
          ...(selectedYear ? [{ label: `${selectedYear}${selectedYear === 1 ? "st" : selectedYear === 2 ? "nd" : selectedYear === 3 ? "rd" : "th"} Year`, to: `/browse?year=${selectedYear}` }] : []),
          { label: branchFilter },
        ]} />
        <h1 className="section-title mb-8">{branchFilter} — Select Semester</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {semesters.map((sem) => (
            <Link
              key={sem}
              to={`/browse/${branchFilter}/${sem}`}
              className="glass-card-hover p-6 text-center group"
            >
              <div className="text-2xl font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {sem.replace("Sem", "Semester ")}
              </div>
              <p className="text-sm text-muted-foreground">
                Year {Math.ceil(parseInt(sem.replace("Sem", "")) / 2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Show years → pick a year to see branches
  if (yearFilter) {
    const year = YEARS.find((y) => y.year === parseInt(yearFilter));
    if (!year) return null;
    return (
      <div className="min-h-screen pt-20 page-container">
        <Breadcrumb items={[{ label: "Browse", to: "/browse" }, { label: year.label }]} />
        <h1 className="section-title mb-2">{year.label}</h1>
        <p className="text-muted-foreground mb-8">{year.semesters.join(" & ")}</p>
        <h2 className="text-lg font-semibold text-foreground mb-4">Select Branch</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BRANCHES.map((b) => (
            <Link
              key={b}
              to={`/browse?year=${yearFilter}&branch=${b}`}
              className="glass-card-hover p-5 text-center font-medium text-foreground"
            >
              {b}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Default: show years
  return (
    <div className="min-h-screen pt-20 page-container">
      <h1 className="section-title mb-8">Browse Materials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {YEARS.map((y) => (
          <Link
            key={y.year}
            to={`/browse?year=${y.year}`}
            className="glass-card-hover p-6 group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${y.color} flex items-center justify-center mb-4`}>
              <span className="text-lg font-bold text-background">{y.year}</span>
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{y.label}</h3>
            <p className="text-sm text-muted-foreground">{y.semesters.join(" & ")}</p>
          </Link>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Or select branch directly</h2>
      <div className="flex flex-wrap gap-3">
        {BRANCHES.map((b) => (
          <Link key={b} to={`/browse?branch=${b}`} className="px-5 py-2.5 rounded-xl glass-card-hover text-sm font-medium text-foreground">
            {b}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SubjectView({ branch, semester, subject }: { branch: string; semester: string; subject: string }) {
  const units = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"];
  const unitTypes = [
    { type: "Materials", icon: "📘", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { type: "PPT", icon: "📊", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  ];

  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured) {
        setError(
          "Supabase is not configured. Add VITE_MY_SUPABASE_URL and VITE_MY_SUPABASE_ANON_KEY to .env.local and restart."
        );
        setLoading(false);
        return;
      }

      const { data, error } = await supabaseExternal
        .from("materials")
        .select("*")
        .eq("branch", branch)
        .eq("semester", semester)
        .eq("subject", subject);

      if (!active) return;
      if (error) {
        console.error("[Supabase] fetch materials error:", error);
        setError("Failed to load materials. Please try again later.");
        setMaterials([]);
      } else {
        console.log("[Supabase] materials fetched:", data);
        setMaterials((data as MaterialRow[]) || []);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [branch, semester, subject]);

  const findFile = (unit: string, type: string) =>
    materials.find((m) => m.unit === unit && m.type === type)?.file_url;

  const pyqs = materials.filter((m) => m.type === "PYQs");

  const handleOpen = (url: string | undefined, fallback: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.info(fallback);
    }
  };

  return (
    <div className="min-h-screen pt-20 page-container">
      <Breadcrumb items={[
        { label: "Browse", to: "/browse" },
        { label: branch, to: `/browse?branch=${branch}` },
        { label: semester, to: `/browse/${branch}/${semester}` },
        { label: subject },
      ]} />
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="section-title mb-1">{subject}</h1>
          <p className="text-muted-foreground">{branch} · {semester}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading materials...
        </div>
      ) : error ? (
        <div className="glass-card p-6 text-center text-muted-foreground">{error}</div>
      ) : (
        <>
          {/* Units Section */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {units.map((unit) => (
              <motion.div
                key={unit}
                variants={item}
                className="glass-card p-6"
              >
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">{unit}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unitTypes.map((t) => {
                    const url = findFile(unit, t.type);
                    return (
                      <button
                        key={t.type}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${t.color} transition-all hover:scale-[1.02] active:scale-[0.98]`}
                        onClick={() => handleOpen(url, `No file uploaded yet for ${unit} → ${t.type}.`)}
                      >
                        <span className="text-lg">{t.icon}</span>
                        <span className="font-medium text-sm">{t.type}</span>
                        {!url && <span className="ml-auto text-xs opacity-60">Not uploaded</span>}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* PYQs Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <div className="border-t border-glass-border pt-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-emerald-400" />
                <h2 className="font-heading font-semibold text-xl text-foreground">Previous Year Questions (PYQs)</h2>
              </div>
              <div className="glass-card p-6">
                <p className="text-muted-foreground text-sm mb-4">
                  All previous year question papers for {subject} ({branch} · {semester})
                </p>
                {pyqs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pyqs.map((p) => (
                      <button
                        key={p.id}
                        className="flex items-center gap-3 px-5 py-3 rounded-lg border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => handleOpen(p.file_url, "")}
                      >
                        <span className="text-lg">📝</span>
                        <span className="font-medium text-sm">{p.title || "PYQ Paper"}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    className="flex items-center gap-3 px-5 py-3 rounded-lg border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => toast.info(`No PYQs uploaded yet for ${subject}.`)}
                  >
                    <span className="text-lg">📝</span>
                    <span className="font-medium text-sm">No PYQs uploaded yet</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
      <Link to="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 inline mr-1" />
      </Link>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-muted-foreground">/</span>}
          {it.to ? (
            <Link to={it.to} className="text-muted-foreground hover:text-foreground transition-colors">
              {it.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{it.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
