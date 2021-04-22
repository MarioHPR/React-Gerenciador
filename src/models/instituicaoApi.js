import Axios from 'axios';

export default class InstitucaoApi {

  async criarInstituicao( instituicao) {
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

    const response = await Axios.post( 'instituicao/salvar/', dadosInstituicao );
    return response;
  }

  async buscarInstituicoes() {        
    const response = await Axios.get( 'instituicao/buscar/instituicoes');
    return response.data;
  }

  async buscarInstituicaoPorId( id ){        
    const response = await Axios.get( `instituicao/buscar/${id}` );
    return response;
  }

  async deletarInstituicao( id) {

    const response = await Axios.delete( `instituicao/deletar/${id}` );
    return response;
  }

  async editarInstiuicao( instituicao) {
    let id = instituicao.id;
    const response = await Axios.put( `instituicao/editar/${id}`, instituicao );
    return response;
  }

}