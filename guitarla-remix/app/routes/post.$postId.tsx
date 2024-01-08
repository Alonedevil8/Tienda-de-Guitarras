import { useLoaderData } from "react-router";
import { getPost } from "../../models/posts.server";
import { Link } from "@remix-run/react";

import styles from "../styles/blog.css";
import { formatearFecha } from "utils/helpers";

export function meta({ data }) {
  return {
    title: `GuitarLA - ${data.data[0].attributes.nombre}`,
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export async function loader({ params }) {
  const url = params.postId;
  const post = await getPost(url);
  return post;
}

function Post() {
  const post = useLoaderData();

  const { titulo, contenido, imagen, publishedAt } = post.data[0].attributes;

  const imagenURL = imagen?.data?.attributes?.formats?.small?.url || "";
  const text = contenido?.[0]?.children?.[0]?.text;

  return (
    <div className="contenedor post mt-3">
      <img className="imagen" src={imagenURL} alt={titulo} />

      <div className="contenido">
        <h3>{titulo}</h3>
      </div>
      <p className="fecha1">{formatearFecha(publishedAt)}</p>
      <p className="descripcion">{text}</p>

      <Link className="enlace" to={"/blog"}>
        {" "}
        Volver{" "}
      </Link>
    </div>
  );
}

export default Post;
