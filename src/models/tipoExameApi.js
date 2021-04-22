import Axios from 'axios';

//const URI = `http://localhost:8080/api/`;
const URI_HEROKU = 'https://back-geranciador-exames.herokuapp.com/api/';

export default class TipoExameApi {

  async criarTipoExame( dadosParametro) {
    const { tipoExame, dataExame, select, nomeinstituicao, idArquivo } = dadosParametro;
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
                        "idArquivo": idArquivo || 0,
                        "campo": campo,
                        "valor": valor
                      }    
    //const response = await Axios.post( `${URI}tipoExame/salvar-resumo/`, parametro );
    const response = await Axios.post( `${URI_HEROKU}tipoExame/salvar-resumo/`, parametro );
    return response;
  }

  async buscarTodosTipoExames() {    
    //const response = await Axios.get( `${URI}tipoExame/buscar/` );
    const response = await Axios.get( `${URI_HEROKU}tipoExame/buscar/todos` );
    return response.data;
  }

  async buscarTipoExame() {    
    //const response = await Axios.get( `${URI}tipoExame/buscar/` );
    const response = await Axios.get( `${URI_HEROKU}tipoExame/buscar/` );
    return response.data;
  }

  async buscarTipoExamePorId( id) {
    //const response = await Axios.get( `${URI}tipoExame/buscar/${id}` );
    const response = await Axios.get( `${URI_HEROKU}tipoExame/buscar/${id}` );
    return response;
  }

  async editarTipoExame( id, tipoExame) {  
    const parametro = { nomeExame : tipoExame };    
    //const response = await Axios.put(`${URI}tipoExame/editar/${id}`,parametro);
    const response = await Axios.put(`${URI_HEROKU}tipoExame/editar/${id}`,parametro);
    
    return response;
  }

  async removerTipoExame( id) {    
    //const response = await Axios.delete(`${URI}tipoExame/deletar/${id}`);
    const response = await Axios.delete(`${URI_HEROKU}tipoExame/deletar/${id}`);
    return response;
  }
}