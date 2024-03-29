import React from 'react';
import '../../pages/login/login.css'
import { Col, Row } from 'antd';
import { InputFormItem } from '../../components';
import './style.css';
import { Link } from 'react-router-dom';

export default function FormularioDadosBasicos( props ) {
  const { flg, setFlg } = props;

  return (
    <div className="form-dados-basicos" >
      <Row>
        <Col span={24}>
          <h4>Dados básicos da instituição:</h4>
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={''} name={'nomeinstituicao'} titulo={'Nome:'} key={'nomeinstituicao'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: Hospital...' } value={ '' } flgRequired={flg} />
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={''} name={'cidade'} titulo={'Cidade:'} key={'cidade'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: São Jerônimo' } value={ '' } flgRequired={flg} />
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={'99999-999'} name={'cep'} titulo={'Cep:'} key={'cep'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: 96700-000' } value={ '' } flgRequired={flg} />
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={''} name={'bairro'} titulo={'Bairro:'} key={'bairro'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: Passo D\'Areia' } value={ '' } flgRequired={flg} />
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={''} name={'rua'} titulo={'Rua:'} key={'rua'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: Rua das Pedras' } value={ '' } flgRequired={flg} />
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={'9999'} name={'numero'} titulo={'N°:'} key={'numero'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: 12' } value={ '' } flgRequired={flg} />
        </Col>
        <Col span={24}>
          <h4>Contatos da instituição:</h4>
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={'(99) 9 9999-9999'} name={'contatoUm'} titulo={'1° Contato:'} key={'contatoUm'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: (99) 9 9999-9999' } value={ '' } flgRequired={flg} />
        </Col>
        <Col ms={{span:24}} md={{span:12}}>
          <InputFormItem mask={'(99) 9 9999-9999'} name={'contatoDois'} titulo={'2° Contato::'} key={'contatoDois'} classe={'input-modal margin-bottom'}
            classContainer={''} tipo={ 'text' } dica={ 'ex: (99) 9 9999-9999' } value={ '' } flgRequired={flg} />
        </Col>
        <Col span={24}>
          <Link to='#' className={'botao-cancelar-adicao'} onClick={ () => setFlg(!flg) } >- cancelar adição</Link>
        </Col>
      </Row>
    </div>
  )
}