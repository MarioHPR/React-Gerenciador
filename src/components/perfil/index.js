import { Drawer, Button, Avatar, Divider, Col, Row, Form, Input } from 'antd';
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
  const [ childrenDrawer, setChildrenDrawer ] = useState(false);
  const [ usuario, setUsuario ] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
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
              <Button type="primary" onClick={showChildrenDrawer}>
                Editar perfil
              </Button>
            </Col>
          </Row>
          <Drawer
            title="Edição dados usuário"
            width={"auto"}
            closable={false}
            onClose={onChildrenDrawerClose}
            visible={childrenDrawer}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="name" label="Name"
                    rules={[{ required: true, message: 'Nome é obrigatório' }]}
                  >
                    <Input defaultValue={usuario.nome} placeholder="Insira seu nome" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="email" label="E-mail"
                    rules={[{ required: true, message: 'E-mail é obrigatório' }]}
                  >
                    <Input defaultValue={usuario.email} placeholder="Insira seu email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="cpf" label="Cpf"
                    rules={[{ required: true, message: 'Cpf é obrigatório' }]}
                  >
                    <Input defaultValue={usuario.cpf} placeholder="Insira seu cpf" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='País'>
                    <Input defaultValue="Brasil 🇧🇷" readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="dataNasc" label="Data nascimento"
                    rules={[{ required: true, message: 'Cpf é obrigatório' }]}
                  >
                    <Input defaultValue={usuario.cpf} placeholder="Insira seu cpf" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="please enter url description" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
      </Drawer>
    </>
  );
}