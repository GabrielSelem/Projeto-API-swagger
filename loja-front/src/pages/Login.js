import { useState } from "react";
import api from "../services/api";
import "./Login.css";

function Login() {

    const [usuario, setUsuario] =
        useState("");

    const [senha, setSenha] =
        useState("");

    async function fazerLogin(e) {

        e.preventDefault();

        try {

            const response =
                await api.post(
                    "/auth/login",
                    {
                        usuario,
                        senha
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            window.location.href =
                "/clientes";

        } catch {

            alert(
                "Usuário ou senha inválidos"
            );
        }
    }

    return (

        <div className="login-container">

            <form
                className="login-form"
                onSubmit={fazerLogin}
            >

                <h1>Login</h1>

                <input
                    type="text"
                    placeholder="Usuário"
                    value={usuario}
                    onChange={(e) =>
                        setUsuario(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) =>
                        setSenha(e.target.value)
                    }
                />

                <button type="submit">
                    Entrar
                </button>

            </form>

        </div>
    );
}

export default Login;