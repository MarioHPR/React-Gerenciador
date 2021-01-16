import React, { useState } from 'react';
import { Form, Input } from 'antd';
import './style.css';

function InputFormItem( props ) {
    const { name, nome, titulo, key, classe, classContainer, tipo, dica, value, flgRequired } = props;
    const [form] = Form.useForm();
    const required = !flgRequired ? false : true;
    form.setFieldsValue({name :value});
    console.log("///////////////")
    console.log("///////////////")
    console.log(value)
    console.log("///////////////")
    console.log("///////////////")
    return (
      <div className='centralizador-div' disabled>
        <label>{titulo}</label>
        <Form.Item className={ classContainer } name={ name } label={ nome }
          rules={ [ { required: required, message: `${ titulo } Obrigatório!` } ] }
        >
          <input
            key={ `bt${ key }` }
            className={ classe }
            type={ tipo }
            placeholder={ dica }
            defaultValue={tipo === 'date' ? "2020-12-12" : value}
            
          />
        </Form.Item>
      </div>
    )
  }

  export default InputFormItem;