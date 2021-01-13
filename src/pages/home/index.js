import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
//import './style.css';

//import UsuarioApi from '../../models/usuarioApi';

export default function Home() {

  const [ collapsed, setCollapsed ] = useState(true);
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="pagina-padrao tamanho-total-container">
        <Header collapsed={ collapsed } toggleCollapsed={ toggleCollapsed } />
        <h1>Home</h1>
        <Footer />
      </div>
     
    </>
  )
}
