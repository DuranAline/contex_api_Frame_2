import { FormEvent, useState } from "react";
import { Input } from "../../components/input";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IdentificationBadge } from "@phosphor-icons/react";
import "../login/style.css";
import { useUser } from "../../context/UserContext";

export function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { updateUser } = useUser();
  
    function handleSubmit(e: FormEvent) {
      e.preventDefault();
      if (!email || !password) {
        alert('Please fill in both email and password');
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          updateUser({ username: user.displayName || '', email: user.email || '' });
          navigate('/');
        })
        .catch((error) => {
          console.error('Failed to login', error);
          alert('Failed to login');
        });
    }
  
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <Input
            placeholder="your.email@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    );
  }