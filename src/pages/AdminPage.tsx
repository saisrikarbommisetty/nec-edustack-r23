import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Shield, LogOut } from "lucide-react";
import { BRANCHES, UNITS, MATERIAL_TYPES, TAGS } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    branch: "CSE",
    semester: "Sem1",
    subject: "",
    unit: "Unit 1",
    type: "Notes" as "Notes" | "PPT" | "PYQ",
    tags: [] as string[],
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a PDF file.");
    if (!form.subject.trim()) return toast.error("Please enter a subject name.");

    setLoading(true);
    try {
      // Placeholder for future upload integration
      toast.info("Upload service not configured yet. Connect a storage provider to enable uploads.");
    } catch (err: any) {
      toast.error("Upload failed: " + (err.message || "Unknown error."));
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  };

  const semesters = Array.from({ length: 8 }, (_, i) => `Sem${i + 1}`);

  return (
    <div className="min-h-screen pt-20 page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="section-title">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-secondary border border-glass-border text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Upload and manage academic materials for students.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Branch</label>
            <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Semester</label>
            <select
              value={form.semester}
              onChange={(e) => setForm({ ...form, semester: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {semesters.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
          <input
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g., DBMS"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Unit</label>
            <select
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as any })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {MATERIAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label>
          <div className="flex gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  form.tags.includes(tag)
                    ? "bg-primary/20 border-primary/40 text-primary"
                    : "bg-secondary border-glass-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">PDF File</label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
            />
          </div>
          {file && <p className="text-xs text-muted-foreground mt-1">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="gradient-btn px-6 py-3 flex items-center gap-2 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {loading ? "Uploading..." : "Upload Material"}
        </button>
      </form>
    </div>
  );
}
