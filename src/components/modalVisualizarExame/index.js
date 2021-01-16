import React, { useState, useEffect } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import { InputBasicoModal, SelectInstituicao, SelectTipoExameEspecial, CampoUpload } from '..';
import CamposExame from '../camposExame';
import TipoExameApi from '../../models/tipoExameApi';
import FormularioDadosBasicos from '../formDadosBasicos';
import ExameApi from '../../models/exameApi';

export default function ModalExame(props) {
  const [form] = Form.useForm();
  const {visibleModal, setVisibleModal, idExame} = props;
  const [ flg, setFlg ] = useState(false);
  const [ exame, setExame ] = useState();

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const exameApi = new ExameApi();
    exameApi.buscarExamePorId( idExame, auth).then( resp => {
      if(resp.status === 200){
        setExame(resp);
      }
    } );
  },[idExame] );

  const onReset = () => {
    form.resetFields();
  };

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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
    console.log(values)
    const auth = localStorage.getItem("token-gerenciador-security");
    const tipoExameApi = new TipoExameApi();
    values.dataExame = formataData(values.dataExame);
    tipoExameApi.criarTipoExame( values, auth).then( resp => { 
        if(resp.status === 200){
          var urlAtual = window.location.href;
          window.location.href=urlAtual;
        } } )
  }

  return (
    <> 
      
      <Modal title="Visualização dos dados do exame" visible={visibleModal} onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)} className='container-modal-editar' >
          <>{ exame &&
            <Form form={ form } name="validate_other" onFinish={onFinish} initialValues='' >
              <Row className='espacamento-top diminuir-botton' >
                <Col span={12}>
                  <h6>{exame.id}</h6>
                  <SelectTipoExameEspecial span={24} />
                </Col>
                <Col span={12}>
                  <InputBasicoModal tipo='date' span={24} label='Data do exame' name={'dataExame'} />
                </Col>
              </Row>
              <SelectInstituicao flg={flg} setFlg={setFlg} />
              <div id="form-basic" className={flg ? 'mostrar-form' : 'esconder-form'}>
                <FormularioDadosBasicos flg={flg} setFlg={setFlg} />
              </div>
              <CamposExame />
              <CampoUpload destino='do exame' normFile={normFile} classe="div-arq" />
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button className="btn-cadastrar" type="primary" htmlType="submit">
                  Inserir Tipo Exame
                </Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType="button" onClick={ onReset } className='botao-form-itens'>
                  Limpar
                </Button>
              </Form.Item>
            </Form>
          }</>
      </Modal>
    </>
  );
};