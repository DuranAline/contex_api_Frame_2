import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import "./style.css";
import { Spinner } from "@phosphor-icons/react";

interface PrivateProps {
    children: ReactNode; 
}

export function Private({ children }: PrivateProps) {
    const [signed, setSigned] = useState(false); // Estado para controlar se o usuário está logado
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // Listener que verifica as mudanças de autenticação do usuário
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log("Detecção de mudança de autenticação do Firebase:", user); // Log para verificar o objeto do usuário
            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email
                };

                localStorage.setItem('@userData', JSON.stringify(userData)); // Armazena os dados do usuário no local storage
                setLoading(false); // Encerra o carregamento
                setSigned(true); // Atualiza o estado para indicar que o usuário está logado
                console.log("Usuário está logado:", userData); // Log para verificar os dados do usuário autenticado
            } else {
                setLoading(false); 
                setSigned(false); 
                console.log("Usuário não está logado."); 
            }
        });

        // Função de limpeza chamada quando o componente é desmontado
        return () => {
            unsub(); 
            console.log("Desinscrevendo do listener de autenticação"); 
        };
    }, []);

    // Exibe um spinner de carregamento enquanto o estado de carregamento é verdadeiro
    if (loading) {
        console.log("Carregando..."); 
        return (
            <div className="loading">
                <Spinner size={100} weight="bold" className="icon-loading"/>
                <p className="text-loading">Carregando...</p>
            </div>
        );
    }

    
    if (!signed) {
        console.log("Redirecionando para login"); 
        return <Navigate to="/login" />;
    }

    return children; 
}
