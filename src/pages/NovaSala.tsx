import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContexts'
import imagemHome from '../assets/images/illustration.svg'
import logoHome from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'


export function NovaSala() {

  const { user } = useContext(AuthContext);
  
  return (
    <div id="page-auth">
      <aside>
        <img src={imagemHome} alt="imgHome" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire a dúvida de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoHome} alt="logo" />
          <h4>Seja bem-vindo <br />{user?.user}</h4>
          <h2>Crie uma nova sala</h2>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to={"/"}>Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}

