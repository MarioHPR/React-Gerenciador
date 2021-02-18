import React, { useEffect, useState } from 'react';
import { Modal, Row, Form, Button, Col } from 'antd';
import { InputBasicoModal, SelectInstituicao, SelectTipoExameEspecial } from '../';
import TipoExameApi from '../../models/tipoExameApi';
import ArquivoApi from '../../models/arquivoApi';
import FormularioDadosBasicos from '../formDadosBasicos';
import { WarningOutlined } from '@material-ui/icons';
import { MinusCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from '@material-ui/core';

export default function ModalAddExame(props) {
  const [form] = Form.useForm();
  const {visibleAdd, setVisibleAdd, setAtualizaTela, atualizaTela } = props;
  const [ flg, setFlg ] = useState(false);
  const [ itensExame, setItensExame ] = useState([]);
  const [ itensDoExame, setItensDoExame ] = useState(undefined);
  const [ nomeExame, setNomeExame ] = useState('');
  const [ doc, setDoc ] = useState(0);

  useEffect(()=>{
    onReset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[atualizaTela, visibleAdd]);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = values => {
    values.tipoExame = nomeExame;
    values.parametros = itensDoExame ? itensDoExame : [];
    const auth = localStorage.getItem("token-gerenciador-security");

    const arquivoApi = new ArquivoApi();
    arquivoApi.uploadArquivo(doc, auth).then( resp =>{
      if(resp.status === 200){
        setDoc(resp.data);
      }
    });
    const tipoExameApi = new TipoExameApi();
    values.idArquivo = doc || 0;
    values.numero = values.numero.replaceAll("_", "");
    tipoExameApi.criarTipoExame( values, auth).then( resp => { 
        if(resp.status === 200){
          let aux = atualizaTela + 1;
          setAtualizaTela(aux);
          setVisibleAdd(false);
          flg && setFlg(!flg);
          onReset();
        } } )
    itensDoExame.map( i => i.valor = '');
    removeOuAtualiza(null);
  }
  
  const adicionar = () => {
    let arrayAux =  itensDoExame;
    let campoNovo = { id: 0, campo: '', valor: ''};
    let aux = atualizaTela + 1;
    setAtualizaTela(aux);
    arrayAux.push(campoNovo);
    setItensDoExame(arrayAux);
    console.log(itensDoExame)
    removeOuAtualiza(null);
  };

  const removeOuAtualiza = value => {
    let arrayAux = itensDoExame.filter( item => item.campo !== value);
    setItensDoExame(arrayAux);
  };

  return (
    <> 
      <Modal title="Insira os dados referente ao exame" visible={visibleAdd} onOk={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        onCancel={() => {setVisibleAdd(false); onReset(); flg && setFlg(!flg)}}
        className='container-modal-editar' okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}>
          <>
            <Form useForm={ form } name="validate_other" onFinish={onFinish} initialValues='' >
              <div className="dados-instituicao">
                <div className='espacamento-top separador-elemento' >
                  <div className='div-comum-esquerda'>
                    <SelectTipoExameEspecial atualizaTela={atualizaTela} itensExame={itensExame} setItensDoExame={setItensDoExame} setItensExame={setItensExame} span={24}  setNomeExame={setNomeExame} />
                  </div>
                  <div className='div-comum-direita'>
                    <InputBasicoModal tipo='date' span={24} label='Data do exame' name={'dataExame'} />
                  </div>
                </div>
                <SelectInstituicao atualizaTela={atualizaTela} flg={flg} setFlg={setFlg} />     
                <div id="form-basic" className={flg ? 'mostrar-form' : 'esconder-form'}>
                  <FormularioDadosBasicos flg={flg} setFlg={setFlg} />
                </div>
                <h3>Dados do exame</h3>
              { itensDoExame !== undefined ?
                <Row>
                  <Col span={12} className='dados-parte-um'>
                  {
                    itensDoExame.length > 0 && itensDoExame.map( exame => (
                      exame.id !== '' &&
                      <div className='div-cedula-campo' itemID={`linha${exame.campo}`}>
                        <Tooltip className='tooltip' title={`Atributo ${exame.campo}`}>
                          <InfoCircleOutlined className='icon'/>
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
                    itensDoExame.length > 0 && itensDoExame.map( exame => (
                      exame.id !== '' &&
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
              <input type='file' onChange={evt => setDoc(evt.target.files[0])} />
              <Row>
                <Col xs={{span:24}} md={{span:12}}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button className="btn-cadastrar tamanho-total" type="primary" htmlType="submit">
                      <span className='color-white'>Adicionar</span>
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={{span:24}} md={{span:12}}>
                  <Form.Item>
                    <Button htmlType="button" onClick={ onReset } className='botao-form-itens tamanho-total'>
                      Limpar
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