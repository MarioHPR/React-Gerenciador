import React, { useState, useEffect } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import FormularioDadosBasicos from '../formDadosBasicos';
import ConsultaApi from '../../models/consultaApi';
import InstituicaoApi from '../../models/instituicaoApi';
import ArquivoApi from '../../models/arquivoApi';
import './style.css';
import TextArea from 'antd/lib/input/TextArea';

export default function ModalAddConsulta(props) {
  const [form] = Form.useForm();
  const {visibleAdd, setVisibleAdd, setAtualizaTela, atualizaTela} = props;
  const [ flg, setFlg ] = useState(false);
  const [ dataConsulta, setDataConsulta ] = useState('');
  const [ instituicao, setInstituicao ] = useState();
  const [ instituicoes, setInstituicoes ] = useState([]);
  const [ doc, setDoc ] = useState(0);
  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const instituicaoApi = new InstituicaoApi();
    instituicaoApi.buscarInstituicoes(auth).then( resp => setInstituicoes(resp) );
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela] );

  const onReset = () => form.resetFields();

  const onFinish = values => {
    const auth = localStorage.getItem("token-gerenciador-security");
    const arquivoApi = new ArquivoApi();
    arquivoApi.uploadArquivo(doc, auth).then( resp =>{
      if(resp.status === 200){
        setDoc(resp.data);
      }
    });
    const { bairro, cep, cidade, rua, contatoDois, contatoUm, nomeinstituicao } = values;
    const { diagnostico, prescricaoMedica, nomeMedico } = values;
    if(values.numero && values.numero.includes('_')){
      values.numero = values.numero.replaceAll("_", "");
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
          "numero": numero !== undefined ? numero : 0,
          "rua": rua || ''
        },
        "id": (bairro && flg) ? 0 : instituicao.id || 0,
        "nome": nomeinstituicao || ''
      },
      "dataConsulta": dataConsulta || '',
      "diagnostico": diagnostico || '',
      "prescricao": prescricaoMedica || '',
      "nomeMedico": nomeMedico || '',
      "idArquivo": doc || 0
    };
    
    const consultaApi = new ConsultaApi();
    consultaApi.criarConsulta( request, auth ).then( resp => { 
      if(resp.status === 200){
        let aux = atualizaTela + 1;
        setAtualizaTela(aux);
        setVisibleAdd(false)
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
      <Modal title="Adicionar dados da consulta" visible={visibleAdd} onOk={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleAdd(false);onReset(); flg && setFlg(!flg)}} className='container-modal-editar' okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }} >
          <>{ instituicoes && 
            <Form form={ form } name="validate_other" onFinish={onFinish} initialValues='' >
              <>
                <div className="dados-instituicao">
                  <div className='espacamento-top separador-elemento' >
                    <div className='div-comum-esquerda'>
                      <Form.Item name='nomeMedico' label='Médico:'
                        rules={ [ { required: true, message: `Diagnóstico é Obrigatório!` } ] }
                      >
                        <input className='input-modal margin-bottom ajuste-input-responsivo' type='text' value={"Nome medico"} />
                      </Form.Item>
                    </div>
                    <div className='div-comum-direita'>
                      <Form.Item name='dataConsulta' label='Data Consulta:'
                        rules={ [ { required: true, message: `Data da consulta é Obrigatório!` } ] }
                      >
                        {
                          <input className='input-modal margin-bottom ajuste-input-responsivo' type='date' value={'dataExame'} onChange={ evt => setDataConsulta(evt.target.value)}/>
                        }
                      </Form.Item>
                    </div>
                  </div>
                  <select className='select-instituicoes' disabled={flg} onChange={evt => executaAcao(evt.target.value)}>
                    <option value=""disabled selected>Selecione uma instituição!</option>
                    <option key={`odefault${1}`} value={0}>+ adicionar nova instituição</option>
                    {
                      instituicoes.map( inst => <option key={`op${inst.id}`} value={inst.id}>{inst.nome}</option>)
                    }
                  </select>
                  <div id="" className={!flg ? 'mostrar-form' : 'esconder-form'}>
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
                    rules={ [ { required: true, message: `Diagnóstico é Obrigatório!` } ] }
                  >
                    <input className='input-modal align-center'/>
                  </Form.Item>
                  <Form.Item name='prescricaoMedica' label='Prescrição médica:'
                    rules={ [ { required: true, message: `Prescrição médica: Obrigatório!` } ] }
                  >
                    <TextArea rows={5} />
                  </Form.Item>

                  <input type='file' onChange={evt => setDoc(evt.target.files[0])} />
                  <>
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
                  </>
                 </div>
              </>
            </Form>
          }</> 
      </Modal>
    </>
  );
};