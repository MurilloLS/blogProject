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
        <div>
            <h3>{postagem.nome}</h3>
            { status!='Produto excluído' ? <button onClick={confirmar} disabled={botaoStatus}>Confirmar Exclusão</button> : null }
            <Link to ={`/`}>Voltar</Link>
            <h3>{status}</h3>
        </div>
    )
}