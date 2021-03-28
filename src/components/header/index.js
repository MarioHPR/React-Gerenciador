import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import './header.css';
import { Button } from 'antd';
import Menu from '../menu';
import PerfilUsuario from '../perfil';
import { MenuOutlined } from '@ant-design/icons';

export default function Header (props) {
    const { mostrarLogin, btMostrarLogin } = props;
    const history = useHistory();
    const [ visible, setVisible ] = useState(false);
    const deslogar = ( event ) => {
      event.preventDefault();
      localStorage.clear();
      history.push('/login')
    }

    const showDrawer = () => {
      setVisible(true);
    };

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
                    <p onClick={mostrarLogin}>Entrar no sistema</p> :
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