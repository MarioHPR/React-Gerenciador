import Axios from 'axios';

export default class UsuarioApi {

  // ###### USUARIO #####
  async buscarDadosDoUsuario() {    
    const response = await Axios.get( 'api/usuario/buscar-dados');
    return response;
  }

  static async criar( usuario ) {    
    const response = await Axios.post( 'api/usuario/salvar', usuario );
    return response;
  }

  async editarUsuario( usuario ) {    
    const response = await Axios.put( 'api/usuario/editar', usuario );
    return response;
  }

  static async login(email, senha) {
    const response = await Axios.post('login',
      { email: email, senha: senha }
    );
    return response;
  }

}