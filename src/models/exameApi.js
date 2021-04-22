import Axios from 'axios';

export default class ExameApi {

  async buscarTodosExames() {
    const response = await Axios.get('exame/buscar-todos/');
    return response.data;
  }

  async buscarExamePorId(id) {
    const response = await Axios.get( `exame/buscar-dados/${id}` );
    return response;
  }

  async editarExame( id, parametro) {
    const response = await Axios.put(`exame/editar/${id}`,parametro);
    return response;
  }

  async removerExame( id) {    
    const response = await Axios.delete(`exame/deletar/${id}`);
    return response;
  }
}