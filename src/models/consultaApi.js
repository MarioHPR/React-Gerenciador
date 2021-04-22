import Axios from 'axios';

const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class ConsultaApi {

  async criarConsulta( consulta ) {
    //const response = await Axios.post( `${URI}consulta/salvar/`, consulta );
    const response = await Axios.post( `${URI_HEROKU}consulta/salvar/`, consulta );
    return response;
  }

  async buscarConsultas() {
    //const response = await Axios.get( `${URI}consulta/buscar/consultas` );
    const response = await Axios.get( `${URI_HEROKU}consulta/buscar/consultas` );
    return response.data;
  }

  async buscarConsultaPorId( id) {
    //const response = await Axios.get( `${URI}consulta/buscar/consulta/${id}` );
    const response = await Axios.get( `${URI_HEROKU}consulta/buscar/consulta/${id}` );
    return response;
  }

  async editarConsulta( id, consulta) {
    //const response = await Axios.put(`${URI}consulta/editar/${id}`,consulta);
    const response = await Axios.put(`${URI_HEROKU}consulta/editar/${id}`,consulta);
    
    return response;
  }

  async removerConsulta( id) {
    //const response = await Axios.delete(`${URI}consulta/deletar/${id}`);
    const response = await Axios.delete(`${URI_HEROKU}consulta/deletar/${id}`);
    return response;
  }
}