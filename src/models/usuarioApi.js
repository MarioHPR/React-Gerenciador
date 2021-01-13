import Axios from 'axios';

const URI = `http://localhost:8080/api/`;

export default class UsuarioApi {

  // ###### USUARIO #####
  async criarUsuario( usuario ) {
    const { nome, cpf, email, dataNasc, senha } = usuario;
    const parametro =  { cpf: cpf, dataNascimento: dataNasc, nome: nome, email: email, senha: `${senha}` };

    const response = await Axios.post( `${URI}usuario/salvar`, parametro );
    return response;
  }

  async trocarSenha(email, senha) {
   /* const response = await Axios.put(`${URI}usuario/editar/senha`,
      { email, senha, headers: { 'Authorization': autenticacao } }
    );
    return response[0];*/
  }

  async realizarLogin(email, senha) {
    const response = await Axios.post(`http://localhost:8080/login`,
      { email: email, senha: senha }
    );
    return response;
  }

  // Localidade

  async cadastrarLocalidadeUsuario( localidade ) {
    const { cidade, cep, bairro, rua, numero, email } = localidade;
    const parametro = { cidade: cidade, cep: cep, bairro: bairro, rua: rua, numero:numero };
    const response = await Axios.post( `${URI}endereco/salvar-localidade/${email}`, parametro );
    return response;
  }

  async cadastrarLocalidade( auth, localidade ) {
    const { cidade, cep, bairro, rua, numero } = localidade;
    const parametro = { cidade: cidade, cep: cep, bairro: bairro, rua: rua, numero:numero };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}endereco/salvar`, parametro );
    return response;
  }


  // Contato

  async cadastrarContatoUsuario( contato ) {
    const { contatoUm, contatoDois, email } = contato;
    const parametro = { contatoUm: contatoUm, contatoDois: contatoDois };
    const response = await Axios.post( `${URI}contato/salvar-contato/${email}`, parametro );
    return response;
  }
  
  async cadastrarContato( auth, contato ) {
    const { contatoUm, contatoDois } = contato;
    const parametro = { contatoUm: contatoUm, contatoDois: contatoDois };
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.post( `${URI}contato/salvar`, parametro );
    return response;
  }
}