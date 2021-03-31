import React from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import './header.css';
import PerfilUsuario from '../perfil';
import { LoginOutlined } from '@ant-design/icons';

export default function Header (props) {
    const { mostrarLogin, btMostrarLogin } = props;
    const history = useHistory();
    const deslogar = ( event ) => {
      event.preventDefault();
      localStorage.clear();
      history.push('/login')
    }

    return (
      <>
        <header className='site-page-header'>
          <Row className='row-header' >
            <Row className='div-top-header'>
              <Col ms={{span:24}} md={{span:8}}>
              </Col>
              <Col ms={{span:24}} md={{span:16}}>
                <div className='bt-basico bt-logout'>
                {
                  btMostrarLogin ?
                    <p onClick={mostrarLogin} className='bt-login-abrir-caixa'>Entrar no sistema <LoginOutlined /></p> :
                    <PerfilUsuario deslogar={deslogar}/>
                }
               </div>    
              </Col>
            </Row>           
          </Row>
        </header>
      </>
    )
  }