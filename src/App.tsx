import './App.css';

// usando o import dessa forma estou especificando qual function eu quero. 
import { ButtonOne } from './components/Button'

// Componentes são pedaços isolados que quando juntos formam a aplicação. 
// A function App é um componente.
// Componente é uma função que devolve um HTML 
// Não se escreve componentes em classes

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <ButtonOne />
      <ButtonOne />
      <ButtonOne />
      <ButtonOne />

    </div>

  );
}

export default App;
