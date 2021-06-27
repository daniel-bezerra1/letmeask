
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContexts'
import { useHistory } from 'react-router-dom'
import imagemHome from '../assets/images/illustration.svg'
import logoHome from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext);

  async function criarSala() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('salas/novasala')
  }

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
          <button onClick={criarSala} className="btn-google">
            <img src={googleImg} alt="logoDoGoogle" />
            Crie sua sala com o Google
          </button>
          <div className="separador">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na Sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}