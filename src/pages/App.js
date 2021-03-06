import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import Cadastro from './cadastro';
import CadastroConsulta from './cadastroConsulta';
import Consulta from './Consulta';
import CadastroInsituicao from './cadastroInstituicao';
import TipoExame from './TipoExame';
import Exame from './Exame';
import Home from './home';
import { RotaPrivada } from '../components/rotaPrivada';

export default function App() {
  return (
    <Router>
      <RotaPrivada path="/" exact component={ Home }/>
      <Route path="/login" exact component={ Login } />
      <Route path="/cadastro" exact component={ Cadastro } />
      <RotaPrivada path="/cadastroConsulta" exact component={ CadastroConsulta } />
      <RotaPrivada path="/consultas" exact component={ Consulta } />
      <RotaPrivada path="/tipoExames" exact component={ TipoExame } />
      <RotaPrivada path="/Exames/:id" exact component={ Exame } />
      <RotaPrivada path="/instituicao" exact component={ CadastroInsituicao } />
    </Router>
  );
}
