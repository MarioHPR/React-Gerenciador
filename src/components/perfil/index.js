import { Drawer, Button, Avatar, Divider, Col, Row, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UsuarioApi from '../../models/usuarioApi';
import InputMask from 'react-input-mask';
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
    console.log(usuario)
    setChildrenDrawer(false);
  };

  const onFinish = () => {
    console.log("************************")
    console.log("************************")
    console.log(usuario)
    console.log("************************")
    console.log("************************")
  }

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
            <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
              <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                Dados do usuário
              </p>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="name" label="Name"
                    rules={ [ { required: usuario.nome.length > 0 ? false : true, message: `Nome é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.nome = evt.target.value} defaultValue={usuario.nome} placeholder="Insira seu nome" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="email" label="E-mail"
                    rules={ [ { required: usuario.email.length > 0 ? false : true, message: `E-mail é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.email = evt.target.value} defaultValue={usuario.email} placeholder="Insira seu email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="cpf" label="Cpf"
                    rules={ [ { required: usuario.cpf.length > 0 ? false : true, message: `Cpf é obrigatório!` } ] }
                  >
                    
                    <InputMask
                      onChange={evt => usuario.cpf = evt.target.value}
                      mask="999.999.999-99"
                      key={ `bt${ usuario.cpf }` }
                      type='text'
                      placeholder="Insira seu cpf"
                      defaultValue={usuario.cpf}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='País'>
                    <Input defaultValue="Brasil 🇧🇷" readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="dataNasc" label="Data nascimento"
                    rules={ [ { required: usuario.dataNascimento.length > 0 ? false : true, message: `Data nascimento é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.dataNascimento = evt.target.value} type='date' defaultValue={usuario.dataNascimento} />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">Endereço</p>
              <Row>
                <Col span={12}>
                  <Form.Item name="cidade" label="Cidade"
                    rules={ [ { required: usuario.cidade.length > 0 ? false : true, message: `Cidade é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.cidade = evt.target.value} defaultValue={usuario.cidade} placeholder="Insira sua cidade" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="cep" label="Cep"
                    rules={ [ { required: usuario.cep.length > 0 ? false : true, message: `Cep é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.cep = evt.target.value} defaultValue={usuario.cep} placeholder="Insira seu cep" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item name="bairro" label="Bairro"
                    rules={ [ { required: usuario.bairro.length > 0 ? false : true, message: `Bairro é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.bairro = evt.target.value} defaultValue={usuario.bairro} placeholder="Insira seu bairro" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="rua" label="rua"
                    rules={ [ { required: usuario.rua.length > 0 ? false : true, message: `Rua é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.rua = evt.target.value} defaultValue={usuario.rua} placeholder="Insira sua rua" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="numero" label="Numero"
                    rules={ [ { required: usuario.numero > 0 ? false : true, message: `Número é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.numero = evt.target.value} defaultValue={usuario.numero} placeholder="Insira o número da casa" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">Contatos</p>
              <Row>
                <Col span={12}>
                  <Form.Item name="contatoUm" label="Contato primário"
                    rules={ [ { required: usuario.contatoUm.length > 0 ? false : true, message: `Contato primário é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.contatoUm = evt.target.value} defaultValue={usuario.contatoUm} placeholder="Insira seu contato primário" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="contatoDois" label="Contato secundário"
                    rules={ [ { required: usuario.contatoDois.length > 0 ? false : true, message: `Contato secundário é obrigatório!` } ] }
                  >
                    <Input onChange={evt => usuario.contatoDois = evt.target.value} defaultValue={usuario.contatoDois} placeholder="Insira seu contato secundário" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col xs={{span:24}} md={{span:12}}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                      <span className='color-white'>Realizar edição</span>
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
      </Drawer>
    </>
  );
}