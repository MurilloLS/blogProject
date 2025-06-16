import Layout from "./Paginas/Layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Postagem from "./Paginas/Postagem";
import PostagemCreate from "./Paginas/Postagem/create";
import PostagemUpdate from "./Paginas/Postagem/update";
import PostagemUnica from "./Paginas/Postagem/read";
import PostagemDelete from "./Paginas/Postagem/delete";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
            <Route index element={<Postagem />} />
            <Route path="postagem/:id" element={<PostagemUnica />} />
            <Route path="postagem/create" element={<PostagemCreate />} />
            <Route path="postagem/update/:id" element={<PostagemUpdate />} />
            <Route path="postagem/delete/:id" element={<PostagemDelete />} />            
            <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}