// UserProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Input } from '../../components/input';
import './style.css';  

export function UserProfilePage() {
  const { user, updateUser } = useUser();  // Obtém o usuário do contexto e a função de atualização
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await updateUser({ username, email });
        setFeedbackMessage("Perfil atualizado com sucesso!");
        setUsername('');
        setEmail('');

        // Remove a mensagem após 5 segundos
        setTimeout(() => {
          setFeedbackMessage('');
        }, 5000);
      } catch (error) {
        setFeedbackMessage('Erro ao atualizar perfil.');
        console.error("Erro ao Atualizar Usuário:", error);
      }
    } else {
      alert('Você precisa estar logado para alterar o perfil.');
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">Perfil do Usuário</h1>
      {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <Input
          placeholder="Nome de usuário"
          value={username}
          onChange={handleUsernameChange}
          type="text"
          className="input"
          disabled={!user}
        />
        <Input
          placeholder="Endereço de e-mail"
          value={email}
          onChange={handleEmailChange}
          type="email"
          className="input"
          disabled={!user}
        />
        <button type="submit" className="button" disabled={!user}>Atualizar Perfil</button>
      </form>
    </div>
  );
}

export default UserProfilePage;
