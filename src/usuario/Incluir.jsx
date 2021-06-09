import React from "react";
import { Link } from "react-router-dom";
import { createUsuario } from "../service/UsuarioService";
import { validarUsuario } from "../validacao/ValidUsuario";

class IncluirUsuario extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.initState();
    }

    initState = () => ({
        id: undefined,
        nome: '',
        email: '',

        toReturn: false,

        formValidation: {
            nome: [],
            email: [],

            validnome: false,
            validEmail: false,
        }
    });

    onChange = (e) => {
        const { nome, value } = e.target;
        this.setState({
            [nome]: value
        })
    }

    validarDigitacaoUsuario() {
        let state = validarUsuario(this.state);
        this.setState({
            toReturn: state.toReturn,
            formValidation: state.formValidation,
        })
        return state.toReturn;
    }

    async handleSubimitUsuario(e) {
        e.preventDefault();

        if (this.validarDigitacaoUsuario() === false) {
            const {
                nome,
                email,
            } = this.state;

            let usuario = {
                nome: nome,
                email: email,
            }

            const resposta_servidor = await createUsuario(usuario);

            this.setState({
                state: this.initState()
            }, this.listarUsuario())
        }
    }

    listarUsuario = () => {
        this.props.history.push('/usuario/listar');
    }


    render() {
        //const { id } = this.props.match.params;
        const {
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
                                            nome:
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
                                <button type="submit" className="btn btn-primary btn-lg" title="Incluir novo Registro">
                                    Salvar Dados do Usuario
                                </button>
                                <Link to="/usuario/listar"  className="btn btn-secondary btn-lg ml-3" title="Cancelar a Inclusão">
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