import Axios from 'axios';

const URI = `http://localhost:8080/`;
const URI_HEROKU = 'https:/back-geranciador-exames.herokuapp.com/';

export default class AlergiaOuRestricoesApi {

  // ###### AlergiaOuRestricoes #####
  async buscarAlergiaOuRestricoes(auth) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI_HEROKU}api/restricoes/` );
    return response;
  }


  async criarAlergiaOuRestricoes( AlergiaOuRestricoes, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI_HEROKU}api/restricoes/salvar`, AlergiaOuRestricoes );
    return response;
  }

  async editarAlergiaOuRestricoes( id, AlergiaOuRestricoes, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.put( `${URI_HEROKU}api/restricoes/editar/${id}`, AlergiaOuRestricoes );
    return response;
  }

  async removerConsulta( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    //const response = await Axios.delete(`${URI}api/restricoes/deletar/${id}`);
    const response = await Axios.delete(`${URI_HEROKU}api/restricoes/deletar/${id}`);
    return response;
  }

}