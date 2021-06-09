import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { findAllusuarios } from "../service/UsuarioService";

class Listarusuario extends Component {
  constructor() {
    super();
    this.state = this.initState();
  }

  initState = () => ({
    usuarioes: [],
    paginaInicio: 0,
    paginaFim: 0,
  });

  async componentDidMount() {
    const usuarioes = await findAllUsuarios();
    this.setState({
      usuarioes: usuarioes.data,
      paginaInicio: usuarioes.current_page,
      paginaFim: usuarioes.total,
    });
  }

  render() {
    const { usuarios, pageSize, paginaAtual, paginaFim, totalCount } = this.state;
    return (
        <div>
        <div className="container">
          <div className="app-title">
            <h1>
              <i className="fa fa-edit">Lista de usuários</i>
            </h1>
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <i className="fa fa-search fa-lg"></i>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Menu Principal</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <div className="tile">
            <div className="tile-body">
              <div id="no-more-tables">
                <table className="table table-striped table-bordered table-hover cf ">
                  <thead className="cf">
                        <tr>
                          <td>Id</td>
                          <td>Nome</td>
                          <td>E-mail</td>
                          </tr>
                  </thead>
                  <tbody>
                    {usuarios.map( (usuario) => (
                    <tr key={usuario.id}>
                      <td>{ usuario.id }</td>
                      <td>{ usuario.nome }</td>
                      <td>
                        <Link className="btn btn-info btn-sm" to={`/usuario/alterar/${usuario.id}`}>
                          <i className="fa fa-pencil"></i>
                        </Link>
                        <a className="btn btn-danger btn-sm" href="#">
                          <i className="fa fa-trash"></i>
                        </a>
                        <a className="btn btn-warning btn-sm" href="#">
                          <i className="fa fa-address-book"></i>
                        </a>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
                <Link className="btn btn-success btn-lg" to="/usuario/inserir" title="Incluir novo Registro">
                  <i className="fa fa-plus-circle"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Listarusuario;