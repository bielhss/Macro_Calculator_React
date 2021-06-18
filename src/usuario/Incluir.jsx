import React from "react";
import { Link } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import Nav from "../components/Nav";
import { createUsuario } from "../service/UsuarioService";
import { validarUsuario } from "../validacao/ValidUsuario";
class IncluirUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  }
  initState = () => ({
    id: undefined,
    nome: "",
    data_nascimento: "",
    sexo: "",
    email: "",
    telefone_celular: "",
    toReturn:false,

    formValidation :{
      nome: [],
      data_nascimento: [],
      sexo: [],
      email: [],
      telefone_celular: [],
      validNome: false,
      validData_nascimento:false,
      validSexo: false,
      validEmail: false,
      validTelefone_celular: false,
    }
  });
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  validarDigitacaoUsuario() {
    let state = validarUsuario(this.state);
    this.setState({
      toReturn : state.toReturn,
      formValidation: state.formValidation,
    })
    return state.toReturn;
  }
  async handleSubimitUsuario(e){
    e.preventDefault();  


    if ( this.validarDigitacaoUsuario() === false ) {

          const {
              nome,
              data_nascimento,
              sexo,
              email,
              telefone_celular,
            } = this.state;
        
          let Usuario = {
              nome:nome,
              data_nascimento:data_nascimento,
              sexo:sexo,
              email:email,
              telefone_celular:telefone_celular,
          } 
          const resposta_servidor = await createUsuario(Usuario); 
          this.setState({
              state:this.initState()
          }, this.listarUsuario() )
    } 
  }
  listarUsuario = () => {
      this.props.history.push('/Usuario/listar');
  }
  render() {
    const {
      nome,
      data_nascimento,
      sexo,
      email,
      telefone_celular,
      formValidation,
    } = this.state;
    return (
      <div className="container">
        <Nav/>
        <Cabecalho path="/autor/listar" tituloPagina="Cadastro de Autores" tituloPesquisa="Lista de Autores"/>
        <div className="tile">
          <div className="tile-body">
            <form onSubmit={(e) => this.handleSubimitUsuario(e)}> 
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="form-group">
                    <label htmlFor="nome" className="control-label">
                      Nome:
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={nome}
                      onChange={(e) => this.onChange(e)}
                      id="nome"
                      className={formValidation.validNome === true ? "form-control is-invalid" : "form-control"}
                    />
                    {
                      formValidation.validNome && (
                         <div className="invalid-feedback">
                           {
                             formValidation.nome.map((erro, index ) => {
                               return (
                                   <p key={index} style={{ margin: "0"}}>
                                     <span>{erro}</span>
                                  </p>
                               )
                             })
                           }
                         </div> 
                      ) 
                    }
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-3 col-md-3">
                  <div className="form-group">
                    <label htmlFor="data_nascimento" className="control-label">
                      Data Nascimento:
                    </label>
                    <input
                      type="date"
                      name="data_nascimento"
                      value={data_nascimento}
                      onChange={(e) => this.onChange(e)}
                      id="data_nascimento"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-3 col-md-3">
                  <div className="form-group">
                    <label htmlFor="sexo" className="control-label">
                      SEXO:
                    </label>
                    <select
                      type="text"
                      name="sexo"
                      value={sexo}
                      onChange={(e) => this.onChange(e)}
                      id="sexo"
                      className="form-control "
                    >
                      <option value="">Selecione o Sexo</option>
                      <option value="F">Feminino</option>
                      <option value="M">Masculino</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
              </div>
              <div className="row">
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="email" className="control-label">
                      E-mail:
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => this.onChange(e)}
                      id="email"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="form-group">
                    <label htmlFor="telefone_celular" className="control-label">
                      Celular:
                    </label>
                    <input
                      type="text"
                      name="telefone_celular"
                      value={telefone_celular}
                      onChange={(e) => this.onChange(e)}
                      id="telefone_celular"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="center">
                <button type="submit" className="btn btn-primary btn-lg" title="Incluir novo Registro">
                  Salvar Dados do Usuario
                </button>
                <Link to="/Usuario/listar"  className="btn btn-secondary btn-lg ml-3" title="Cancelar a Inclusão">
                  Cancelar Inclusão do Usuario
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default IncluirUsuario;