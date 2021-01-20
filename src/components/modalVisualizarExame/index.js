import React, { useState, useEffect } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import { CampoUpload } from '..';
import CamposExame from '../camposExame';
import FormularioDadosBasicos from '../formDadosBasicos';
import ExameApi from '../../models/exameApi';
import InstituicaoApi from '../../models/instituicaoApi';
import './style.css';
import { WarningOutlined } from '@material-ui/icons';

export default function ModalExame(props) {
  const [form] = Form.useForm();
  const {visibleModal, setVisibleModal, idExame, editarVisualizar} = props;
  const [ flg, setFlg ] = useState(false);
  const [ exame, setExame ] = useState();
  const [ tipoExame, setTipoExame ] = useState('');
  const [ dataExame, setDataExame ] = useState('');
  const [ instituicao, setInstituicao ] = useState();
  const [ parametros, setParametros ] = useState([]);
  const [ instituicoes, setInstituicoes ] = useState([]);

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const exameApi = new ExameApi();
    const instituicaoApi = new InstituicaoApi();
    instituicaoApi.buscarInstituicoes(localStorage.getItem("token-gerenciador-security")).then( resp => setInstituicoes(resp) );
    exameApi.buscarExamePorId( idExame, auth).then( resp => {
      if(resp.status === 200){
        setExame(resp.data);
        setTipoExame(resp.data.nomeExame);
        setDataExame(resp.data.dataExame);
        setInstituicao(resp.data.dadosInstituicao);
        setParametros(resp.data.parametros);
        console.log(instituicao)
        onReset();
      }
    } );
  },[idExame] );

  const onReset = () => form.resetFields();

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = values => {
    console.log(values)
    let aux = parametros;
    values.parametros.map( teste => {
      if(teste.campo !== undefined && teste.valor !== undefined)
        aux.push(teste);
      return null;
    });
    setParametros(aux);

    if( values.cidade !== undefined ) {// deu certo
      const { bairro, cep, cidade, contatosDois, contatoUm, nomeinstituicao, numero } = values;
      console.log(cidade)
    }
   /* const auth = localStorage.getItem("token-gerenciador-security");
    const tipoExameApi = new TipoExameApi();
    tipoExameApi.criarTipoExame( values, auth).then( resp => { 
        if(resp.status === 200){
          var urlAtual = window.location.href;
          window.location.href=urlAtual;
        } } )*/
  }

  const executaAcao = ( aux ) => {
    console.log(parseInt(aux))
    if( parseInt(aux) === 0 ){
      setFlg(!flg);
    } else {
      let auxInstituicao = instituicoes.find( inst => inst.id === parseInt(aux) );
      if( auxInstituicao.nome !== instituicao.nome )
        setInstituicao(auxInstituicao);
    } 
  }

  return (
    <> 
      <Modal title="Visualização dos dados do exame" visible={visibleModal} onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)} className='container-modal-editar' >
          <>{ exame && 
            <Form form={ form } name="validate_other" onFinish={onFinish} initialValues='' >
              <Row className='espacamento-top ' >
                <Col span={12}>
                  <label>Exame: </label>
                  <input className='input-modal margin-bottom' type='text' value={tipoExame} readOnly />
                </Col>
                <Col span={12}>
                  <label>Data: </label>
                  <input className='input-modal margin-bottom' type='date' value={dataExame} onChange={ evt => setDataExame(evt.target.value)}/>
                </Col>
              </Row>
              {
                instituicao && editarVisualizar === 1 ?
                  <>
                    <div className="dados-instituicao">
                      <select className='select-instituicoes' placeholder="Selecione uma instituição!" disabled={flg} onClick={evt => executaAcao(evt.target.value)}>
                        <option key={`odefault${1}`} value={0}>+ adicionar nova instituição</option>
                        {
                          instituicoes.length > 0 && instituicoes.map( inst => {
                            return inst.nome === instituicao.nome ? <option key={`op${inst.id}`} selected value={inst.id}>{inst.nome}</option> : <option key={`op${inst.id}`} value={inst.id}>{inst.nome}</option>
                          })
                        }
                      </select>
                      <div id="" className={!flg ? 'mostrar-form' : 'esconder-form'}>
                        <h3>Dados da Instituição</h3>
                        <Row>
                          <Col span={12} className='dados-parte-um'>
                            <p>Instituição: {instituicao.nome}</p>
                            <p>Cidade: {instituicao.enderecoDTO.cidade}</p>
                            <p>Rua: {instituicao.enderecoDTO.rua}</p>
                            <p>Contato 1: {instituicao.contatoDTO.contatoUm}</p>
                          </Col>
                          <Col span={12} className='dados-parte-dois'>
                            <p>Cep: {instituicao.enderecoDTO.cep}</p>
                            <p>Bairro: {instituicao.enderecoDTO.bairro}</p>
                            <p>N°: {instituicao.enderecoDTO.numero}</p>
                            <p>Contato 2: {instituicao.contatoDTO.contatoDois}</p>
                          </Col>
                        </Row>
                      </div>
                    
                      <div id="" className={flg ? 'mostrar-form' : 'esconder-form'}>
                        <FormularioDadosBasicos flg={flg} setFlg={setFlg} />
                        <h3>Dados do exame</h3>
                      </div>
                      
                      { parametros.length > 1 ?
                        <Row>
                          <Col span={12} className='dados-parte-um'>
                          {
                            exame.parametros.map( exame => exame.campo !== '' ? (
                              <Form.Item
                              label='Campo'
                              rules={ [ { required: true, message: `Valor é Obrigatório!` } ] }
                              >
                                <input className='input-modal margin-bottom' placeholder="Campo atributo" value={exame.campo} readOnly/>
                              </Form.Item>
                            ) : '')
                          }
                          </Col>
                          <Col span={12} className='dados-parte-dois'>
                          {
                            exame.parametros.map( exame => exame.valor !== '' ? (
                              <Form.Item
                              label='Valor'
                              rules={ [ { required: true, message: `Valor é Obrigatório!` } ] }
                              >
                                <input className='input-modal margin-bottom' placeholder="Campo atributo" value={exame.valor} />
                              </Form.Item>
                            ) : '')
                          }
                          </Col>
                        </Row>
                        : <span><WarningOutlined />Não há dados registrados neste exame!</span>
                        
                      }
                    </div>
                    <CamposExame />
                    <CampoUpload destino='do exame' normFile={normFile} classe="div-arq" />
                    <>
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
                  </>
                  </>
                :
                  <div className="dados-instituicao">
                    <h3>Dados da Instituição</h3>
                    <Row>
                      <Col span={12} className='dados-parte-um'>
                        <p>Instituição: {exame.dadosInstituicao.nome}</p>
                        <p>Cidade: {exame.dadosInstituicao.enderecoDTO.cidade}</p>
                        <p>Rua: {exame.dadosInstituicao.enderecoDTO.rua}</p>
                        <p>Contato 1: {exame.dadosInstituicao.contatoDTO.contatoUm}</p>
                      </Col>
                      <Col span={12} className='dados-parte-dois'>
                        <p>Cep: {exame.dadosInstituicao.enderecoDTO.cep}</p>
                        <p>Bairro: {exame.dadosInstituicao.enderecoDTO.bairro}</p>
                        <p>N°: {exame.dadosInstituicao.enderecoDTO.numero}</p>
                        <p>Contato 2: {exame.dadosInstituicao.contatoDTO.contatoDois}</p>
                      </Col>
                    </Row>
                    <h3>Dados do exame</h3>
                    { parametros.length > 1 ?
                      <Row>
                        <Col span={12} className='dados-parte-um'>
                        {
                          parametros.map( exame => exame.campo !== '' ? <p>Campo: {exame.campo}</p> : '')
                        }
                        </Col>
                        <Col span={12} className='dados-parte-dois'>
                        {
                          parametros.map( exame => exame.valor !== '' ? <p>Valor: {exame.valor}</p> : '')
                        }
                        </Col>
                      </Row>
                      : <span><WarningOutlined />Não há dados registrados neste exame!</span>
                    }
                  </div>
              }
            </Form>
          }</>
      </Modal>
    </>
  );
};