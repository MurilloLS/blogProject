import axios from 'axios';
import { use, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PostagemUpdate() {
    const {id} = useParams();
    const [status, setStatus] = useState("");
    
    const titulo = useRef("");
    const conteudo = useRef("");
    const nomeAutor = useRef("");

    function formatDateToMySQL(date) {
        // pega o timestamp em ms
        const timestamp = date.getTime();
        // calcula o offset UTC-3 em ms
        const offset = 3 * 60 * 60 * 1000;
        // ajusta a data subtraindo 3 horas para chegar no UTC de Brasília
        const dateBrasilia = new Date(timestamp - offset);

        const pad = (n) => n.toString().padStart(2, "0");
        const year = dateBrasilia.getUTCFullYear();
        const month = pad(dateBrasilia.getUTCMonth() + 1);
        const day = pad(dateBrasilia.getUTCDate());
        const hours = pad(dateBrasilia.getUTCHours());
        const minutes = pad(dateBrasilia.getUTCMinutes());
        const seconds = pad(dateBrasilia.getUTCSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    useEffect(()=>{
        async function consultar() {
            const resposta = await axios.get(`http://localhost:8000/api/postagens/${id}`);
            titulo.current.value = resposta.data.titulo;
            conteudo.current.value = resposta.data.conteudo;
            nomeAutor.current.value = resposta.data.nome_autor;
    }
        consultar();
    }, []);


    async function gravar(e) {
        e.preventDefault();

        const json = {
            titulo: titulo.current.value,
            conteudo: conteudo.current.value,
            nome_autor: nomeAutor.current.value,
            data_atualizacao: formatDateToMySQL(new Date()),
        };

        try {
            const resposta = await axios.put(`http://localhost:8000/api/postagens/${id}`, json);
            setStatus("Postagem atualizada com sucesso!");
            console.log(resposta);
        } catch (error) {
            console.error("Erro ao atualizar postagem:", error);
            setStatus("Erro ao atualizar postagem.");
        }
    }

    return (
        <div>
            <form onSubmit={gravar}>
                Titulo: <input type="text" ref={titulo} maxLength="100" required /><br />
                Conteudo: <textarea ref={conteudo} maxLength="3000" required /><br />
                Nome do autor: <input type="text" ref={nomeAutor} maxLength="100" required /><br />
                <button type="submit">Enviar</button>
            </form>
            <h3>{status}</h3>
            <Link to={`/`}>Voltar</Link>
        </div>
    )
}