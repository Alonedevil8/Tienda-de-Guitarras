import { Link } from "@remix-run/react";
import logo from "../../public/img/logo.svg";
import Navegacion from "./navegacion";

function Header() {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/index" className="logo-link">
          <img className="logo" src={logo} alt="Imagen Logo"></img>
        </Link>
        <Navegacion />
      </div>
    </header>
  );
}

export default Header;
