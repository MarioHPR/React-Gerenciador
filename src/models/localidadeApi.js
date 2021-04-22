import Axios from 'axios';

const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class LocalidadeApi {

  async criarLocalidade( localidade, email) {
    const { cidade, cep, bairro, rua, numero } = localidade;
    const parametro = { cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero };    
    //const response = await Axios.post( `${URI}endereco/salvar-localidade/${email}`, parametro );
    const response = await Axios.post( `${URI_HEROKU}endereco/salvar-localidade/${email}`, parametro );
    return response;
  }

  async criarLocalidade2( localidade) {
    const { cidade, cep, bairro, rua, numero } = localidade;
    const parametro = { cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero };    
    //const response = await Axios.post( `${URI}endereco/salvar/`, parametro );
    const response = await Axios.post( `${URI_HEROKU}endereco/salvar/`, parametro );
    return response;
  }

  async buscarLocalidadePorId( id){    
    //const response = await Axios.get( `${URI}endereco/buscar/endereco/${id}` );
    const response = await Axios.get( `${URI_HEROKU}endereco/buscar/endereco/${id}` );
    return response;
  }

}