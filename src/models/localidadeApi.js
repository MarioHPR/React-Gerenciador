import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class LocalidadeApi {

  async criarLocalidade( localidade, email, auth ) {
    const { cidade, cep, bairro, rua, numero } = localidade;
    const parametro = { cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}endereco/salvar-localidade/${email}`, parametro );
    return response;
  }

  async criarLocalidade2( localidade, auth ) {
    const { cidade, cep, bairro, rua, numero } = localidade;
    const parametro = { cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}endereco/salvar/`, parametro );
    return response;
  }

  async buscarLocalidadePorId( id, auth ){
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}endereco/buscar/endereco/${id}` );
    return response;
  }

}