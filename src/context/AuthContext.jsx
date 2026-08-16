import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "tb_users";
const SESSION_KEY = "tb_session";

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) setUser(JSON.parse(session));
    setLoading(false);
  }, []);

  function register({ name, email, password, role }) {
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }
    const newUser = { id: crypto.randomUUID(), name, email, password, role };
    writeUsers([...users, newUser]);
    const session = { id: newUser.id, name, email, role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  }

  function login({ email, password }) {
    const users = readUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password.");
    const session = { id: found.id, name: found.name, email: found.email, role: found.role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
