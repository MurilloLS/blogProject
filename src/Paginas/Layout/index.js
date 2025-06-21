import {Link, Outlet} from "react-router-dom";
import "./Layout.scss";

export default function Layout() {
  return (
    <div>
        <nav className="menu">
            <Link to="/" className="link">Postagens</Link>
            <Link to="/postagem/create" className="link">Publicar</Link>
        </nav>

        <div className="grade">
            <div className="lateral"></div>
            <Outlet />
            <div className="lateral"></div>
        </div>
    </div>
  );
}