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

    async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
        if (likeId) {
            await database.ref(`salas/${idSala}/perguntas/${questionId}/likes`).remove()
        } else {
            await database.ref(`salas/${idSala}/perguntas/${questionId}/likes`).push({
                authorId: user?.id,
            })
        }

        
        
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
                        >

                            <button
                            className={`like-button ${pergunta.likeId ? 'liked' : ''}`}
                            type='button'
                            aria-label='Marcar como gostei'
                            onClick={() => handleLikeQuestion(pergunta.id, pergunta.likeId)}
                            >
                                {pergunta.likeCount > 0 && <span>{pergunta.likeCount}</span>}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </button>
                        </Question>
                    )
                })}
            </main>
        </div>
    )
}