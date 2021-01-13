import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class TipoExameApi {

  async criarTipoExame( dadosParametro, auth ) {
    let campo = [];
    let valor = [];
    
    dadosParametro.parametros.map( e => {
      campo.push(e.campo);
      valor.push(e.valor);
    });
    
    const { nomeExame, dataExame, select } = dadosParametro;
    const parametro = {
                        "nomeExame" : nomeExame,
                        "dataExame": dataExame,
                        "idInstituicao": select,
                        "linkImage": "",
                        "campo": campo,
                        "valor": valor
                      }
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}tipoExame/salvar/`, parametro );
    return response;
  }

  async buscarTipoExame( auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}tipoExame/buscar/` );
    return response.data;
  }

  async buscarTipoExamePorId( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI}tipoExame/buscar/${id}` );
    return response;
  }

  async editarTipoExame( id, tipoExame, auth ) {
    const { nomeExame } = tipoExame;
    const parametro = { nomeExame : nomeExame };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.put(`${URI}tipoExame/editar/${id}`,parametro);
    
    return response;
  }

  async removerTipoExame( id, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.delete(`${URI}tipoExame/deletar/${id}`);
    return response;
  }
}