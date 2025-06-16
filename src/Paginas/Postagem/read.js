import axios from "axios";
import {useEffect, useRef, useState } from "react";
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
        <div>
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
                    {
                        <tr key={postagem.id}>
                            <td>{postagem.titulo}</td><br />
                            <td>{postagem.conteudo}</td><br />
                            <td>{postagem.nome_autor}</td><br />
                            <td>{postagem.data_atualizacao}</td><br />
                            <td>{postagem.data_publicacao}</td><br />
                            <td>{postagem.visualizacoes}</td><br />
                            <td>{postagem.curtidas}</td>
                            <td>
                                <Link to={`/postagem/update/${postagem.id}`}>Editar</Link>
                            </td>
                            <td>
                                <Link to={`/postagem/delete/${postagem.id}`}>Excluir</Link>
                            </td>
                            <td>
                                <Link to="/">Voltar</Link>
                            </td>
                        </tr>
                            
                    }
                </tbody>
            </table>
        </div>
    )
}