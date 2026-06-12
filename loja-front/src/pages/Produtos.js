import { useEffect, useState } from "react";
import api from "../services/api";
import "./Produtos.css";

function Produtos() {

    const [produtos, setProdutos] =
        useState([]);

    const [codigo, setCodigo] =
        useState(null);

    const [nome, setNome] =
        useState("");

    const [descricao, setDescricao] =
        useState("");

    const [preco, setPreco] =
        useState("");

    useEffect(() => {
        listarProdutos();
    }, []);

    function getToken() {
        return localStorage.getItem("token");
    }

    async function listarProdutos() {

        const response = await api.get(
            "/produto",
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );

        setProdutos(response.data);
    }

    async function salvarProduto() {

        if (codigo) {
            await api.put(
                `/produto/${codigo}`,
                { codigo, nome, descricao, preco: parseFloat(preco) },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );
        } else {
            await api.post(
                "/produto",
                { nome, descricao, preco: parseFloat(preco) },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );
        }

        limparFormulario();
        listarProdutos();
    }

    async function excluirProduto(cod) {

        await api.delete(
            `/produto/${cod}`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );

        listarProdutos();
    }

    function editarProduto(produto) {
        setCodigo(produto.codigo);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
    }

    function limparFormulario() {
        setCodigo(null);
        setNome("");
        setDescricao("");
        setPreco("");
    }

    return (

        <div className="container">

            <h1>Produtos</h1>

            <div className="formulario">

                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <input
                    placeholder="Preço"
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />

                <button onClick={salvarProduto}>
                    {codigo ? "Atualizar" : "Salvar"}
                </button>

                {codigo && (
                    <button
                        onClick={limparFormulario}
                        style={{ background: "#6c757d" }}
                    >
                        Cancelar
                    </button>
                )}

            </div>

            <table>

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.codigo}>
                            <td>{produto.nome}</td>
                            <td>{produto.descricao}</td>
                            <td>R$ {produto.preco}</td>
                            <td>
                                <button
                                    onClick={() => editarProduto(produto)}
                                    style={{ background: "#ffc107", marginRight: "5px" }}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => excluirProduto(produto.codigo)}
                                >
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

export default Produtos;