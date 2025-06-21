import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PostagemDelete() {
    const {id} = useParams();
    const [postagem, setPostagem] = useState({});
    const [status, setStatus] = useState('');
    const [botaoStatus, setBotaoStatus] = useState(true);

    useEffect(() => {
        async function consultarPostagem() {
            const resposta = await axios.get(`http://localhost:8000/api/postagens/${id}`);
            setPostagem(resposta.data);
            setBotaoStatus(false);
            
        }

        consultarPostagem();
    }, []);

    async function confirmar(e){
        try {
            const resposta = await axios.delete(`http://localhost:8000/api/postagens/${id}`);
            setStatus("Postagem excluída com sucesso!");
            setPostagem({});
        } catch (error) {
            console.error("Erro ao excluir postagem:", error);
            setStatus("Erro ao excluir postagem.");
        }
    }

    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Excluir Postagem</h1>
            <div key={postagem.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", width: "100%", maxWidth: "600px" }}>
                { status === 'Produto excluído' ? <h2>Postagem excluída</h2> : 
                    <table>
                        <tr><h2>{postagem.titulo}</h2></tr>
                        <tr><p>{postagem.conteudo}</p></tr>
                        <tr><p>Autor: {postagem.nome_autor}</p></tr>
                        <tr><p>Visualizações: {postagem.visualizacoes}</p></tr>
                        <tr><p>Curtidas: {postagem.curtidas}</p></tr>
                    </table>
                }
            </div>
            <table>
                <tr><h2>Deseja mesmo excluir a postagem?</h2></tr>
                <tr>{ status!='Produto excluído' ? <button onClick={confirmar} disabled={botaoStatus}>Confirmar Exclusão</button> : null }</tr>
                <tr><Link to ={`/`}>Voltar</Link></tr>
                <tr><h3>{status}</h3></tr>
            </table>
        </div>
    )
}