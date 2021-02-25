import React from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './header.css';
import { Lista } from '../';
import { Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import PerfilUsuario from '../perfil';

const Header = ({ collapsed, toggleCollapsed, gerarBotao=false, nomeBotao='', linkGerarBotao='', botaoVoltar=false, link='' }) => {
    const history = useHistory();
    const deslogar = ( event ) => {
      event.preventDefault();
      localStorage.clear();
      history.push('/login')
    }

    const linha = ( item, i ) => {
      return <Link key={`bt${item.nomeBotao}`} className={ item.classe } to={item.rota}>{item.nomeBotao}</Link>;
    }
    
    return (
      <>
        <header className='site-page-header'>
          <Row className='row-header' >
            <Row className='div-top-header'>
              <Col ms={{span:24}} md={{span:8}}>
                <Link to='/' className='linkHome'>
                    Gerenciador   
                </Link>
                
              </Col>
              <Col ms={{span:24}} md={{span:16}}>
                <Link to='/#' onClick={deslogar} className='bt-logout'>
                  Logout
                </Link>
                <PerfilUsuario />
                <Lista
                  className="container-inputs"
                  dados={[
                    {classe:'bt-logout', rota:'/', nomeBotao: 'Dados do Usuário'},
                    { classe: 'bt-logout', rota:'/consultas', nomeBotao: 'Consulta'  },
                    { classe: 'bt-logout', rota:'/tipoExames', nomeBotao: 'Exame'  },
                    { classe: 'bt-logout', rota:'/', nomeBotao: 'Home'  }
                  ] }
                  funcao={ ( item, i ) => linha( item, i ) }
                />
              </Col>
            </Row>           
          </Row>
        </header>
      </>
    )
  }

  export default Header;