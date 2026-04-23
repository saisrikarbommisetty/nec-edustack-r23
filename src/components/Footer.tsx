import { GraduationCap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-foreground">
              EduStack R23
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/syllabus" className="hover:text-foreground transition-colors">Syllabus</Link>
          </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
          Designed & built by 
            <a 
            href="https://www.linkedin.com/in/sai-srikar-bommisetty" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 font-semibold hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] transition"
          >
            Sai Srikar
          </a>— powering smarter learning for NEC Students.
        </p>
        </div>
      </div>
    </footer>
  );
}
