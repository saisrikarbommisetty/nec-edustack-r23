import { createContext, useContext, useState, ReactNode } from "react";

interface AuthUser {
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = "your-email@example.com"; // Change this to your admin email

export const isAdmin = (user: AuthUser | null) => user?.email === ADMIN_EMAIL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading] = useState(false);

  const signInWithGoogle = async () => {
    // Placeholder for future auth integration
    console.log("Auth provider not configured yet");
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
