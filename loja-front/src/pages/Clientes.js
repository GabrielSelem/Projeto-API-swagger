import { useEffect, useState } from "react";
import api from "../services/api";
import "./Clientes.css";

function Clientes() {

    const [clientes, setClientes] =
        useState([]);

    const [nome, setNome] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [telefone, setTelefone] =
        useState("");

    useEffect(() => {

        listarClientes();

    }, []);

    async function listarClientes() {

        const token =
            localStorage.getItem("token");

        const response =
            await api.get(
                "/cliente",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        setClientes(response.data);
    }

    async function salvarCliente() {

        const token =
            localStorage.getItem("token");

        await api.post(
            "/cliente",
            {
                nome,
                email,
                telefone
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        listarClientes();
    }

    async function excluirCliente(codigo) {

        const token =
            localStorage.getItem("token");

        await api.delete(
            `/cliente/${codigo}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        listarClientes();
    }

    return (

        <div className="container">

            <h1>Clientes</h1>

            <div className="formulario">

                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) =>
                        setNome(e.target.value)
                    }
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) =>
                        setTelefone(e.target.value)
                    }
                />

                <button onClick={salvarCliente}>
                    Salvar
                </button>

            </div>

            <table>

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.codigo}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <button onClick={() =>
                                    excluirCliente(cliente.codigo)
                                }>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default Clientes;