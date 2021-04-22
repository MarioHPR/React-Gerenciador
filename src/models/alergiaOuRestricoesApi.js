import Axios from 'axios';

export default class AlergiaOuRestricoesApi {

  // ###### AlergiaOuRestricoes #####
  async buscarAlergiaOuRestricoes() {    
    const response = await Axios.get( 'api/restricoes/' );
    return response;
  }


  async criarAlergiaOuRestricoes( AlergiaOuRestricoes) {
    const response = await Axios.post( 'api/restricoes/salvar', AlergiaOuRestricoes );
    return response;
  }

  async editarAlergiaOuRestricoes( id, AlergiaOuRestricoes) {
    const response = await Axios.put( `api/restricoes/editar/${id}`, AlergiaOuRestricoes );
    return response;
  }

  async removerConsulta( id) {    
    const response = await Axios.delete(`api/restricoes/deletar/${id}`);
    return response;
  }

}