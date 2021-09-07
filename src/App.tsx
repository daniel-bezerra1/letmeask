import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home';
import { NovaSala } from './pages/NovaSala';
import { Salas } from './pages/Sala';
import './services/firebase'
import './styles/global.scss'
import { AuthContextProvider } from './contexts/AuthContexts'
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/salas/novasala" component={NovaSala} />
          <Route path="/salas/:id" component={Salas} />
          <Route path="/admin/salas/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
