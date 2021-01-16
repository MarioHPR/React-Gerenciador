import React, { useState, useEffect } from 'react';
import { Modal, Col, Row, Form, Button } from 'antd';
import { InputBasicoModal } from '../';
import ConsultaApi from '../../models/consultaApi';
import InstitucaoApi from '../../models/instituicaoApi';
import LocalidadeApi from '../../models/localidadeApi';
import ContatoApi from '../../models/contatoApi';
import './style.css';

export default function ModalEditarConsulta(props) {
  const [form] = Form.useForm();
  const {visibleEdit, setVisibleEdit} = props;
  const { idConsulta } = props;
  const [ consulta, setConsulta ] = useState();
  const [ instituicao, setInstituicao ] = useState();
  const [ contato, setContato ] = useState();
  const [ localidade, setLocalidade ] = useState();

  const onReset = () => {
    form.resetFields();
  };

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const consultaApi = new ConsultaApi();
    const localidadeApi = new LocalidadeApi();
    const contatoApi = new ContatoApi();
    const instituicaoApi = new InstitucaoApi();
    consultaApi.buscarConsultaPorId( idConsulta, auth).then( resp => {
      if(resp.status === 200){
        setConsulta(resp.data);
        instituicaoApi.buscarInstituicaoPorId(resp.data.idInstituicao, auth).then( respInstituicao => {
          if( respInstituicao.status === 200 ){
              setInstituicao(respInstituicao.data);
              const requisicoes = [
                localidadeApi.buscarLocalidadePorId( respInstituicao.data.idLocalidade, auth ),
                contatoApi.buscarContatoPorId( respInstituicao.data.idContato, auth )
              ];

              Promise.all( requisicoes ).then(
                respostas => {
                  if( respostas[0].status === 200 && respostas[1].status === 200 ){
                    setLocalidade(respostas[0].data);
                    setContato(respostas[1].data);
                  }
                }
              );
          }
        });
      }
    } );
  
  },[idConsulta]);

  const onFinish = values => {
    const auth = localStorage.getItem("token-gerenciador-security");
    const consultaApi = new ConsultaApi();
    consultaApi.editarConsulta(idConsulta, {
      dataConsulta: values.dataConsulta,
      diagnostico: values.diagnostico,
      nomeMedico: values.nomeMedico,
      prescricao: values.prescricao,
      idInstituicao: instituicao.id,
      linkImage: "" }, auth).then( resp => { 
        if(resp.status === 200){
         // resp => resp.status === 200 ? history.push('/consultas') : ''
        } } )
  }

  return (
    <> 
      
      <Modal title="Dados da Consulta Para Edição" visible={visibleEdit} onOk={() => setVisibleEdit(false)}
        onCancel={() => setVisibleEdit(false)} className='container-modal-editar' >
        { (consulta && instituicao && localidade && contato) &&
          <>
            <Form form={ form } name="validate_other" onFinish={onFinish} initialValues={consulta.nomeMedico} >
              <Row >
                <InputBasicoModal tipo='text' span={12} label='Médico' conteudo={consulta.nomeMedico} name={'nomeMedico'} />
                <InputBasicoModal tipo='date' span={12} label='Data consulta' conteudo={consulta.dataConsulta.slice(0,10)} name={'dataConsulta'} />
                <InputBasicoModal tipo='text' span={12} label='Diagnóstico' conteudo={consulta.diagnostico} name={'diagnostico'} />
                <InputBasicoModal tipo='text' span={12} label='Prescrição' conteudo={consulta.prescricao} name={'prescricao'} />
                
                <Col xs={{span:24}} className='campoModal'>
                  <Row>
                    <Col xs={{span:24}}>
                      <h2>Dados Instituição:</h2>
                      <Row className="margin-bottom">
                        <InputBasicoModal tipo='text' span={24} label='Nome Instituição' conteudo={instituicao.nome} name={'nomeInstituicao'} />
                        <InputBasicoModal tipo='text' span={24} md={12} lg={5} label='Cidade' conteudo={localidade.cidade} name={'cidade'} />
                        <InputBasicoModal tipo='text' span={24} md={12} lg={5} label='Cep' conteudo={localidade.cep} name={'cep'} />
                        <InputBasicoModal tipo='text' span={24} md={12} lg={5} label='Bairro' conteudo={localidade.bairro} name={'bairro'} />
                        <InputBasicoModal tipo='text' span={24} md={12} lg={5} label='Rua' conteudo={localidade.rua} name={'rua'} />
                        <InputBasicoModal tipo='text' span={24} md={12} lg={4} label='Numero' conteudo={localidade.numero} name={'numero'} />
                      </Row>
                    </Col>
                    <Col xs={{span:24}} className="margin-bottom">
                      <h2>Contatos da Instituição:</h2>
                      <Row>
                        <InputBasicoModal tipo='text' span={24} md={12} label='Contato 1' conteudo={contato.contatoUm} name={'contatoUm'}/>
                        <InputBasicoModal tipo='text' span={24} md={12} label='Contato 2' conteudo={contato.contatoDois} name={'contatoDois'}/>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
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
          </>
        }
      </Modal>
    </>
  );
};