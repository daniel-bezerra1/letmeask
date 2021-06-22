import { useState } from "react";

type ButtonProps = {
  text?: string
}
//O ponto de interrogação acima "text?" indica que essa propriedade é opcional

export function ButtonOne(props: ButtonProps) {

  const [counter, setCounter] = useState(0);

  //criando um novo valor na variável counter com base no valor anterior.
  //com useState não se altera uma variável mas cria-se um novo valor com base no anterior.
  function Incrementar() {
    setCounter(counter + 1);
    console.log(counter)
  }

  return (
    <button onClick={Incrementar}>
      {counter}
    </button>
  )
}


