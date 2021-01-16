import React from 'react';
import { Col } from 'antd';
import { InputFormItem } from '../';
import './style.css';

function InputBasicoModal( props ) {
    const { name, tipo, label, conteudo, span, placeholder } = props;
    const { md, lg } = props;
    console.log("//////////////////////")
        console.log(conteudo)
        console.log("//////////////////////")
    return (
      <>
        <Col xs={{span:span}} md={{span:md || span}} lg={{span:lg || md || span}} className='campoModal'>
          <InputFormItem
            name={name}
            nome={''} 
            titulo={label}
            key={name}
            classe={'input-modal margin-bottom'}
            classContainer={''}
            tipo={ tipo }
            dica={ placeholder }
            value= { conteudo }
            flgRequired={true}
          />
        </Col>
        
      </>
    )
  }

  export default InputBasicoModal;