import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { NovaSala } from './pages/NovaSala';
import './services/firebase'
import './styles/global.scss'
import { AuthContextProvider } from './contexts/AuthContexts'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact={true} component={Home} />
        <Route path="/salas/novasala" component={NovaSala} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
