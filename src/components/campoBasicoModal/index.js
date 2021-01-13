import React from 'react';
import { Col } from 'antd';

function CampoBasicoModal( props ) {
    const { label, conteudo, span } = props;
    const { md, lg } = props;
    return (
      <>
        <Col xs={{span:span}} md={{span:md || span}} lg={{span:lg || md || span}} className='campoModal'>
          <label className='label-modal'>{label}:</label>
          <span  className='span-modal margin-bottom' >{conteudo}</span>
        </Col>
      </>
    )
  }

  export default CampoBasicoModal;