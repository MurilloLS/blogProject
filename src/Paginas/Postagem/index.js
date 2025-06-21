import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Postagem() {
    const [postagens, setPostagens] = useState([]);

    useEffect(
        function(){
            async function consultar(){
                try {
                    const resposta = await axios.get("http://localhost:8000/api/postagens");
                    console.log(resposta)
                    setPostagens(resposta.data);

                } catch (error) {
                    console.error("Erro ao consultar postagens:", error)
                }
            }

            consultar();
        },
        []
    )

    // Função para curtir (atualiza no banco)
    async function handleCurtir(postId) {
        try {
            // 1. Atualiza no banco
            await axios.put(`http://localhost:8000/api/postagens/${postId}`, {
                curtidas: postagens.find(p => p.id === postId).curtidas + 1
            });
            
            // 2. Atualiza o estado local
            setPostagens(postagens.map(post => 
                post.id === postId 
                    ? { ...post, curtidas: post.curtidas + 1 } 
                    : post
            ));
            
        } catch (error) {
            console.error("Erro ao curtir:", error);
        }
    }

    return(
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Todas as Postagens</h1>
            {postagens == null ? null : postagens.map(
                (postagem) => (
                    <div key={postagem.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", width: "100%", maxWidth: "600px" }}>
                        <table>
                            <tr><h2>{postagem.titulo}</h2></tr>
                            <tr><p>{postagem.conteudo}</p></tr>
                            <tr><p>Autor: {postagem.nome_autor}</p></tr>
                            <tr><p>Visualizações: {postagem.visualizacoes}</p></tr>
                            <tr><p>Curtidas: {postagem.curtidas}</p></tr>
                            <tr><button onClick={() => handleCurtir(postagem.id)}>Curtir</button></tr>
                            <tr><Link to={`/postagem/${postagem.id}`}>Visualizar</Link></tr>
                        </table>
                    </div>
                )
            )}
        </div>
    )
}

