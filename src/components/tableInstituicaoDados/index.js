import React, { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import './style.css';
import { ModalAddInstituicao, ModalVisualizarEditarInstituicao } from '..';

import { DeleteOutlined, EditOutlined ,EyeOutlined } from '@ant-design/icons';

export default function TableInstituicaoDados( props ) {
  const { instituicoes, atualizaTela, setAtualizaTela, handleDelete } = props;
  const { aux, setAux } = props;

  const [ visibleEdit, setVisibleEdit ] = useState(false);
  const [ visibleAdd, setVisibleAdd ] = useState(false);
  const [ idInstituicao, setIdInstituicao ] = useState();
  const [ flgEdit, setFlgEdit ] = useState(0);

  const columns = [
    { title: "Id", dataIndex: "key" }, 
    {
      title: "Nome Instituição",
      dataIndex: "nome"
    },
    {
      title: "Cidade",
      dataIndex: "cidade"
    },
    {
      title: "Contato principal",
      dataIndex: "contato"
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
            <a href='#/' key={`edit${record.key}`} title="editar" onClick={() => handleEditarVisualizar(record.key,1)} className="bt-operacao"><EditOutlined /></a>
            <a href='#/' key={`visu${record.key}`} title="visualizar" onClick={() => handleEditarVisualizar(record.key,0)} className="bt-operacao"><EyeOutlined /></a>
          </div>
        ) : null,
    },
  ];

  const handleEditarVisualizar = (evt, flg) => {
    setVisibleEdit(true);
    setIdInstituicao(evt);
    setFlgEdit(flg);  
  };
  

  useEffect(() => {
    let a = [];
    instituicoes.map( instituicoes => 
      a.push({
        "key": `${instituicoes.id}`,
        "nome": `${instituicoes.nome}`,
        "cidade": `${instituicoes.enderecoDTO.cidade}`,
        "contato": `${instituicoes.contatoDTO.contatoUm}`
      })
    );
    setAux(a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[instituicoes, atualizaTela]);
  
  return (
    <div className='container-lista-consulta'>
      <a key='add' href='#/' onClick={() => {setVisibleAdd(true)}} className='bt-geral bt-cadastro-consulta' >
        Adicionar instituição
      </a>
      {aux !== [] && <Table columns={columns} dataSource={aux} pagination={{ pageSize: 7 }}/>}
      <ModalAddInstituicao atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />
      <ModalVisualizarEditarInstituicao atualizaTela={atualizaTela} setAtualizaTela={setAtualizaTela} idInstituicao={idInstituicao} visibleEdit={visibleEdit} setVisibleEdit={setVisibleEdit} flgEdit={flgEdit} />
    </div>
  )
}