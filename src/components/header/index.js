import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import './header.css';
import { Button } from 'antd';
import Menu from '../menu';
import PerfilUsuario from '../perfil';
import { MenuOutlined } from '@ant-design/icons';

const Header = () => {
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
                <div className='linkHome'>
                  <Button  className='menu' onClick={showDrawer}>
                    <MenuOutlined />
                  </Button>
                  <Menu visible={visible} setVisible={setVisible} />   
                </div>            
              </Col>
              <Col ms={{span:24}} md={{span:16}}>
                <div className='bt-basico bt-logout'>
                  <PerfilUsuario deslogar={deslogar}/>
                </div>
              </Col>
            </Row>           
          </Row>
        </header>
      </>
    )
  }

  export default Header;