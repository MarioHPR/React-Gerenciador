import Axios from 'axios';

const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class ExameApi {

  async buscarTodosExames() {
    //const response = await Axios.get( `${URI}exame/buscar-todos/` );
    const response = await Axios.get( `${URI_HEROKU}exame/buscar-todos/` );
    return response.data;
  }

  async buscarExamePorId(id) {
    //const response = await Axios.get( `${URI}exame/buscar-dados/${id}` );
    const response = await Axios.get( `${URI_HEROKU}exame/buscar-dados/${id}` );
    return response;
  }

  async editarExame( id, parametro) {
    //const response = await Axios.put(`${URI}exame/editar/${id}`,parametro);
    const response = await Axios.put(`${URI_HEROKU}exame/editar/${id}`,parametro);
    return response;
  }

  async removerExame( id) {
    //const response = await Axios.delete(`${URI}exame/deletar/${id}`);
    const response = await Axios.delete(`${URI_HEROKU}exame/deletar/${id}`);
    return response;
  }
}