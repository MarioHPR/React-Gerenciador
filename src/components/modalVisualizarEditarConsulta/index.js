import React, { useState, useEffect } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import FormularioDadosBasicos from '../formDadosBasicos';
import ConsultaApi from '../../models/consultaApi';
import ArquivoApi from '../../models/arquivoApi';
import InstituicaoApi from '../../models/instituicaoApi';
import './style.css';
import TextArea from 'antd/lib/input/TextArea';

export default function ModalVisualizarEditarConsulta(props) {
  const [form] = Form.useForm();
  const {visibleEdit, setVisibleEdit, setAtualizaTela, atualizaTela, idConsulta, flgEdit} = props;
  const [ flg, setFlg ] = useState(false);
  const [ consulta, setConsulta ] = useState();
  const [ instituicao, setInstituicao ] = useState();
  const [ instituicoes, setInstituicoes ] = useState([]);
  const [ atualizaInterna, setAtualizaInterna ] = useState(0);
  const [ doc, setDoc ] = useState(0);
  const [ urlDoc, setUrlDoc ] = useState();

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const instituicaoApi = new InstituicaoApi();
    instituicaoApi.buscarInstituicoes(auth).then( resp => setInstituicoes(resp) );
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela, idConsulta] );

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const consultaApi = new ConsultaApi();
    consultaApi.buscarConsultaPorId( idConsulta, auth).then( resp => {
      setConsulta(resp.data);
      setInstituicao(resp.data.dadosInstituicao);
      onReset();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela, idConsulta, atualizaInterna]);

  const onReset = () => {
    form.resetFields();
  };

  const downloadArquivo = () => {
    const auth = localStorage.getItem("token-gerenciador-security");
    const arquivoApi = new ArquivoApi();
    return arquivoApi.downloadArquivo(consulta.id, auth).then( resposta => {
      setDoc(resposta.data)
      setUrlDoc(resposta.config.url)
    })
  }

  const onFinish = values => {
    const { bairro, cep, cidade, rua, contatoDois, contatoUm, nomeinstituicao } = values;
    const { diagnostico, prescricao, nomeMedico, dataConsulta } = consulta;
    const idinstituicao = instituicao.id;
    const auth = localStorage.getItem("token-gerenciador-security");
    const arquivoApi = new ArquivoApi();
    arquivoApi.uploadArquivo(doc, auth).then( resp =>{
      if(resp.status === 200){
        setDoc(resp.data);
      }
    });
    if(values.numero && values.numero.includes('_')){
      values.numero = numero.replaceAll("_", "");
    }
    const { numero } = values;
    const request = {
      "dadosInstituicao": {
        "contatoDTO": {
          "contatoDois": contatoDois || '',
          "contatoUm": contatoUm || '',
          "id": 0
        },
        "enderecoDTO": {
          "bairro": bairro || '',
          "cep": cep || '',
          "cidade": cidade || '',
          "id": 0,
          "numero": numero || 0,
          "rua": rua || ''
        },
        "id": flg ? 0 : idinstituicao || 0,
        "nome": nomeinstituicao || ''
      },
      "dataConsulta": dataConsulta || '',
      "idArquivo": doc || 0,
      "diagnostico": diagnostico || '',
      "prescricao": prescricao || '',
      "nomeMedico": nomeMedico || ''
    };
  console.log("//////////////")
  console.log(request)
  console.log("//////////////")
  const consultaApi = new ConsultaApi();
  consultaApi.editarConsulta( idConsulta, request, auth ).then( resp => { 
      if(resp.status === 200){
        let aux = atualizaTela + 1;
        setAtualizaTela(aux);
        setVisibleEdit(false);
        setAtualizaInterna(atualizaInterna + 1);
        flg && setFlg(!flg);
        onReset();
      } } );
  }

  const executaAcao = ( aux ) => {
    if( parseInt(aux) === 0 ){
      setFlg(!flg);
    } else {
      let auxInstituicao = instituicoes.find( inst => inst.id === parseInt(aux) );
      setInstituicao(auxInstituicao);
    } 
  }
  
  return (
    <> 
      <Modal title="Dados atuais da consulta" visible={visibleEdit} onOk={() => {setVisibleEdit(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleEdit(false);onReset(); flg && setFlg(!flg)}} className='container-modal-editar' okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: flgEdit === 1 ? true : false }} >
          <>{ consulta && 
            <Form form={ form } name="validate_other" onFinish={onFinish} initialValues='' >
              <>{consulta &&
                <div className="dados-instituicao">
                  <div className='espacamento-top separador-elemento' >
                    <div className='div-comum-esquerda'>
                      <Form.Item name='nomeMedico' label='Médico:'
                        rules={ [ { required: consulta.nomeMedico.length > 0 ? false : true, message: `Diagnóstico é Obrigatório!` } ] }
                      >
                        <input className='input-modal margin-bottom ajuste-input-responsivo' type='text' onChange={evt => consulta.nomeMedico = evt.target.value} defaultValue={consulta.nomeMedico} readOnly={flgEdit === 1 ? "" : "readonly"}/>
                      </Form.Item> 
                    </div>
                    <div className='div-comum-direita'>
                      <Form.Item name='dataConsulta' label='Data Consulta:'
                        rules={ [ { required: consulta.dataConsulta.length > 0 ? false : true, message: `Data da consulta é Obrigatório!` } ] }
                      >
                        {
                          <input className='input-modal margin-bottom ajuste-input-responsivo' type='date' defaultValue={consulta.dataConsulta} onChange={ evt => consulta.dataConsulta = evt.target.value} readOnly={flgEdit === 1 ? "" : "readonly"}/>
                        }
                      </Form.Item>
                    </div>
                  </div>
                  { flgEdit === 1 &&
                    <select className='select-instituicoes' placeholder="Selecione uma instituição!" disabled={flg} onClick={evt => executaAcao(evt.target.value)} defaultValue={consulta.dadosInstituicao.id} >
                      <option key={`odefault${1}`} value={0}>+ adicionar nova instituição</option>
                      {
                        instituicoes.map( inst => <option key={`op${inst.id}`} value={inst.id}>{inst.nome}</option>)
                      }
                    </select>
                  }
                  <div id="" className={flgEdit >= 0 ? 'mostrar-form' : 'esconder-form'}>
                    <h3>Dados da Instituição</h3>
                    { instituicao &&
                      <Row>
                        <Col span={12} className='dados-parte-um'>
                          <p>Instituição: {instituicao.nome}</p>
                          <p>Contato 1: {instituicao.contatoDTO.contatoUm}</p>
                        </Col>
                        <Col span={12} className='dados-parte-dois'>
                          <p>Cidade: {instituicao.enderecoDTO.cidade}</p>
                          <p>Contato 2: {instituicao.contatoDTO.contatoDois}</p>
                        </Col>
                      </Row>
                    }
                  </div>
                
                  <div id="" className={flg ? 'mostrar-form' : 'esconder-form'}>
                    <FormularioDadosBasicos flg={flg} setFlg={setFlg} />
                  </div>
                  
                  <Form.Item name='diagnostico' label='Diagnóstico:'
                    rules={ [ { required: consulta.diagnostico.length === 0 ? true : false, message: `Diagnóstico é Obrigatório!` } ] }
                  >
                    <input className='input-modal align-center' onChange={evt => consulta.diagnostico = evt.target.value} defaultValue={consulta.diagnostico} readOnly={flgEdit === 1 ? "" : "readonly"}/>
                  </Form.Item>
                  <Form.Item name='prescricaoMedica' label='Prescrição médica:'
                    rules={ [ { required: consulta.prescricao.length === 0 ? true : false, message: `Prescrição médica: Obrigatório!` } ] }
                  >
                    <TextArea rows={5}  onChange={evt => consulta.prescricao = evt.target.value} defaultValue={consulta.prescricao} readOnly={flgEdit === 1 ? "" : "readonly"} />
                  </Form.Item>

                  <input type='file' onChange={evt => setDoc(evt.target.files[0])} />
                  <a onClick={()=>downloadArquivo} download={()=>downloadArquivo} >Download do arquivo</a>
                  <>{ flgEdit === 1 &&
                    <Row>
                      <Col xs={{span:24}} md={{span:12}}>
                        <Form.Item>
                          <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                            <span className='color-white'>Adicionar Consulta</span>
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col xs={{span:24}} md={{span:12}}>
                        <Form.Item >
                          <Button htmlType="button" onClick={ onReset } className='botao-form-itens tamanho-total'>
                            Limpar
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  }</>
                </div>
              }</>
            </Form>
          }</>
      </Modal>
    </>
  );
};