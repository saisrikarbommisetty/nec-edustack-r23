import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { YEARS, BRANCHES, SUBJECTS } from "@/lib/types";

export default function SyllabusPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const semesters = selectedYear
    ? YEARS.find((y) => y.year === selectedYear)?.semesters || []
    : [];

  return (
    <div className="min-h-screen pt-20 page-container">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-6 h-6 text-primary" />
        <h1 className="section-title">Syllabus</h1>
      </div>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Access complete syllabi for all branches and semesters under R23 regulation.
      </p>

      {/* Year Selection */}
      <h2 className="text-lg font-semibold text-foreground mb-4">Select Year</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {YEARS.map((y) => (
          <button
            key={y.year}
            onClick={() => setSelectedYear(selectedYear === y.year ? null : y.year)}
            className={`glass-card-hover p-4 text-center transition-all ${
              selectedYear === y.year ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${y.color} flex items-center justify-center mx-auto mb-2`}>
              <span className="text-sm font-bold text-background">{y.year}</span>
            </div>
            <p className="font-medium text-sm text-foreground">{y.label}</p>
            <p className="text-xs text-muted-foreground">{y.semesters.join(" & ")}</p>
          </button>
        ))}
      </div>

      {/* Semesters + Branches */}
      {selectedYear && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {semesters.map((sem) => (
            <div key={sem} className="mb-10">
              <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                {sem.replace("Sem", "Semester ")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BRANCHES.map((branch) => (
                  <Link
                    key={branch}
                    to={`/browse/${branch}/${sem}`}
                    className="glass-card-hover p-4 flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${YEARS.find(y => y.year === selectedYear)?.color} flex items-center justify-center shrink-0`}>
                      <span className="text-xs font-bold text-background">{branch}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{branch}</p>
                      <p className="text-xs text-muted-foreground">{sem.replace("Sem", "Semester ")}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
