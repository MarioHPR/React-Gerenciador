import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class ContatoApi {

  async criarContato( contato, auth ) {
    const { contatoUm, contatoDois } = contato;
    const parametro = { contatoUm : contatoUm, contatoDois : contatoDois };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}contato/salvar/`, parametro );
    return response;
  }

  async buscarContatoPorId( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}contato/buscar/${id}` );
    return response;
  }

}