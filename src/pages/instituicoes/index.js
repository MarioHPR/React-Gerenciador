import React, { useEffect, useState } from 'react';
import { Header, TableInstituicaoDados, Footer } from '../../components';
import { Col, Layout, notification } from 'antd';
import MenuAtual from '../../components/menu';
import InstituicaoApi from '../../models/instituicaoApi';
const instituicaoApi = new InstituicaoApi();
const auth = localStorage.getItem("token-gerenciador-security");

const { Content } = Layout;

export default function Instituicoes() {
  const [ instituicoes, setInstituicoes ] = useState([]);
  const [ atualizaTela, setAtualizaTela ] = useState(0);
  const [ message, setMessage ] = useState('');
  

  const [ aux, setAux ] = useState([]);

  useEffect(()=>{
    instituicaoApi.buscarInstituicoes(auth)
      .then( resp => setInstituicoes(resp) );
  },[setInstituicoes, atualizaTela]);

  const openNotificationWithIcon = (type, msg, descricao) => {
    notification[type]({
      message: [msg],
      description:[descricao],
      placement:'bottomRight'
    });
  };

  const handleDelete = evt => {
    instituicaoApi.deletarInstituicao(evt, auth).then( resp => {
      if( resp.status === 200 ){
        setAux(aux.filter( (item) => item.key !== evt ) );
        openNotificationWithIcon("success", 'Exclusão', 'Instituição excluída com sucesso!');
      }
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
              <h2 className='titulo-consulta'>Instituições:</h2>
            </Col>
            <Col xs={{span:24}}>
                {instituicoes !== [] && <TableInstituicaoDados aux={aux} setAux={setAux} message={message} handleDelete={handleDelete}  atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} instituicoes={instituicoes}/>}
            </Col>
          </Content>
          <Footer style={{ textAlign: 'center' }}>GERENCIADOR DE EXAMES© CRIADO POR MARIO HENRIQUE PEREIRA DA ROSA</Footer>
        </Layout>
      </Layout>
    </>
  )
}
