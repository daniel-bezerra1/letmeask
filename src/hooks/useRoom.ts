import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type PerguntasFirebase = Record <string,  {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean,
    likes: Record <string, {
        authorId: string;
    }>
}>

type Perguntas = {
    id: string; 
    author: {
        name: string;
        avatar: string
    },
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likeCount: number;
    likeId: string | undefined
}

export function UseRoom(idSala: String){
    const { user } = useAuth();
    const [pergunta, setPergunta] = useState <Perguntas[]>([])
    const [titulo, setTitulo] = useState('')

    // use effect é uma função (hook) que é disparado sempre que alguma coisa mudar.
    // se o parametro passado 
    useEffect( () => {
        const referenciaSala = database.ref(`salas/${idSala}`);

        referenciaSala.on('value', salas =>{
            const dbSala = salas.val();
            const perguntasFirebase = dbSala.perguntas as PerguntasFirebase;
            const parsePergunta = Object.entries(perguntasFirebase ?? {}).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, value]) => value.authorId === user?.id)?.[0]
                }
            })
            
            setTitulo(dbSala.title);
            setPergunta(parsePergunta)

        })
        
    }, [idSala, user?.id]);

    return{
        pergunta, titulo
    }
}