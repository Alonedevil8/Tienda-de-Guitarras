import { getGuitarras } from "../../models/guitarras.server";
import { getPosts } from "../../models/posts.server";
import { getCurso } from "../../models/cursos.server";

import { useLoaderData } from "react-router";

import ListadoGuitarras from "../components/listado-guitarras";
import Post from "../components/post";
import Curso from "../components/curso";

import styles from "../styles/guitarras.css";
import stylespost from "../styles/blog.css";
import stylescurso from "../styles/curso.css";

export function meta() {}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: stylespost,
    },
    {
      rel: "stylesheet",
      href: stylescurso,
    },
  ];
}

export async function loader() {
  const [guitarras, posts, cursos] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso(),
  ]);

  return { guitarras: guitarras.data, posts: posts.data, cursos: cursos.data };
}

function Index() {
  const { guitarras, posts, cursos } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <h1> Inicio </h1>
        <ListadoGuitarras guitarras={guitarras} />
      </main>

      <section>
        <Curso key={cursos.id} cursos={cursos.attributes} />
      </section>

      <section className="contenedor">
        <h2 className="heading">Blog</h2>
        <div className="blog">
          {posts.map((post) => (
            <Post key={post.id} post={post.attributes} />
          ))}
        </div>
      </section>
    </>
  );
}
export default Index;
