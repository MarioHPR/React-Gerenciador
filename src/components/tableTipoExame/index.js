import React, { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import TipoExameApi from '../../models/tipoExameApi';
import { ModalAddTipoExame, ModalEditarConsulta } from '../../components'; //arrumar modais para tipo exame

export default function TableTipoExame( props ) {
  const tipoExameApi = new TipoExameApi();
  const { tipoExame } = props;
  const [ aux, setAux ] = useState([]);
  const [ message, setMessage ] = useState('');
  const [ visible, setVisible ] = useState(false);
  const [ visibleEdit, setVisibleEdit ] = useState(false);
  const [ idConsulta, setIdConsulta ] = useState();
  const auth = localStorage.getItem("token-gerenciador-security");

  const columns = [
    { title: "Id", dataIndex: "key" }, 
    {
      title: "Tipo Exame",
      dataIndex: "tipoExame"
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade"
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (text, record) =>
        true ? (
          <div className="container-operacoes">
            <Popconfirm title="Tem certeza que deseja deletar?" onConfirm={() => handleDelete(record.key)}>
              <a className="bt-operacao">Delete</a>
            </Popconfirm>
            <Popconfirm title="Tem certeza que deseja Editar?" onConfirm={() => {setVisibleEdit(true); setIdConsulta(record.key);}}>
              <a className="bt-operacao">editar</a>
            </Popconfirm>
            <Link to={`/Exames/${record.key}`} className="bt-operacao">Visualizar</Link>
          </div>
        ) : null,
    },
  ];

  const handleDelete = evt => {
    tipoExameApi.removerTipoExame(evt, auth).then( resp => {
      if( resp.status === 200 ){
        setMessage(resp.data);
        setAux(aux.filter( (item) => item.key !== evt ) );
        setTimeout(() => {
          setMessage('');
        }, 2 * 1000 );
      }
    } );
  };

  useEffect(() => {
    let a = [];
    tipoExame.map( tipo => 
      a.push({
        "key": tipo.id,
        "tipoExame": `${tipo.nomeExame}`,
        "quantidade": tipo.quantidade ?`${tipo.quantidade}` : '--'
      })
    );
    setAux(a);
  },[tipoExame]);
  
  return (
      <div className='container-lista-consulta'>
        <span className='message'>{message}</span>
        <a onClick={() => {setVisible(true)}} className='bt-geral bt-cadastro-consulta' >
          Adicionar novo Tipo
        </a>
        {aux !== [] && <Table columns={columns} dataSource={aux} pagination={{ pageSize: 10 }}/>}
        <ModalAddTipoExame visibleAdd={visible} setVisibleAdd={setVisible}/>
        <ModalEditarConsulta idConsulta={idConsulta} visibleEdit={visibleEdit} setVisibleEdit={setVisibleEdit} />
      </div>
  )
}