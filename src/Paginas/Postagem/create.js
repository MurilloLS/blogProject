import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function PostagemCreate() {
    const [status, setStatus] = useState("");

    const titulo = useRef("");
    const conteudo = useRef("");
    const nomeAutor = useRef("");

    return(
        <div>
            <form onSubmit={ gravar }>
                titulo: <input type="text" ref={titulo} maxLength="100" required/><br />
                conteudo: <textarea ref={conteudo} maxLength="3000" required/><br />
                nome do autor: <input type="text" ref={nomeAutor} maxLength="100" required/><br />
                <button type="submit">Enviar</button>   
            </form>
            <h3>{status}</h3>
            <Link to="/">Voltar</Link>
        </div>
    )

    async function gravar(e) {
        e.preventDefault();

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

        try{
            const postagem = {
                titulo: titulo.current.value,
                conteudo: conteudo.current.value,
                nome_autor: nomeAutor.current.value,
                data_publicacao: formatDateToMySQL(new Date()),
                data_atualizacao: formatDateToMySQL(new Date()),
                visualizacoes: 0,
                comentarios: 0,
            }

            const resposta = await axios.post("http://127.0.0.1:8000/api/postagens", postagem);
            setStatus("Postagem criada com sucesso!");
            console.log(resposta);
        } catch (error) {
            console.error("Erro ao criar postagem:", error);
            setStatus("Erro ao criar postagem.");
        } 
    }
}