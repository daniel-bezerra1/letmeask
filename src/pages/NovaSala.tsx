import {FormEvent, useState,} from 'react'
import { Link, useHistory } from 'react-router-dom'
import imagemHome from '../assets/images/illustration.svg'
import logoHome from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function NovaSala() {

  const [numSala, setNumSala] = useState('');
  const history = useHistory();

  async function criarSala(event: FormEvent) {
    event.preventDefault(); //Não deixa recarregar a página.
    if (numSala.trim() === '') {
      return;
    }

    //Procurando uma referencia no JSON
    const roomRef = database.ref('salas'); 

    //Escrevendo no banco
    const firebaseSala = await roomRef.push({
      title: numSala,
      idUsuario: user?.id
    })
    
    history.push(`/salas/${firebaseSala.key}`)
  }
  
    const { user } = useAuth()

  
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
          <form onSubmit={criarSala}>
            <input type="text" 
                  placeholder="Digite o código da sala"
                  onChange={event => setNumSala(event.target.value)}
                  value = {numSala} 
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to={"/"}>Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}

