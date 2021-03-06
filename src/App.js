
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ListarUsuario from './usuario/Listar';
import IncluirUsuario from './usuario/Incluir';
import AlterarUsuario from './usuario/Alterar';
import Login from './login/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
             <Switch>
             <Route path="/" component={Login}/> 
               <div className="app-content">
                <Route path="/usuario/listar" component={ListarUsuario}/>
                <Route path="/usuario/inserir" component={IncluirUsuario}/>
                <Route path="/usuario/alterar/:id" component={AlterarUsuario}/>
                </div>
             </Switch>
          </Router>
      </header>
    </div>
  );
}
export default App;