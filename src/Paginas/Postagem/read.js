import axios from "axios";
import {useEffect, useState } from "react";
import {useParams, Link } from "react-router-dom";

export default function PostagemUnica() {
    const {id} = useParams();
    const [postagem, setPostagem] = useState([]);

    useEffect(
        function(){
            async function consultarPostagem(){
                try {
                    const resposta = await axios.get(`http://localhost:8000/api/postagens/${id}`);
                    console.log(resposta)
                    setPostagem(resposta.data);
                } catch (error) {
                    console.error("Erro ao consultar postagens:", error)
                }
            }

            consultarPostagem();
        },
        [id]
    )

    if (!postagem) return <div>Nenhuma postagem encontrada</div>;

    return(
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Ver Postagem</h1>
            <div key={postagem.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", width: "100%", maxWidth: "600px" }}>
                <table>
                    <tr><h2>{postagem.titulo}</h2></tr>
                    <tr><p>{postagem.conteudo}</p></tr>
                    <tr><p>Autor: {postagem.nome_autor}</p></tr>
                    <tr><p>Visualizações: {postagem.visualizacoes}</p></tr>
                    <tr><p>Curtidas: {postagem.curtidas}</p></tr>
                    <tr><Link to={`/postagem/update/${postagem.id}`}>Editar</Link></tr>
                    <tr><Link to={`/postagem/delete/${postagem.id}`}>Excluir</Link></tr>
                </table>
            </div>
            <Link to={`/`}>Voltar</Link>
        </div>
    )
}