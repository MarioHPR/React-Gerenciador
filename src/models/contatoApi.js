import Axios from 'axios';

const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class ContatoApi {

  async criarContato( contato) {
    const { contatoUm, contatoDois } = contato;
    const parametro = { contatoUm : contatoUm, contatoDois : contatoDois };    
    //const response = await Axios.post( `${URI}contato/salvar/`, parametro );
    const response = await Axios.post( `${URI_HEROKU}contato/salvar/`, parametro );
    return response;
  }

  async buscarContatoPorId( id) {
    //const response = await Axios.get( `${URI}contato/buscar/${id}` );
    const response = await Axios.get( `${URI_HEROKU}contato/buscar/${id}` );
    return response;
  }

}