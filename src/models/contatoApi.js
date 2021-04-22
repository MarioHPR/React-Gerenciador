import Axios from 'axios';

export default class ContatoApi {

  async criarContato( contato) {
    const { contatoUm, contatoDois } = contato;
    const parametro = { contatoUm : contatoUm, contatoDois : contatoDois };    
    const response = await Axios.post('contato/salvar/', parametro );
    return response;
  }

  async buscarContatoPorId( id) {    
    const response = await Axios.get( `contato/buscar/${id}` );
    return response;
  }

}