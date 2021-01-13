import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function CamposExame () {

  return (
      <Form.List name="parametros">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'campo']}
                  fieldKey={[field.fieldKey, 'campo']}
                  rules={[{ required: true, message: 'Missing campo' }]}
                >
                  <Input placeholder="Campo atributo" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'valor']}
                  fieldKey={[field.fieldKey, 'valor']}
                  rules={[{ required: true, message: 'Missing valor' }]}
                >
                  <Input placeholder="Valor do atributo" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Adicionar campos
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
  );
};