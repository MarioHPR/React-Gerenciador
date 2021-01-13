import React, { Component } from 'react';

import { LoginUi }  from '../../components';
import './login.css';
import { Row, Col } from 'antd';

export default class Login extends Component {
  constructor( props ){
    super(props);
  }

  render(){   
    return (
      <>
        <div className="pagina-padrao tamanho-total-container">
          <Row>
            <Col xs={ { span: 24 } }>
              <div className="login">
                <div className="layout-login">
                  <LoginUi />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    )
  };
}