import { useEffect, useState } from "react"
import { database } from "../services/firebase"

type PerguntasFirebase = Record <string,  {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean,
}>

type Perguntas = {
    id: string, 
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean,
}

export function UseRoom(idSala: String){
    const [pergunta, setPergunta] = useState <Perguntas[]>([])
    const [titulo, setTitulo] = useState('')

    // use effect é uma função (hook) que é disparado sempre que alguma coisa mudar.
    // se o parametro passado 
    useEffect( () => {
        const referenciaSala = database.ref(`salas/${idSala}`);

        referenciaSala.on('value', salas =>{
            const dbSala = salas.val();
            const perguntasFirebase = dbSala.perguntas as PerguntasFirebase;
            console.log(perguntasFirebase)
            const parsePergunta = Object.entries(perguntasFirebase ?? {}).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            
            setTitulo(dbSala.title);
            setPergunta(parsePergunta)

        })
        
    }, [idSala]);

    return{
        pergunta, titulo
    }
}