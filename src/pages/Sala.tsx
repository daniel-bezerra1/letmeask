import { FormEvent, useState } from 'react'
import { useParams } from 'react-router'
import logoHome from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { CodSala } from '../components/CodSala'
import { Question } from '../components/Question'
import { useAuth } from '../hooks/useAuth'
import { UseRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/sala.scss'

type ParametrosSala = {
    id: string;
}

export function Salas() {
    const { user } = useAuth();
    const parametros = useParams<ParametrosSala>();
    const [novaPergunta, setNovaPergunta] = useState('')
    const idSala = parametros.id;
    const { pergunta, titulo } = UseRoom(idSala);


    //sempre que estou pegando valor do formulário preciso colocar no parametro da função o event: FormEvent do React
    async function criaPergunta(event: FormEvent) {
        event.preventDefault(); //não recarrega a pagina
        if (novaPergunta.trim() === '') {
            
            return
        }
        if (!user) {
            throw new Error("Você precisa estar logado");
            
        }

        const pergunta = {
            content: novaPergunta,
            author: {
                name: user.user,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false,
        };

        await database.ref(`salas/${idSala}/perguntas/`).push(pergunta);
        setNovaPergunta('');
    }

    return (
        <div id="pag-sala">
            <header>
                <div className="content">
                    <img src={logoHome} alt="logo-home"/>
                    <CodSala code={idSala} />
                </div>
            </header>
            <main>
                <div className="titulo-sala">
                    <h1>Sala: {titulo}</h1>
                    <span>{pergunta.length} pergunta(s)</span>
                </div>
                <form onSubmit={criaPergunta}>
                    <textarea placeholder="La Pergunta?" 
                              onChange = {event => setNovaPergunta(event.target.value)}
                              value = {novaPergunta}></textarea>
                    <div className= "rodape-formulario">
                        {
                            user ? (
                                //se usuário estiver preenchido. 
                                <div className = "info-usuario" >
                                    <img src={user.avatar} alt="img-usuario"/>
                                    <span>{user.user}</span>
                                </div>
                            ) : (
                                // se não estiver preenchido
                                <p>Para enviar uma pergunta, <button>faça seu login</button>.</p>
                            )
                        }
                        <Button type="submit"disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                {pergunta.map(pergunta => {
                    return (
                        <Question
                            key={pergunta.id}
                            content={pergunta.content}
                            author= {pergunta.author}
                        />
                    )
                })}
            </main>
        </div>
    )
}