import { Link } from "@remix-run/react";

function Guitarra({ guitarra }) {
  // Destructure properties from the guitarra object
  const { nombre, descripcion, precio, url, imagen } = guitarra;

  // Check if descripcion exists and has the required structure
  const texto = descripcion && descripcion[0]?.children[0]?.text || '';

  return (
    <div className="guitarra">

      <img src={imagen.data.attributes.formats.small.url} alt={nombre} />
      <div className="contenido">
        <h3>{nombre} </h3>
        <p className="descripcion">{texto}</p>
        <p className="precio">${precio}</p>

        <Link className="enlace" to={`/guitarras/${url}`}> Ver Producto </Link>

      </div>
    </div>
  );
}

export default Guitarra;
