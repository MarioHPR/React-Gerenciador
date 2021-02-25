import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.css';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

export default function PerfilUsuario(props) {

  const [ visible, setVisible ] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <List
        dataSource={[
          {
            name: 'Lily',
          }
        ]}
        bordered
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={showDrawer} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description="Progresser XTech"
            />
          </List.Item>
        )}
      />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          Dados do usuário
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="E-mail" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Cpf" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="País" content="Brasil 🇧🇷" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Data nascimento" content="February 2,1900" />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Endereço</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Cidade" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Cep" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Bairro" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Rua" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Numero"
              content="123"
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contatos</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Contato primário" content="(86) 0 0000 0000" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Contato secundário" content="(86) 0 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <a href="http://github.com/ant-design/ant-design/">
              Logout ( Sair )
            </a>
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