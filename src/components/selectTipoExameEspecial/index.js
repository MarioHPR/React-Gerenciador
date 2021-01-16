import React, { useState, useEffect } from 'react';
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TipoExameApi from '../../models/tipoExameApi';
import './style.css';
import { Link } from '@material-ui/core';
import {Form} from 'antd';
export default function SelectTipoExameEspecial ( props ) {

  const { Option } = Select;
  const [ tipoExame, setTipoExame ] = useState([]);
  const [name, setName] = useState('');

  useEffect( () => {
    let aux = [];
    const tipoExameApi = new TipoExameApi();
    tipoExameApi.buscarTipoExame(localStorage.getItem("token-gerenciador-security")).then( resp => {
      resp.map( tipo => aux.push(tipo.nomeExame) );
      setTipoExame(aux);
    } );
  },[] );

  const onNameChange = event => {
    setName(event.target.value);
  };

  const addItem = () => {
    if(name !== '') {
      let aux = tipoExame;
      aux.push(name);
      setTipoExame( aux );
      setName('');
    }
  };

  return (
    <div className='centralizador-div espacamento-left'>
      <label>Tipo: </label>
      <Form.Item name="tipoExame" hasFeedback
            rules={ [ { required: true, message: 'Selecione uma tipo de exame!' } ] }
      >
        <Select
          name='tipoExame'
          className='select-tipo-exame'
          placeholder="Exemplo: Raio X, Hemograma..."
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div className='div-add-item'>
                <Input className='input-add-item' value={ name } placeholder='Exemplo: Raio X, Hemograma...' onChange={onNameChange} />
                <Link
                  className='link-add-item'
                  onClick={addItem}
                >
                  <PlusOutlined /> Add novo
                </Link>
              </div>
            </div>
          )}
        >
          { tipoExame && tipoExame.map( item => ( <Option key={item}>{item}</Option> ) ) }
        </Select>
      </Form.Item>
    </div>
  );
}