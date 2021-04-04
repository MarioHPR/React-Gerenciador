import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TipoExameApi from '../../models/tipoExameApi';

const tipoExameApi = new TipoExameApi();
const auth = localStorage.getItem("token-gerenciador-security");

export default function TableListaTipoExame( props ) {
  const { atualizaTela, setAtualizaTela, tipoExames, handleDelete } = props;
  const [ aux, setAux ] = useState();
  const originData = [];

  useEffect(()=>{
    let a = [];
    tipoExames !== [] && tipoExames.map( tipoExame => {
      return a.push({
        "key": tipoExame.id,
        "nome": `${tipoExame.nomeExame}`,
        "quantidade": `${tipoExame.quantidade}`
      })
    } );
    setAux(a);
  },[tipoExames]);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const openNotificationWithIcon = (type, msg, descricao) => {
    notification[type]({
      message: [msg],
      description:[descricao],
      placement:'bottomRight'
    });
  };

  const edit = (record) => {
    form.setFieldsValue({
      nome: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {

    
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        setData(newData);
        setEditingKey('');
      }
      tipoExameApi.editarTipoExame(key.key, row.nome, auth).then( resp => {
        if(resp.status === 200) {
          setAtualizaTela(atualizaTela + 1);
          openNotificationWithIcon("success", 'Editado', 'Tipo exame editado com sucesso!');
        }
      });
    } catch (errInfo) {
      
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: '10%',
      editable: false,
    },
    {
      title: 'Nome Exame',
      dataIndex: 'nome',
      width: '50%',
      editable: true,
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      width: '10%',
      editable: false,
    },
    {
      title: 'Operações',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href='#/'
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href='/'>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined />
            </Typography.Link>
            <Popconfirm title="Deseja realmente excluir?" onConfirm={() => handleDelete(record)}>
            <Typography.Link title="Tem certeza que deseja deletar?">
              <DeleteOutlined />
            </Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Campo ${title} é obrigatorio!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div className='container-lista-consulta'>
      {
        aux &&
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={aux}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      }
    </div>
  );
}