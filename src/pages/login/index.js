import React, { Component } from 'react';

import { LoginUi }  from '../../components';
import './login.css';
import { Row, Col } from 'antd';

export default class Login extends Component {

  render(){   
    return (
      <>
        <div className="pagina-padrao">
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