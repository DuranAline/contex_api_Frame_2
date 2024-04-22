// Arquivo: src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface User {
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  updateUser: (newUserData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

const saveUserToFirestore = async (user: User) => {
  const userRef = doc(db, "users", user.email); // Usar o email como chave única
  try {
    await setDoc(userRef, user, { merge: true });
  } catch (error) {
    console.error("Error writing document to Firestore: ", error);
  }
};

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const newUser = {
          username: firebaseUser.displayName || '',
          email: firebaseUser.email || ''
        };
        setUser(newUser);
        saveUserToFirestore(newUser); // Salvar/atualizar no Firestore
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (newUserData: Partial<User>) => {
    setUser(prev => {
      const updatedUser = { ...prev!, ...newUserData };
      saveUserToFirestore(updatedUser);
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
