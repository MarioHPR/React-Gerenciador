import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class ExameApi {


  async buscarTodosExames( auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}exame/buscar-todos/` );
    return response.data;
  }

  async buscarExamePorId( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}exame/buscar-dados/${id}` );
    return response;
  }

  async editarExame( id, parametro, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.put(`${URI}exame/editar/${id}`,parametro);
    
    return response;
  }

  async removerExame( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.delete(`${URI}exame/deletar/${id}`);
    return response;
  }
}