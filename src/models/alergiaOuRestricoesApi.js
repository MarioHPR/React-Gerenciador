import Axios from 'axios';


// TODO padronizar o uso de caminho com ou se /api/ ?
export default class AlergiaOuRestricoesApi {

  // ###### AlergiaOuRestricoes #####
  async buscar() {    
    const response = await Axios.get( 'api/restricoes/' );
    return response;
  }
  
  async criar( AlergiaOuRestricoes) {
    const response = await Axios.post( 'api/restricoes/salvar', AlergiaOuRestricoes );
    return response;
  }

  async editar( id, AlergiaOuRestricoes) {
    const response = await Axios.put( `api/restricoes/editar/${id}`, AlergiaOuRestricoes );
    return response;
  }
  
  async remover( id) {    
    const response = await Axios.delete(`api/restricoes/deletar/${id}`);
    return response;
  }

}