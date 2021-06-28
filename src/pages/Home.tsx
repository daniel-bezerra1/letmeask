
import { useHistory } from 'react-router-dom'
import imagemHome from '../assets/images/illustration.svg'
import logoHome from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [refSala, setRefSala] = useState('');

  async function criarSala() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push('salas/novasala')
  }

  async function entrarSala(event:FormEvent) {
    event.preventDefault();

    if (refSala.trim() === '') {
      return;
    }

    //verificação de existencia da sala.
    const buscaSala = await database.ref(`salas/${refSala}`).get();
    if (!buscaSala.exists()) {
      alert('Sala não encontrada');
      return;
    }
    history.push(`salas/${refSala}`)
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
          <form onSubmit={entrarSala}>
            <input type="text" 
                  placeholder="Digite o código da sala" 
                  onChange={event => setRefSala(event.target.value)}
                  value={refSala}
            />
            <Button type="submit">Entrar na Sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}