import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UsuarioApi from '../../models/usuarioApi'; 
import './style.css';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

export default function PerfilUsuario(props) {
  const {deslogar} = props;
  const [ visible, setVisible ] = useState(false);
  const [ usuario, setUsuario ] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const usuarioApi = new UsuarioApi();
    usuarioApi.buscarDadosDoUsuario(auth).then( resp => setUsuario(resp.data) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    

  return (
    <>{ usuario &&
        <a onClick={showDrawer} key={`a-${usuario.nome}`} >
              <div>
                  <Avatar style={{ backgroundColor: '#f56a00' }}>{usuario.nome[0]}</Avatar>
                  <span className='link-bt-perfil espaco-left' href="#">{usuario.nome}</span>
              </div>
            </a>
      }
      <Drawer
        width={"auto"}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          Dados do usuário
        </p>
        { usuario && 
          <>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Name" content={usuario.nome}/>
              </Col>
              <Col span={12}>
                <DescriptionItem title="E-mail" content={usuario.email} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Cpf" content={usuario.cpf} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="País" content="Brasil 🇧🇷" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Data nascimento" content={new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Endereço</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Cidade" content={usuario.cidade} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Cep" content={usuario.cep} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Bairro" content={usuario.bairro} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Rua" content={usuario.rua} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Numero"
                  content={usuario.numero}
                />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Contatos</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Contato primário" content={usuario.contatoUm} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Contato secundário" content={usuario.contatoDois} />
              </Col>
            </Row>
          </>
        }
          <Row>
            <Col span={12}>
              <Link to='/#' onClick={deslogar} className='bt-logout-modal'>
                Logout ( Sair )
              </Link>
            </Col>
            <Col span={12}>
              <a href="http://github.com/ant-design/ant-design/">
                Editar perfil
              </a>
            </Col>
          </Row>
      </Drawer>
    </>
  );
}