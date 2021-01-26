import React, { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
import ConsultaApi from '../../models/consultaApi';
import { ModalVisualizacaoConsulta, ModalEditarConsulta, ModalAddConsulta } from '../../components';

export default function TableDados( props ) {
  const { consultas, atualizaTela, setAtualizaTela } = props;
  const [ aux, setAux ] = useState([]);
  const [ message, setMessage ] = useState('');
  const consultaApi = new ConsultaApi();
  const [ visible, setVisible ] = useState(false);
  const [ visibleEdit, setVisibleEdit ] = useState(false);
  const [ visibleAdd, setVisibleAdd ] = useState(false);
  const [ idConsulta, setIdConsulta ] = useState();
  const auth = localStorage.getItem("token-gerenciador-security");

  const columns = [
    { title: "Id", dataIndex: "key" }, 
    {
      title: "Diagnostico",
      dataIndex: "diagnostico"
    },
    {
      title: "Medico",
      dataIndex: "nomeMedico"
    },
    {
      title: "Data",
      dataIndex: "dataConsulta"
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (text, record) =>
        true ? (
          <div className="container-operacoes">
            <Popconfirm title="Tem certeza que deseja deletar?" onConfirm={() => handleDelete(record.key)}>
              <a href='#/' className="bt-operacao">Delete</a>
            </Popconfirm>
            <a href='#/' onClick={() => {setVisibleEdit(true); setIdConsulta(record.key);}} className="bt-operacao">editar</a>
            <a href='#/' onClick={() => {setVisible(true); setIdConsulta(record.key);}} className="bt-operacao">Visualizar</a>
          </div>
        ) : null,
    },
  ];

  const handleDelete = evt => {
    consultaApi.removerConsulta(evt, auth).then( resp => {
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
    consultas.map( consulta => 
      a.push({
        "key": consulta.id,
        "diagnostico": `${consulta.diagnostico}`,
        "nomeMedico": `${consulta.nomeMedico}`,
        "dataConsulta": `${new Date(consulta.dataConsulta).toLocaleDateString()}`
      })
    );
    setAux(a);
  },[consultas, atualizaTela]);
  
  return (
      <div className='container-lista-consulta'>
        <span className='message'>{message}</span>
        <a  href='#/' onClick={() => {setVisibleAdd(true)}} className='bt-geral bt-cadastro-consulta' >
          Adicionar Consulta
        </a>
        {aux !== [] && <Table columns={columns} dataSource={aux} pagination={{ pageSize: 10 }}/>}
        <ModalVisualizacaoConsulta idConsulta={idConsulta} visible={visible} setVisible={setVisible}/>
        <ModalEditarConsulta idConsulta={idConsulta} visibleEdit={visibleEdit} setVisibleEdit={setVisibleEdit} />
        <ModalAddConsulta atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />
      </div>
  )
}