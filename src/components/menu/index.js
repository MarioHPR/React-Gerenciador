import { Drawer, Divider } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Menu(props) {

  const { visible, setVisible } = props;
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Drawer
        title="Gerenciador"
        placement='left'
        closable={false}
        onClose={onClose}
        visible={visible}
        key='left'
      >
        <div class="vertical-menu">
          <Link className='' to='/'>Home</Link>
          <Divider />
          <Link className='' to='/tipoExames'>Exame</Link>
          <Divider />
          <Link className='' to='/consultas'>Consulta</Link>
          <Divider />
          <Link className='' to='/instituicoes'>Instituições</Link>
          <Divider />
          <Link className='' to='/'>Tipo de exames cadastrados</Link>
        </div>
      </Drawer>
    </>
  );
}