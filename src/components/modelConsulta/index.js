import React, { useState, useEffect } from 'react';
import { Modal, Col, Row } from 'antd';
import ConsultaApi from '../../models/consultaApi';
import InstitucaoApi from '../../models/instituicaoApi';
import LocalidadeApi from '../../models/localidadeApi';
import ContatoApi from '../../models/contatoApi';
import { CampoBasicoModal } from '../../components';
import './style.css';

export default function ModalVisualizacaoConsulta(props) {
  /*const {visible, setVisible} = props;
  const { idConsulta } = props;
  const [ consulta, setConsulta ] = useState();
  const [ instituicao, setInstituicao ] = useState();
  const [ contato, setContato ] = useState();
  const [ localidade, setLocalidade ] = useState();

  useEffect(()=>{
    const auth = localStorage.getItem("token-gerenciador-security");
    const consultaApi = new ConsultaApi();
    const localidadeApi = new LocalidadeApi();
    const contatoApi = new ContatoApi();
    const instituicaoApi = new InstitucaoApi();
    consultaApi.buscarConsultaPorId( idConsulta, auth).then( resp => {
      if(resp.status === 200){
        setConsulta(resp.data);
        instituicaoApi.buscarInstituicaoPorId(resp.data.idInstituicao, auth).then( respInstituicao => {
          if( respInstituicao.status === 200 ){
              setInstituicao(respInstituicao.data);
              const requisicoes = [
                localidadeApi.buscarLocalidadePorId( respInstituicao.data.idLocalidade, auth ),
                contatoApi.buscarContatoPorId( respInstituicao.data.idContato, auth )
              ];

              Promise.all( requisicoes ).then(
                respostas => {
                  if( respostas[0].status === 200 && respostas[1].status === 200 ){
                    setLocalidade(respostas[0].data);
                    setContato(respostas[1].data);
                  }
                }
              );
          }
        });
      }
    } );
  
  },[idConsulta]);

  return (
    <> 
      <Modal title="Dados da Consulta" visible={ visible } onOk={ () => setVisible(false) }
        onCancel={ () => setVisible(false) } className='container-modal' >
        { (consulta && instituicao && localidade && contato) &&
          <>
            <Row >
              <CampoBasicoModal span={12} label='Médico' conteudo={consulta.nomeMedico} />
              <CampoBasicoModal span={12} label='Data consulta' conteudo={new Date(consulta.dataConsulta).toLocaleDateString()} />
              <CampoBasicoModal span={12} label='Diagnóstico' conteudo={consulta.diagnostico} />
              <CampoBasicoModal span={12} label='Prescrição' conteudo={consulta.prescricao} />
              <Col xs={{span:24}} className='campoModal'>
                <Row>
                  <h2 className='titulo-h2'>Dados Instituição:</h2>
                  <Col xs={{span:24}} className="margin-bottom">
                    <Row>
                      <CampoBasicoModal span={24} md={8} label='Nome Instituição' conteudo={instituicao.nome} />
                      <CampoBasicoModal span={24} md={8} label='Contato 1' conteudo={contato.contatoUm} />
                      <CampoBasicoModal span={24} md={8} label='Contato 2' conteudo={contato.contatoDois} />
                    </Row>
                  </Col>
                  <Col xs={{span:24}}>
                    <h4>Localização:</h4>
                    <Row className="margin-bottom">
                      <CampoBasicoModal span={24} md={12} lg={5} label='Cidade' conteudo={localidade.cidade} />
                      <CampoBasicoModal span={24} md={12} lg={5} label='Cep' conteudo={localidade.cep} />
                      <CampoBasicoModal span={24} md={12} lg={5} label='Bairro' conteudo={localidade.bairro} />
                      <CampoBasicoModal span={24} md={12} lg={5} label='Rua' conteudo={localidade.rua} />
                      <CampoBasicoModal span={24} md={12} lg={4} label='Numero' conteudo={localidade.numero} />
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        }
      </Modal>
    </>
  );*/
};