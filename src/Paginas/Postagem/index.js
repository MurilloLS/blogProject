import axios from "axios";
import { use, useEffect, useState } from "react";
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
        <div>
            <Link to= '/postagem/create'>Novo</Link>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th><br />
                        <th>Conteudo</th><br />
                        <th>Nome do autor</th><br />
                        <th>Data da atualização</th><br />
                        <th>Data da publicação</th><br />
                        <th>visualizações</th><br />
                        <th>Curtidas</th>
                    </tr>
                </thead>

                <tbody>
                    {postagens == null ? null : postagens.map(
                        (postagem) => (
                            <tr key={postagem.id}>
                                <td>{postagem.titulo}</td><br />
                                <td>{postagem.conteudo}</td><br />
                                <td>{postagem.nome_autor}</td><br />
                                <td>{postagem.data_atualizacao}</td><br />
                                <td>{postagem.data_publicacao}</td><br />
                                <td>{postagem.visualizacoes}</td><br />
                                <td>
                                    {postagem.curtidas}
                                    <button onClick={() => handleCurtir(postagem.id)}>
                                        Curtir
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/postagem/${postagem.id}`}>Visualizar</Link>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

