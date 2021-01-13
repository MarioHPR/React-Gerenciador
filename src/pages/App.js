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
      <Route path="/cadastroConsulta" exact component={ CadastroConsulta } />
      <Route path="/consultas" exact component={ Consulta } />
      <Route path="/tipoExames" exact component={ TipoExame } />
      <Route path="/Exames/:id" exact component={ Exame } />
      <Route path="/instituicao" exact component={ CadastroInsituicao } />
    </Router>
  );
}
