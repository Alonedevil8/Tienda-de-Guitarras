import { Link } from "@remix-run/react";
import { formatearFecha } from "../../utils/helpers";

function Post({ post }) {
  const { publishedAt, titulo, contenido, url, imagen } = post;

  const texto = (contenido && contenido[0]?.children[0]?.text) || "";

  return (
    <article className="post">
      <img
        className="imagen"
        src={imagen.data.attributes.formats.small.url}
        alt="Descripción de la imagen"
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="resumen">{texto}</p>
        <Link className="enlace" to={`/post/${url}`}>
          Ver Blog
        </Link>
      </div>
    </article>
  );
}

export default Post;
