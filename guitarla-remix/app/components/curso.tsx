import { formatearFecha } from "../../utils/helpers";

function Curso({ cursos }) {
  const { titulo, contenido, publishedAt, imagen } = cursos;
  const texto = (contenido && contenido[0]?.children[0]?.text) || "";

  return (
    <section className="curso">
      <style jsx="true">
        {`
          .curso {
            background-image: linear-gradient(
                to right,
                rgb(0 0 0 / 0.65),
                rgb(0 0 0 /0.7)
              ),
              url(${imagen.data.attributes.formats.large.url});
          }
        `}
      </style>

      <div className="contenedor curso-grip">
        <div className="contenido">
          <p className="texto1">{formatearFecha(publishedAt)}</p>
          <h2 className="heading"> {titulo} </h2>
          <p className="texto">{texto}</p>
        </div>
      </div>
    </section>
  );
}

export default Curso;
