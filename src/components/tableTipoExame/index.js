import React, { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import ExameApi from '../../models/exameApi';
import { ModalAddExame, ModalExame } from '../../components';
import { DeleteOutlined, EditOutlined ,EyeOutlined } from '@ant-design/icons';

export default function TableTipoExame( props ) {
  const exameApi = new ExameApi();
  const { exames, setAtualizaTela, atualizaTela } = props;
  const [ aux, setAux ] = useState([]);
  const [ message, setMessage ] = useState('');
  const [ idExame, setIdExame ] = useState();
  const [ visible, setVisible ] = useState(false);
  const [ visibleModalGeral, setVisibleModalGeral ] = useState(false);
  const [flgEditarVisualizar, setFlgEditarVisualizar ] = useState(0);

  const auth = localStorage.getItem("token-gerenciador-security");

  const columns = [
    { title: "Id", dataIndex: "key" }, 
    {
      title: "Exame",
      dataIndex: "tipoExame"
    },
    {
      title: "Data do exame",
      dataIndex: "dataExame"
    },
    {
      title: "Instituição",
      dataIndex: "instituicao"
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (text, record) =>
        true ? (
          <div className="container-operacoes">
            <Popconfirm title="Tem certeza que deseja deletar?" onConfirm={() => handleDelete(record.key)}>
              <a href='#/' className="bt-operacao" title="deletar"><DeleteOutlined /></a>
            </Popconfirm>
            <a href='#/' title="editar" onClick={() => handleEditarVisualizar(record.key, 1)} className="bt-operacao"><EditOutlined /></a>
            <Link to={`#/`} title="visualizar" onClick={() => handleEditarVisualizar(record.key, 0)} className="bt-operacao"><EyeOutlined /></Link>
          </div>
        ) : null,
    },
  ];

  const handleDelete = evt => {
    exameApi.removerExame(evt, auth).then( resp => {
      if( resp.status === 200 ){
        setMessage(resp.data);
        setAux(aux.filter( (item) => item.key !== evt ) );
        setTimeout(() => {
          setMessage('');
        }, 2 * 1000 );
      }
    } );
  };

  const handleEditarVisualizar = (evt, flg) => {
    //setIdExame(evt);
    const exameApi = new ExameApi();
    exameApi.buscarExamePorId( evt, auth).then( resp => {
      if(resp.status === 200){
        if(resp.data !== idExame)
          setIdExame(resp.data.id);
        setVisibleModalGeral(true);
        setFlgEditarVisualizar(flg);
      }
    } );
    
  };

  useEffect(() => {
    let arrayAux = [];
    exames.map( tipo => 
      arrayAux.push({
        "key": tipo.id,
        "tipoExame": `${tipo.nomeExame}` || '--',
        "dataExame": new Date(tipo.dataExame).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) || '--',
        "instituicao": `${tipo.dadosInstituicao.nome}` || '--'
      })
    );
    setAux(arrayAux);
  },[exames]);
  
  return (
      <div className='container-lista-consulta'>
        <span className='message'>{message}</span>
        <a href='#/' onClick={() => {setVisible(true)}} className='bt-geral bt-cadastro-consulta' >
          Adicionar novo exame
        </a>
        {aux !== [] && <Table columns={columns} dataSource={aux} pagination={{ pageSize: 10 }}/>}
        <ModalAddExame atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} visibleAdd={visible} setVisibleAdd={setVisible}/>
        <ModalExame atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela}  idExame={idExame} visibleModal={visibleModalGeral} setVisibleModal={setVisibleModalGeral} editarVisualizar={flgEditarVisualizar} />
      </div>
  )
}