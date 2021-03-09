import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormularioUi, FormularioLocalidadeContato, StepsTest, FormularioContato } from '../../components';
import { Row, Col, Form, Button } from 'antd';
import './style.css';

import UsuarioApi from '../../models/usuarioApi';

export default function Cadastro() {
  const history = useHistory();
  const [ step, setStep ] = useState(0);
  const [form] = Form.useForm();

  const onFinish = values => {
    if(step < 2) {
      setStep(step + 1);
    }
    if(step === 2){
      handleSubmit(values)
    }
  }
  async function handleSubmit(event) {
    const usuarioApi = new UsuarioApi();
    usuarioApi.criarUsuario(event).then( resposta => {
        if( resposta.status === 200 )
          history.push('/login');
      } ); 
  }

  const etapaAnterior = () => {
    if(step > 0){
      setStep(step - 1);
    }
  }

  return (
    <>
      <StepsTest step={step} setStep={setStep}/>
      <h2 className='titulo-principal'>Cadastro Usuário:</h2>
      <Form useForm={ form } name="validate_other" onFinish={onFinish} initialValues='' >
        <Row>
          <Col xs={{span:24}}>
          { step === 0 &&
            <Col xs={{span:24}}>
              <FormularioUi />
            </Col>
          }
          { step === 1 &&
            <Col xs={{span:24}}>
            <div className="pagina-login">
              <div className="container-form margin-top container-form-infos">
                <FormularioLocalidadeContato etapaAnterior={etapaAnterior}/>
              </div>
            </div>
            </Col>
          }
          { step === 2 &&
            <Col xs={{span:24}}>
              <div className="container-form margin-top container-form-infos">
                <FormularioContato /> 
                <Link to='/' className='botao-proxima-etapa botao-ir-login'>Ir para o Login</Link>
                <Button type="primary" htmlType="submit" className="botao-proxima-etapa">CADASTRAR</Button>
                <bottom onClick={etapaAnterior} className="botao-etapa-anterior">etapa anterior</bottom>
              </div>
            </Col>
          }
          </Col>
        </Row>
      </Form>
    </>
  )
}
