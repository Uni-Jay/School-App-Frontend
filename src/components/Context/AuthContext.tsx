import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user_id: any;
  role: string | null;
  school_id: string | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const payloadBase64 = savedToken.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      const identity = JSON.parse(payload.sub);
      setUser(identity);
      setToken(savedToken);
    }
  }, []);

  const login = (token: string) => {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    const identity = JSON.parse(payload.sub);
    setUser(identity);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user_model_id", identity.user_id);
    localStorage.setItem("school_id", identity.school_id || "");
    localStorage.setItem("role_name", identity.role);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{  token, login, logout, role: user?.role, school_id: user?.school_id, user_id: user?.user_id }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
