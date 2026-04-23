import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", message: "", suggestion: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been received.");
    setForm({ name: "", message: "", suggestion: "" });
  };

  return (
    <div className="min-h-screen pt-20 page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="section-title">Contact & Feedback</h1>
        </div>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Have suggestions, feedback, or want to contribute materials? We'd love to hear from you.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="Your message or feedback"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Material Suggestion <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            value={form.suggestion}
            onChange={(e) => setForm({ ...form, suggestion: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Suggest a subject or material to add"
          />
        </div>
        <button type="submit" className="gradient-btn px-6 py-3 flex items-center gap-2">
          <Send className="w-4 h-4" />
          Send Message
        </button>
      </form>
    </div>
  );
}
