import React from 'react';
import '../../pages/login/login.css'
import { Button, Form } from 'antd';
import { Lista, CampoUpload, SelectInstituicao, InputFormItem } from '../../components';
import TextArea from 'antd/lib/input/TextArea';
import './style.css';
import { useState } from 'react';
import ConsultaApi from '../../models/consultaApi';

import {  useHistory } from 'react-router-dom';

export default function FormularioConsulta( props ) {
  const history = useHistory();
  const [form] = Form.useForm();
  const [ link, setLink  ] = useState('');

  const onReset = () => {
    form.resetFields();
  };

  const linha = ( item, i ) => {
    return (
      <div key={ `lb-bt${i}`}>
        <InputFormItem name={item.name} nome={item.nome} titulo={item.titulo} key={i} classe={item.classe}
          classContainer={'container-inputs'} tipo={ item.tipo } dica={ item.dica } />
      </div>
    )
  }

  const formataData = data => {
    let formatData;
    console.log(data)
    let dataAux = new Date(data.replaceAll('-','/'));
    formatData = "" + dataAux.toISOString();
    formatData = formatData.slice(0,-1);
    console.log(formatData)
    return formatData;
  };

  const onFinish = values => {
    let data = formataData(values.dataCons);
    const auth = localStorage.getItem("token-gerenciador-security");
    const consultaApi = new ConsultaApi();
    consultaApi.criarConsulta({
                                dataConsulta: data,
                                diagnostico: values.diagnostic,
                                nomeMedico: values.nomeMed,
                                prescricao: values.prescricaoMedica,
                                idInstituicao: values.select,
                                linkImage: "" }, auth).then( resp => resp.status === 200 ? history.push('/consultas') : '' );
  };

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (

    <div className="form-consulta">
      <h2 className="titulo">Adicione uma nova consulta:</h2>
      
      <Form form={ form } name="validate_other" onFinish={onFinish} >

        <Lista
          className="container-inputs"
          dados={[
            { titulo: 'Nome do Médico:', name:'nomeMed', classe: 'input-padrao tag-tamanho-total input-consulta', tipo:'text', dica: 'Ex: Dr Fulano'  },
            { titulo: 'Data Consulta:', name: 'dataCons', classe: 'input-padrao tag-tamanho-total input-consulta', tipo:'date', dica: '01/01/2020'  },
            { titulo: 'Diagnóstico:', name: 'diagnostic', classe: 'input-padrao tag-tamanho-total input-consulta', tipo:'text', dica: 'Ex: Gripe'  },
          ] }
          funcao={ ( item, i ) => linha( item, i ) }
        />
        <Form.Item name='prescricaoMedica' label='Prescrição médica:'
          rules={ [ { required: true, message: `Prescrição médica: Obrigatório!` } ] }
        >
          <TextArea rows={5} />
        </Form.Item>
        
        <SelectInstituicao />
        
        <CampoUpload destino='da consulta' normFile={normFile} classe="div-arq" />

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className="btn-cadastrar" type="primary" htmlType="submit">
            Inserir consulta
          </Button>
        </Form.Item>
        <Form.Item>
              <Button htmlType="button" onClick={ onReset } className='botao-form-itens'>
                Limpar
              </Button>
            </Form.Item>
        </Form>
      
    </div>
  )
}