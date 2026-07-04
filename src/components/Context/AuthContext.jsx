import { createContext, useState } from "react";
import { loginUser } from "../../api/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const login = async (username, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await loginUser(username, password);
      setUser(data);
      localStorage.setItem("authUser", JSON.stringify(data));
      return true;
    } catch (err) {
      setAuthError(err.message);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, authLoading, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
}
