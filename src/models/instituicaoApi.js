import Axios from 'axios';

const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class InstitucaoApi {

  async criarInstituicao( instituicao, auth ) {
    const { nomeInstituicao, idLocalidade, idContato } = instituicao;
    const parametro = { nome : nomeInstituicao, idLocalidade : idLocalidade, idContato : idContato };
    Axios.defaults.headers.Authorization = auth;
    //const response = await Axios.post( `${URI}instituicao/salvar/`, parametro );
    const response = await Axios.post( `${URI_HEROKU}instituicao/salvar/`, parametro );
    return response;
  }

  async buscarInstituicoes( auth ) {
    Axios.defaults.headers.Authorization = auth;
    //const response = await Axios.get( `${URI}instituicao/buscar/instituicoes` );
    const response = await Axios.get( `${URI_HEROKU}instituicao/buscar/instituicoes` );
    return response.data;
  }

  async buscarInstituicaoPorId( id, auth ){
    Axios.defaults.headers.Authorization = auth;
    //const response = await Axios.get( `${URI}instituicao/buscar/${id}` );
    const response = await Axios.get( `${URI_HEROKU}instituicao/buscar/${id}` );
    return response;
  }

  async deletarInstituicao( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.delete( `${URI_HEROKU}instituicao/deletar/${id}` );
    return response;
  }

}