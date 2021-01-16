import React, { useEffect, useState } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import { InputBasicoModal, SelectInstituicao, SelectTipoExameEspecial, CampoUpload } from '../';
import CamposExame from '../camposExame';
import TipoExameApi from '../../models/tipoExameApi';
import FormularioDadosBasicos from '../formDadosBasicos';

export default function ModalAddTipoExame(props) {
  const [form] = Form.useForm();
  const {visibleAdd, setVisibleAdd, setAtualizaTela, atualizaTela } = props;
  const [ flg, setFlg ] = useState(false);

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => onReset, [atualizaTela] );

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = values => {
    const auth = localStorage.getItem("token-gerenciador-security");
    const tipoExameApi = new TipoExameApi();
    //values.dataExame = formataData(values.dataExame);
    tipoExameApi.criarTipoExame( values, auth).then( resp => { 
        if(resp.status === 200){
          let aux = atualizaTela + 1;
          setAtualizaTela(aux);
          setVisibleAdd(false);
        } } )
  }

  return (
    <> 
      
      <Modal title="Dados Tipo Exame" visible={visibleAdd} onOk={() => setVisibleAdd(false)}
        onCancel={() => setVisibleAdd(false)} className='container-modal-editar' >
          <>
            <Form form={ form } name="validate_other" onFinish={onFinish} initialValues='' >
              <Row className='espacamento-top diminuir-botton' >
                <Col span={12}>
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
          </>
      </Modal>
    </>
  );
};