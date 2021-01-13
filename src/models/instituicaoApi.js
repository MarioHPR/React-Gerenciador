import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class InstitucaoApi {

  async criarInstituicao( instituicao, auth ) {
    const { nomeInstituicao, idLocalidade, idContato } = instituicao;
    const parametro = { nome : nomeInstituicao, idLocalidade : idLocalidade, idContato : idContato };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}instituicao/salvar/`, parametro );
    return response;
  }

  async buscarInstituicoes( auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}instituicao/buscar/instituicoes` );
    return response.data;
  }

  async buscarInstituicaoPorId( id, auth ){
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}instituicao/buscar/${id}` );
    return response;
  }

}