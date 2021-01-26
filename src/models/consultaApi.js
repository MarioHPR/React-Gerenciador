import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class ConsultaApi {

  async criarConsulta( consulta, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}consulta/salvar/`, consulta );
    return response;
  }

  async buscarConsultas( auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}consulta/buscar/consultas` );
    return response.data;
  }

  async buscarConsultaPorId( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}consulta/buscar/consulta/${id}` );
    return response;
  }

  async editarConsulta( id, consulta, auth ) {
    const { dataConsulta, diagnostico, nomeMedico, prescricao, idInstituicao, linkImage } = consulta;
    const parametro = {
      dataConsulta : dataConsulta, diagnostico : diagnostico,
      nomeMedico : nomeMedico, prescricao : prescricao,
      idInstituicao : idInstituicao, linkImage : linkImage
    };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.put(`${URI}consulta/editar/${id}`,parametro);
    
    return response;
  }

  async removerConsulta( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.delete(`${URI}consulta/deletar/${id}`);
    return response;
  }
}