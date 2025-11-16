'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // On initial load, check if a user is saved in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('recraft_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- SIMULATED LOGIN ---
  // ... inside AuthContext.js

  // --- UPDATED SIMULATED LOGIN ---
  // --- UPDATED SIMULATED LOGIN/SIGNUP ---
  const login = (userData) => {
    // Construct the user object based on the form data
    const simulatedUser = { 
      name: userData.name, 
      email: userData.email, 
      type: userData.userType || 'Buyer' // Default to 'Buyer'
    };

    // If the user is an Artisan, add their contact details
    if (simulatedUser.type === 'Artisan') {
      simulatedUser.contact = {
        phone: userData.phone,
        address: userData.address
      };
    }

    localStorage.setItem('recraft_user', JSON.stringify(simulatedUser));
    setUser(simulatedUser);
  };

// ... rest of the file is the same

  // --- SIMULATED LOGOUT ---
  const logout = () => {
    localStorage.removeItem('recraft_user');
    setUser(null);
    router.push('/'); // Redirect to homepage on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}