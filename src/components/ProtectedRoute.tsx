import { Navigate } from "react-router-dom";
import { useAuth, isAdmin } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ShieldX } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin(user)) {
    return (
      <div className="min-h-screen pt-20 page-container flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 rounded-2xl text-center max-w-md"
        >
          <ShieldX className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access the admin panel. Only authorized administrators can access this page.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Signed in as: <span className="text-foreground">{user.email}</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
