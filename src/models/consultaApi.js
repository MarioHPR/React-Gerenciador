import Axios from 'axios';

export default class ConsultaApi {

  async criarConsulta( consulta ) {    
    const response = await Axios.post( 'consulta/salvar/', consulta );
    return response;
  }

  async buscarConsultas() {    
    const response = await Axios.get( 'consulta/buscar/consultas');
    return response.data;
  }

  async buscarConsultaPorId(id) {    
    const response = await Axios.get( `consulta/buscar/consulta/${id}` );
    return response;
  }

  async editarConsulta( id, consulta) {    
    const response = await Axios.put(`consulta/editar/${id}`,consulta);
    
    return response;
  }

  async removerConsulta( id) {    
    const response = await Axios.delete(`consulta/deletar/${id}`);
    return response;
  }
}