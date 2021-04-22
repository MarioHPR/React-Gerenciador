import React, { useEffect, useState } from 'react';
import { Header, TableListaTipoExame, Footer } from '../../components';
import { Col, Layout, notification } from 'antd';
import MenuAtual from '../../components/menu';
import TipoExameApi from '../../models/tipoExameApi';
const tipoExameApi = new TipoExameApi();
const { Content } = Layout;

export default function ListaTipoExames() {
  const [ tipoExames, setTipoExames ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const [ message, setMessage ] = useState('');
  

  const [ aux, setAux ] = useState([]);

  useEffect(()=>{
    tipoExameApi.buscarTodosTipoExames()
      .then( resp => {
        setTipoExames(resp)
      } );
  },[atualizaTela, setAtualizaTela]);

  const openNotificationWithIcon = (type, msg, descricao) => {
    notification[type]({
      message: [msg],
      description:[descricao],
      placement:'bottomRight'
    });
  };

  const handleDelete = evt => {
    tipoExameApi.removerTipoExame(evt.key)
      .then( resp => {
        if(resp.status === 200)
          setAtualizaTela(atualizaTela + 1);
          openNotificationWithIcon("success", 'Exclusão', 'Todos os exames do Tipo exame selecionado, foram excluídos com sucesso!');
    },(error) => { openNotificationWithIcon('error', 'Não foi possivel', 'Não foi possivel realizar a exclusão!'); });
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
