import React, { useState } from 'react';
import { Layout, notification} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { FormularioUi, FormularioLocalidadeContato, StepsTest, FormularioContato } from '../../components';
import { Row, Col, Form, Button } from 'antd';
import { Header, Footer }  from '../../components';
import './style.css';

import UsuarioApi from '../../models/usuarioApi';
const { Content } = Layout;

export default function Cadastro() {
  const history = useHistory();
  const [ step, setStep ] = useState(0);
  const [form] = Form.useForm();

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  const openNotificationWithIcon = (type, msg, descricao) => {
    notification[type]({
      message: [msg],
      description:[descricao],
      placement:'bottomRight'
    });
  };

  const onFinish = values => {
    let proximaEtapa = true;
    if(values.email.indexOf('@gmail.com') === -1){
      openNotificationWithIcon("error", 'Dados errados', 'Email teve conter sufixo "@gmail.com"!');
      proximaEtapa = false;
    }
    if(values.senha.length < 6){
      openNotificationWithIcon("error", 'Dados errados', 'Senha deve conter no minimo 6 caracteres!');
      proximaEtapa = false;
    }
    
    if(step < 2 && proximaEtapa) {
      proximaEtapa = false;
      setStep(step + 1);
    }
    if(step === 2){
      handleSubmit(values)
    }
  }
  async function handleSubmit(event) {    
    UsuarioApi.criar(event).then( resposta => {
        if( resposta.status === 200 )
          history.push('/login');
      })
  }

  const etapaAnterior = () => {
    if(step > 0){
      setStep(step - 1);
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
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
                      <div className='container-botoes-navegacao'>
                        <Link to='/' className='botao-proxima-etapa botao-ir-login'>Ir para o Login</Link>
                        <bottom onClick={etapaAnterior} className="botao-etapa-anterior">etapa anterior</bottom>
                        <Button type="primary" htmlType="submit" className="botao-proxima-etapa">CADASTRAR</Button>
                      </div>
                    </div>
                  </Col>
                }
                </Col>
              </Row>
            </Form>
          </Content>
        <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
      </Layout>
    </Layout>
  )
}
