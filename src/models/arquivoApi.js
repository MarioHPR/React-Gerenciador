import Axios from 'axios';

const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class ArquivoApi {
  uploadArquivo( file) {
    const data = new FormData();
    data.append('upload', file);
   //const response = await Axios.post( `${URI}consulta/salvar/`, consulta );
    const response = Axios.post( `${URI_HEROKU}arquivo/upload/`, data );
    return response;
  }

  async downloadArquivo( id) {
    //const response = await Axios.get( `${URI}consulta/buscar/consultas` );
    const response = await Axios.get( `${URI_HEROKU}arquivo/${id}`, {responseType: 'blob'} ).then(
      function (response) {
        let fileName = "arquivo.pdf";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE variant
            window.navigator.msSaveOrOpenBlob(new Blob([response.data], {type: 'application/octet-stream'}),
                fileName);
        } else {
            const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        }
      }
    );
    return response;
  }
}