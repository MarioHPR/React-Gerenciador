import Axios from 'axios';

const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class ArquivoApi {
  async uploadArquivo( file, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const data = new FormData();
    data.append('upload', file);
   //const response = await Axios.post( `${URI}consulta/salvar/`, consulta );
    const response = await Axios.post( `${URI_HEROKU}arquivo/upload/`, data );
    return response;
  }

  async downloadArquivo( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    //const response = await Axios.get( `${URI}consulta/buscar/consultas` );
    const response = await Axios.get( `${URI_HEROKU}arquivo/${id}` );
    return response.data;
  }
}