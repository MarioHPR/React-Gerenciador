import Axios from 'axios';

export default class ConsultaApi {

  static async criar( consulta ) {    
    const response = await Axios.post( 'consulta/salvar/', consulta );
    return response;
  }

  static async buscar() {    
    const response = await Axios.get( 'consulta/buscar/consultas');
    return response.data;
  }

  static async buscar(id) {    
    const response = await Axios.get( `consulta/buscar/consulta/${id}` );
    return response;
  }

  static async editar( id, consulta) {    
    const response = await Axios.put(`consulta/editar/${id}`,consulta);    
    return response;
  }

  async removerConsulta( id) {    
    const response = await Axios.delete(`consulta/deletar/${id}`);
    return response;
  }
}