import imagemHome from '../assets/images/illustration.svg'
import logoHome from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
// Para usar uma imagem preciso importar ela;
// Na importação, preciso colocar dois pontos antes da primeira pasta.

export function Home() {
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
          <button className="btn-google">
            <img src={googleImg} alt="logoDoGoogle" />
            Crie sua sala com o Google
          </button>
          <div className="separador">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <button type="submit">Entrar na Sala</button>
          </form>
        </div>
      </main>
    </div>
  )
}