import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router";
import { getGuitarra } from "../../models/guitarras.server";
import { Link } from "@remix-run/react";

import styles from "../styles/guitarras.css";
import styles1 from "../styles/carrito.css";

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
    {
      rel: "stylesheet",
      href: styles1,
    },
  ];
}

export async function loader({ params }) {
  const url = params.guitarId;
  const guitarra = await getGuitarra(url);
  return guitarra;
}

function Guitarra() {
  const guitarra = useLoaderData();
  const { agregarCarrito } = useOutletContext();

  const [cantidad, setCantidad] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cantidad < 1) {
      alert("Debe Seleccionar Una Guitarra");
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen:
        guitarra.data[0].attributes.imagen?.data?.attributes?.formats?.small
          ?.url,
      nombre,
      precio,
      cantidad,
    };
    agregarCarrito(guitarraSeleccionada);
  };

  // Asegúrate de que guitarra.data[0].attributes y otras propiedades existan antes de acceder a ellas
  const nombre = guitarra.data[0].attributes.nombre || "Nombre no disponible";

  const descripcion =
    guitarra.data[0].attributes.descripcion?.[0]?.children?.[0]?.text ||
    "Descripción no disponible";

  const imagen =
    guitarra.data[0].attributes.imagen?.data?.attributes?.formats?.small?.url ||
    "";

  const precio = guitarra.data[0].attributes.precio || "Precio no disponible";

  return (
    <div className="contenedor guitarra">
      <img src={imagen} alt={nombre} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad"> Cantidad: </label>
          <select
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            id="cantidad"
          >
            <option value="0"> --Seleccione -- </option>
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
          </select>
          <input type="submit" value="Agregar al Carrito" />
        </form>
      </div>
      <div>
        <Link className="enlace1" to={"/tienda"}>
          {" "}
          Volver{" "}
        </Link>

        <Link className="enlace1" to={"/carrito"}>
          {" "}
          Carrito{" "}
        </Link>
      </div>
    </div>
  );
}

export default Guitarra;
