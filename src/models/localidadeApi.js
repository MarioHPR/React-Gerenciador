import Axios from 'axios';

export default class LocalidadeApi {

  async criarLocalidade( localidade, email) {
    const { cidade, cep, bairro, rua, numero } = localidade;
    const parametro = { cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero };
    const response = await Axios.post( `endereco/salvar-localidade/${email}`, parametro );
    return response;
  }

  async criarLocalidade2( localidade) {
    const { cidade, cep, bairro, rua, numero } = localidade;
    const parametro = { cidade : cidade, cep : cep, bairro : bairro, rua : rua, numero : numero };        
    const response = await Axios.post( 'endereco/salvar/', parametro );
    return response;
  }

  async buscarLocalidadePorId( id){        
    const response = await Axios.get( `endereco/buscar/endereco/${id}` );
    return response;
  }

}