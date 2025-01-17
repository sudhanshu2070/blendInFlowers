import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface AuthContextType {
  user: any; // Replace `any` with the actual user type if you have one
  login: (userData: any) => void;
  logout: () => void;
}

// Create the context with a default value of null (which we’ll later replace with proper types)
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null); // Replace `any` with your user type

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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