import React from "react";
import { Link } from "react-router-dom";
import { findUsuarioById, updateUsuario } from "../service/UsuarioService";

class AlterarUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    }

    initState = () => ({
        id: undefined,
        nome: "",
        email: "",
    });

    componentDidMount() {
    const { id } = this.props.match.params;
    this.loadData(id);
    }

    async loadData(id) {
        const resposta_servidor = await findUsuarioById(id);
        this.setState({
        id: resposta_servidor.usuario.id,
        nome: resposta_servidor.usuario.nome,
        email: resposta_servidor.usuario.email,
        });
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
        [name]: value,
        });
    };

    async handleSubimitUsuario(e) {
        e.preventDefault();

        const {
        id,
        nome,
        email,
        } = this.state;

        console.log(id);

        let usuario = {
            id: id,
            nome: nome,
            email: email,
        };

        const resposta_servidor = await updateUsuario(usuario);

        this.setState(
            {
            state: this.initState(),
            },
            this.listarUsuario()
        );
    }

    listarUsuario = () => {
        this.props.history.push("/usuario/listar");
    };

    render() {
        const {
            id,
            nome,
            email,
        } = this.state;

        return (
            <div className="container pt-5">
                <div className="tile">
                    <div className="tile-body">
                        <form onSubmit={(e) => this.handleSubimitAutor(e)}>
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
                                            className="form-control "
                                            className={formValidation.validnome === true ? "form-control is-invalid" : "form-control"}
                                        />
                                        {
                                            formValidation.validnome && (
                                                <div className="invalid-feedback">
                                                    {
                                                        formValidation.nome.map((erro, index) => {
                                                            return (
                                                                <p key={index} style={{ margin: "0" }}>
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
                            <div className="center">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg" 
                                    title="Incluir novo Registro"
                                >
                                    Salvar Dados do Usuario
                                </button>
                                <Link 
                                    to="/usuario/listar"  
                                    className="btn btn-secondary btn-lg ml-3" 
                                    title="Cancelar a Inclusão"
                                >
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

export default AlterarUsuario;