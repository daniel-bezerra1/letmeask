import copyImg from '../assets/images/copy.svg'
import '../styles/codSala.scss'

type CodSalaProps = {
    code: string;
}

export function CodSala(props: CodSalaProps) {

    function copiarCodSala() {
        navigator.clipboard.writeText(props.code)
    }
    
    return(
        <button className="cod-sala" onClick={copiarCodSala}> 
        <div>
            <img src={copyImg} alt="copy"/>
        </div>
        <span>Sala #{props.code}</span>
        </button>
    )
}