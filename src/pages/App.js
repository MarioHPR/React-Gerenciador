import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import Cadastro from './cadastro';
import Consulta from './Consulta';
import TipoExame from './TipoExame';
import Home from './home';
import Instituicoes from './instituicoes';
import ListaTipoExames from './listaTipoExames';
import { RotaPrivada } from '../components/rotaPrivada';
import LayoutInterno from './teste';

export default function App() {
  return (
    <Router>
      <RotaPrivada path="/" exact component={ Home }/>
      {/* <RotaPrivada path="/" exact component={ LayoutInterno }/> */}
      <Route path="/login" exact component={ Login } />
      <Route path="/cadastro" exact component={ Cadastro } />
      <RotaPrivada path="/consultas" exact component={ Consulta } />
      <RotaPrivada path="/tipoExames" exact component={ TipoExame } />
      <RotaPrivada path="/instituicoes" exact component={ Instituicoes } />
      <RotaPrivada path="/listaTipoExames" exact component={ ListaTipoExames } />
    </Router>
  );
}
