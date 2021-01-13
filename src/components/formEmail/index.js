import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import RetrocardApi from '../../models/retrocardAPI';

function FormEmail( props ) {
  const history = useHistory();
  const [ idRetro, setIdRetro ] = useState( props.id || 1 );// remover o ou 1 qndo fizer a integracao pegando id da retrospectiva dinamicamente
  const [ titulo, setTitulo ] = useState('');
  const [ foiBom, setFoiBom ] = useState('');
  const [ melhorar, setMelhorar ] = useState('');
  const [ compromissos, setCompromissos ] = useState('');

  async function handleSubmit(event) { 
    event.preventDefault();
    const auth = localStorage.getItem('token-retrocard-security');
    const retrocardApi = new RetrocardApi();

    if( titulo !== '' &&  foiBom !== '' && melhorar !== '' && compromissos !== '' ){
      retrocardApi.enviarEmailsAosParticipantes(idRetro, titulo, foiBom, melhorar, compromissos, auth)
      .then( resp => {
        if(resp.status === 200){
          history.push('/')}
        });
    }
  }

  return (
    <div className='container-formularios-criar-sprint'>
      <h4>Titulo Retrospectiva</h4>
      <input placeholder="Titulo Retrospectiva" type="text"  onChange={evt => setTitulo( evt.target.value )} />

      <h4>Foi Bom</h4>
      <input placeholder="O que foi bom" type="text"  onChange={evt => setFoiBom( evt.target.value )} />

      <h4>melhorar</h4>
      <input placeholder="O que melhorar" type="text" onChange={evt => setMelhorar( evt.target.value )} />

      <h4>Compromissos</h4>
      <input placeholder="Compromissos" type="text" onChange={evt => setCompromissos( evt.target.value )}  />

      <div className="container-submit-salvar-sprint">
        <input className="submit-salvar-sprint" type="submit" value="Enviar feedback"  onClick={ handleSubmit } />
      </div>
    </div>
  )
}

export default FormEmail;
