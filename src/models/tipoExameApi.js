import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class TipoExameApi {

  async criarTipoExame( dadosParametro, auth ) {
    const { tipoExame, dataExame, select, nomeinstituicao } = dadosParametro;
    const { contatoDois, contatoUm } = dadosParametro;
    const { bairro, cep, cidade, numero, rua } = dadosParametro;

    let campo = [''];
    let valor = [''];

    const dadosInstituicao = {
      "contatoDTO" : {
        "contatoDois" : contatoDois || '',
        "contatoUm" : contatoUm || '',
        "id" : 0
      }, "enderecoDTO" : {
        "bairro": bairro || '',
        "cep": cep || '',
        "cidade": cidade || '',
        "email": "",
        "emeail": "",
        "id": 0,
        "numero": numero || '',
        "rua": rua || ''
      },
      "id": select.toString() !== '() => setFlg(!flg)' ? select : 0,
      "nome" : nomeinstituicao
    }
    
    dadosParametro.parametros !== undefined && dadosParametro.parametros.map( e => {
      return (
        campo.push(e.campo),
        valor.push(e.valor)
      );
    });
    
    const parametro = {
                        "dadosInstituicao": dadosInstituicao,
                        "nomeExame" : tipoExame || '',
                        "dataExame": dataExame || '',
                        "linkImage": "",
                        "campo": campo,
                        "valor": valor
                      }
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}tipoExame/salvar-resumo/`, parametro );
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