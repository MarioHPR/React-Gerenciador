import React from 'react';
import { Form, Upload } from 'antd';
import {  InboxOutlined } from '@ant-design/icons';

const CampoUpload = ({ destino, normFile, classe }) => {
    
    return (
      <>
        <label>Anexar foto ou arquivo {destino}:</label>
        <Form.Item className={classe} name="dragger" valuePropName="fileList" getValueFromEvent={normFile} >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Clique ou arraste o arquivo para está área para fazer upload</p>
            <p className="ant-upload-hint">Support para upload único ou em massa.</p>
          </Upload.Dragger>
        </Form.Item>
      </>
    )
  }

  export default CampoUpload;