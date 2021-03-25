import React, { useEffect, useState } from 'react';
import { Header, TableListaTipoExame } from '../../components';
import { Col, Layout } from 'antd';
import MenuAtual from '../../components/menu';
import TipoExameApi from '../../models/tipoExameApi';
const tipoExameApi = new TipoExameApi();
const auth = localStorage.getItem("token-gerenciador-security");
const { Content, Footer } = Layout;

export default function ListaTipoExames() {
  const [ tipoExames, setTipoExames ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const [ message, setMessage ] = useState('');
  

  const [ aux, setAux ] = useState([]);

  useEffect(()=>{
    tipoExameApi.buscarTodosTipoExames(auth)
      .then( resp => {
        setTipoExames(resp)
      } );
  },[atualizaTela, setAtualizaTela]);


  const handleDelete = evt => {
    tipoExameApi.removerTipoExame(evt.key, auth)
      .then( resp => {
        if(resp.status === 200)
          setAtualizaTela(atualizaTela + 1);
    } );
  };

  const [ collapsed2, setCollapsed2 ] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed2(!collapsed2);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuAtual />
        <Layout className="site-layout">
          <Header className="site-layout-background" collapsed={ collapsed2 } toggleCollapsed={ toggleCollapsed } />
          <Content className="pagina-padrao" style={{ margin: '0 1px' }}>
            <Col xs={{span:24}}>
              <h2 className='titulo-consulta'>Listagem tipo exames:</h2>
            </Col>
            <Col xs={{span:24}}>
                {tipoExames !== [] && <TableListaTipoExame aux={aux} setAux={setAux} message={message} handleDelete={handleDelete}  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} tipoExames={tipoExames}/>}
            </Col>
          </Content>
          <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
        </Layout>
      </Layout>
    </>
  )
}
