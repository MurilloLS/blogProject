import {Link, Outlet} from "react-router-dom";
import "./Layout.scss";

export default function Layout() {
  return (
    <div>
        <nav className="menu">
            <ul>
                <li><Link to="/">Postagens</Link></li>
                <li><Link to="/postagem/create">Publicar</Link></li>
            </ul>
        </nav>

        <div className="grade">
            <div className="lateral">x</div>
            <Outlet />
            <div className="lateral">y</div>
        </div>
    </div>
  );
}