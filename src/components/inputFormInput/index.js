import React from 'react';
import { Form } from 'antd';
import './style.css';
import InputMask from 'react-input-mask';

function InputFormItem( props ) {
    const { mask, name, nome, titulo, key, classe, classContainer, tipo, dica, value, flgRequired, editarVisualizar } = props;
    const [form] = Form.useForm();
    const required = !flgRequired ? false : true;
    form.setFieldsValue({name :value});
    return (
      <div className='centralizador-div' disabled>
        <label>{titulo}</label>
        <Form.Item className={ classContainer } name={ name } label={ nome }
          rules={ [ { required: required, message: `${ titulo } Obrigatório!` } ] }
        >
          {
            editarVisualizar === 0 ?
              <input
                key={ `bt${ key }` }
                className={ classe }
                type={ tipo }
                placeholder={ dica }
                defaultValue={value}
                readOnly
              /> :
              <InputMask 
                mask={mask}
                key={ `bt${ key }` }
                className={ classe }
                type={ tipo }
                placeholder={ dica }
                defaultValue={ value}
              />
          }
          
        </Form.Item>
      </div>
    )
  }

  export default InputFormItem;