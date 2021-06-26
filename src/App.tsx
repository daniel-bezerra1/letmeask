import './App.css';

// usando o import dessa forma estou especificando qual function eu quero. 
import { Home } from './pages/Home';
import './services/firebase'
import './styles/global.scss'

// Componentes são pedaços isolados que quando juntos formam a aplicação. 
// A function App é um componente.
// Componente é uma função que devolve um HTML 
// Não se escreve componentes em classes

function App() {
  return (
    <Home />
  );
}

export default App;
