import UsuarioApi from "./usuarioApi";

export default class Usuario {
  constructor( id, cpf, dataNascimento, nome, email, senha ) {
    this.id = id;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.usuarioApi = new UsuarioApi();
  }
}