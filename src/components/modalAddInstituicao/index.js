import React, { useState } from 'react';
import { Modal, Button, Divider, Col, Row, Form, Input } from 'antd';
import InstitucaoApi from '../../models/instituicaoApi';
import InputMask from 'react-input-mask';

const instituicaoApi = new InstitucaoApi();
const auth = localStorage.getItem("token-gerenciador-security");

export default function ModalAddInstituicao(props) {
  const [form] = Form.useForm();
  const {visibleAdd, setVisibleAdd, atualizaTela, setAtualizaTela } = props;
  const [ flg, setFlg ] = useState(false);
  
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = values => {
    
    if(values.numero.match(/_/)){
      values.numero = values.numero.replaceAll("_", "");
    }
    instituicaoApi.criarInstituicao( values, auth).then( resp => {
      if(resp.status === 200){
        onReset();
        let aux = atualizaTela + 1;
        setAtualizaTela(aux);
        setVisibleAdd(false);
      }
    } );
  }

  return (
    <> 
      <Modal title="Insira os dados referente a instituição" visible={visibleAdd} onOk={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        className='container-modal-editar' okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}>
          <>
            <Form useForm={ form } name="validate_other" onFinish={onFinish} >
              <div className="dados-instituicao">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="nome" label="Nome"
                      rules={ [ { required: true, message: `Nome da instituição é obrigatório!` } ] }
                    >
                      <Input placeholder="Nome instituição" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="cidade" label="Cidade"
                      rules={ [ { required: true, message: `Cidade é obrigatório!` } ] }
                    >
                      <Input placeholder="Cidade" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="cep" label="Cep"
                      rules={ [ { required: true, message: `Cep é obrigatório!` } ] }
                    >     
                      <InputMask className="input-com-mascara" mask="99999-999"
                                type='text' placeholder="Insira Cep"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="bairro" label="Bairro"
                      rules={ [ { required: true, message: `Bairro é obrigatório!` } ] }
                    >     
                      <Input placeholder="Bairro" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="rua" label="Rua"
                      rules={ [ { required: true, message: `Rua é obrigatório!` } ] }
                    >
                      <Input placeholder="Rua" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="numero" label="Numero"
                      rules={ [ { required: true, message: `Numero é obrigatório!` } ] }
                    >     
                      <InputMask className="input-com-mascara" mask="9999"
                                type='text' placeholder="Numero"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <p className="site-description-item-profile-p">Contatos</p>
                <Row>
                  <Col span={12}>
                    <Form.Item name="contatoUm" label="Contato primário"
                      rules={ [ { required: true, message: `Contato primário é obrigatório!` } ] }
                    >
                      <InputMask
                        className="input-com-mascara"
                        mask="(99) 9 9999-9999"
                        type='text'
                        placeholder="Insira seu contato primário"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="contatoDois" label="Contato secundário"
                      rules={ [ { required: true, message: `Contato secundário é obrigatório!` } ] }
                    >
                      <InputMask
                        className="input-com-mascara"
                        mask="(99) 9 9999-9999"
                        type='text'
                        placeholder="Insira seu contato secundário"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col xs={{span:24}}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                        <span className='color-white'>Inserir instituição</span>
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Form>
          </>
      </Modal>
    </>
  );
};