import { useUser } from '../../context/UserContext';
import { Navbar } from '../navbar/index';

export function Header() {
  const { user } = useUser(); 
 

  return (
    <header>
      <Navbar />
      {user ? (
        <p>Bem-vindo, {user.username || "Usuário sem nome"}!</p> 
      ) : (
        <p>Você não está logado.</p>
      )}
    </header>
  );
}

export default Header;
