import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import Cadastro from './cadastro';
import Consulta from './Consulta';
import TipoExame from './TipoExame';
import Home from './home';
import Instituicoes from './instituicoes';
import { RotaPrivada } from '../components/rotaPrivada';

export default function App() {
  return (
    <Router>
      <RotaPrivada path="/" exact component={ Home }/>
      <Route path="/login" exact component={ Login } />
      <Route path="/cadastro" exact component={ Cadastro } />
      <RotaPrivada path="/consultas" exact component={ Consulta } />
      <RotaPrivada path="/tipoExames" exact component={ TipoExame } />
      <RotaPrivada path="/instituicoes" exact component={ Instituicoes } />
    </Router>
  );
}
