import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import InstituicaoApi from '../../models/instituicaoApi';
import './style.css';

function SelectInstituicao ( props ) {
  const { Option } = Select;
  const { flg, setFlg } = props;
  const [ instituicoes, setInstituicoes ] = useState([]);

  const mostrarDados = () => {
    setFlg(!flg);
  }

  useEffect( () => {
    const instituicaoApi = new InstituicaoApi();
    instituicaoApi.buscarInstituicoes(localStorage.getItem("token-gerenciador-security")).then( resp => setInstituicoes(resp) );
  },[] );

  return (
    <>
      {instituicoes && 
        <Form.Item name="select" label="Instituição" hasFeedback
          rules={ [ { required: !flg, message: 'Selecione uma instituição!' } ] }
        >
          <Select placeholder="Selecione uma instituição!" disabled={flg}>
            <Option key={`odefault${1}`} value={() => setFlg(!flg)}>+ adicionar nova instituição</Option>
            {
              instituicoes.map( instituicao => {
                return <Option key={`op${instituicao.id}`} value={instituicao.id}>{instituicao.nome}</Option>
              })
            }
          </Select>
        </Form.Item>
      }
    </>
  )
}

export default SelectInstituicao;