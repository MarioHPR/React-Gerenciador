import React, { useState, useEffect } from 'react';
import { Form, Select,Col } from 'antd';
import TipoExameApi from '../../models/tipoExameApi';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
export default function SelectTipoExame ( props ) {
  const { Option } = Select;
  const { md, lg, span } = props;
  const [ tipoExame, setTipoExame ] = useState([]);
  const [ tipoNovo, setTipoNovo ] = useState([]);

  useEffect( () => {
    const tipoExameApi = new TipoExameApi();
    tipoExameApi.buscarTipoExame(localStorage.getItem("token-gerenciador-security")).then( resp => setTipoExame(resp) );
  },[] );

  return (
    <>
      <Link className="bt-add-inst" to="/instituicao">
        <span><span className="sibolo-add">+</span> adicionar modalidade</span>
      </Link>
      {tipoExame &&
        <Col xs={{span:span}} md={{span:md || span}} lg={{span:lg || md || span}} className="coluna-tipo"> 
          <Form.Item name="idInstituicao" label="Tipo Exame" hasFeedback className="campoModal"
            rules={ [ { required: true, message: 'Selecione uma tipo de exame!' } ] }
          >
            
          
              <Select placeholder="Selecione uma exame!" name='idInstituicao'>
                {
                  tipoExame.map( tipoExame => {
                    return <Option key={`exame${tipoExame.id}`} value={tipoExame.id}>{tipoExame.nomeExame}</Option>
                  })
                }
                <Option key={`exameAdd`} value={tipoNovo}><input /></Option>
              </Select>
          </Form.Item>
        </Col>
      }
    </>
  )
}
