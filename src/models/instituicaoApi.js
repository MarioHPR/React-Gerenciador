import Axios from 'axios';

const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class InstitucaoApi {

  async criarInstituicao( instituicao, auth ) {
    const { contatoUm, contatoDois, nome } = instituicao;
    const { bairro, cep, cidade, numero, rua } = instituicao;

    const dadosInstituicao = {
      "contatoDTO" : {
        "contatoDois" : contatoDois || '',
        "contatoUm" : contatoUm || ''
      }, "enderecoDTO" : {
        "bairro": bairro || '',
        "cep": cep || '',
        "cidade": cidade || '',
        "numero": numero || 0,
        "rua": rua || ''
      },
      "nome" : nome
    }

    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI_HEROKU}instituicao/salvar/`, dadosInstituicao );
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