import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebaseConnection'; 
import { onAuthStateChanged } from "firebase/auth";

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
  if (!context) throw new Error("useUser deve ser usado dentro de um UserProvider");
  return context;
}

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Escuta as mudanças de estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Caso o usuário esteja logado, atualiza as informações do usuário
        const userData = {
          username: firebaseUser.displayName || 'Anônimo',
          email: firebaseUser.email || 'sem-email@exemplo.com'
        };
        setUser(userData);
      } else {
        // Caso não esteja logado, define o usuário como null
        setUser(null);
      }
    });

    // Retorna uma função para desinscrever o listener quando o componente desmontar
    // está relacionada ao monitoramento das mudanças no estado de autenticação de um usuário
    return () => unsubscribe();
  }, []);

  // Atualiza as informações do usuário no contexto
  const updateUser = (newUserData: Partial<User>) => {
    setUser(prev => ({ ...prev!, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
