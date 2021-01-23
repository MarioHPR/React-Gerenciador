import React, { useState, useEffect } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import { CampoUpload } from '..';
import FormularioDadosBasicos from '../formDadosBasicos';
import ExameApi from '../../models/exameApi';
import InstituicaoApi from '../../models/instituicaoApi';
import './style.css';
import { WarningOutlined } from '@material-ui/icons';
import { MinusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from '@material-ui/core';

export default function ModalExame(props) {
  const [form] = Form.useForm();
  const {visibleModal, setVisibleModal, idExame, editarVisualizar, setAtualizaTela, atualizaTela} = props;
  const [ flg, setFlg ] = useState(false);
  const [ exame, setExame ] = useState();
  const [ tipoExame, setTipoExame ] = useState('');
  const [ dataExame, setDataExame ] = useState('');
  const [ instituicao, setInstituicao ] = useState();
  const [ parametros, setParametros ] = useState([]);
  const [ instituicoes, setInstituicoes ] = useState([]);
  const [ interacao, setInteracao ] = useState(0);

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
        let filtrado = resp.data.parametros.filter( exame => exame.campo !== '' && exame.campo !== null);
        setParametros(filtrado);    
        onReset();
      }
    } );
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[ idExame, atualizaTela ] );

  const onReset = () => form.resetFields();

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const adicionar = () => {
    let arrayAux =  parametros;
    let campoNovo = { id: 0, campo: '', valor: '', idItemCampoExame: 0, idItemValorExame: 0};
    setInteracao(interacao + 1);
    arrayAux.push(campoNovo);
    setParametros(arrayAux);
    removeOuAtualiza(null);
    console.log(parametros)
  };

  const removeOuAtualiza = value => {
    let arrayAux = parametros.filter( exame => exame.campo !== value);
    setParametros(arrayAux)
  };

  const onFinish = values => {
   const { bairro, cep, cidade, rua, contatoDois, contatoUm, nomeinstituicao, numero } = values;
   console.log(values)
   console.log(flg)
   console.log(contatoUm)
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
        "email": '',
        "emeail": '',
        "id": 0,
        "numero": numero || 0,
        "rua": rua || ''
      },
      "id": (bairro && flg) ? 0 : instituicao.id || 0,
      "nome": nomeinstituicao || ''
    },
    "dataExame": dataExame || '',
    "linkImage": '',
    "parametros": parametros,
    "tipoExame": tipoExame || ''
  };
    
    const auth = localStorage.getItem("token-gerenciador-security");
    const exameApi = new ExameApi();
    exameApi.editarExame( idExame, request, auth).then( resp => { 
        if(resp.status === 200){
          let aux = atualizaTela + 1;
          setAtualizaTela(aux);
          setVisibleModal(false)
          flg && setFlg(!flg);
          onReset();
        } } );
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
      <Modal title="Visualização dos dados do exame" visible={visibleModal} onOk={() => {setVisibleModal(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleModal(false);onReset(); flg && setFlg(!flg)}} className='container-modal-editar' >
          <>{ exame && 
            <Form form={ form } name="validate_other" onFinish={onFinish} initialValues='' >
              <Row className='espacamento-top ' >
                <Col span={12}>
                  <label>Exame: </label>
                  <input className='input-modal margin-bottom' type='text' value={tipoExame} readOnly />
                </Col>
                <Col span={12}>
                  <label>Data: </label>
                  {
                    editarVisualizar === 1 ? <input className='input-modal margin-bottom' type='date' value={dataExame} onChange={ evt => setDataExame(evt.target.value)}/> 
                    : <input className='input-modal margin-bottom' type='date' value={dataExame} onChange={ evt => setDataExame(evt.target.value)} readOnly/>
                  }
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
                            <p>Contato 1: {instituicao.contatoDTO.contatoUm}</p>
                          </Col>
                          <Col span={12} className='dados-parte-dois'>
                            <p>Cidade: {instituicao.enderecoDTO.cidade}</p>
                            <p>Contato 2: {instituicao.contatoDTO.contatoDois}</p>
                          </Col>
                        </Row>
                      </div>
                    
                      <div id="" className={flg ? 'mostrar-form' : 'esconder-form'}>
                        <FormularioDadosBasicos flg={flg} setFlg={setFlg} />
                      </div>
                      <h3>Dados do exame</h3>
                      { parametros.length > 0 ?
                        <Row>
                          <Col span={12} className='dados-parte-um'>
                          {
                            parametros.map( exame => (
                              <div className='div-cedula-campo'>
                                <Tooltip className='tooltip' title={`Atributo ${exame.campo}`}>
                                  <InfoCircleOutlined className='icon' />
                                </Tooltip>
                                { exame.id !== 0 ?
                                  <input className='input-modal' placeholder="Campo atributo" value={exame.campo} readOnly/> :
                                  <input className='input-modal' placeholder="Campo atributo" onChange={evt => {exame.campo = evt.target.value;removeOuAtualiza(null)}} value={exame.campo} />
                                }
                                </div>
                            ) )
                          }
                          </Col>
                          <Col span={12} className='dados-parte-dois'>
                          {
                            parametros.map( exame => (
                              <div className='div-cedula-campo' itemID={`linha${exame.campo}`}>
                                <Tooltip className='tooltip' title={`Digite o Valor referente ao atributo ${exame.campo}!`}>
                                  <InfoCircleOutlined className='icon'/>
                                </Tooltip>
                                <input className='input-modal' placeholder="Valor atributo" onChange={evt => {exame.valor = evt.target.value;removeOuAtualiza(null)}} value={exame.valor} />
                                <Tooltip className='tooltip' title={`Remover valor e atributo ${exame.campo}!`}>                               
                                  <MinusCircleOutlined  className='icon icon-remover' onClick={()=>removeOuAtualiza(exame.campo)}/>
                                </Tooltip>
                              </div>
                            ) )
                          }
                          </Col>
                        </Row>
                        : <span><WarningOutlined />Não há dados registrados neste exame!</span>
                        
                      }
                      <Button type="dashed" onClick={() => adicionar()} block >
                       + Adicionar mais campos
                      </Button>

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
                    </div>
                  </>
                :
                  <div className="dados-instituicao">
                    <h3>Dados da Instituição</h3>
                    <Row>
                      <Col span={12} className='dados-parte-um'>
                        <p>Instituição: {exame.dadosInstituicao.nome}</p>
                        <p>Contato 1: {exame.dadosInstituicao.contatoDTO.contatoUm}</p>
                      </Col>
                      <Col span={12} className='dados-parte-dois'>
                        <p>Cidade: {exame.dadosInstituicao.enderecoDTO.cidade}</p>
                        <p>Contato 2: {exame.dadosInstituicao.contatoDTO.contatoDois}</p>
                      </Col>
                    </Row>
                    <h3>Dados do exame</h3>
                    { parametros.length > 0 ?
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