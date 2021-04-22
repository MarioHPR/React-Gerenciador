import Axios from 'axios';

export default class ArquivoApi {
  uploadArquivo( file) {
    const data = new FormData();
    data.append('upload', file);   
    const response = Axios.post( 'arquivo/upload/', data );
    return response;
  }

  async downloadArquivo( id) {    
    const response = await Axios.get( `arquivo/${id}`, {responseType: 'blob'} ).then(
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