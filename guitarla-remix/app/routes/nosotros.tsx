import imagen from "../../public/img/nosotros.jpg";
import styles from "../styles/nosotros.css";

import { MetaFunction, Links } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Projects" }];
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "imagen",
    },
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading"> Nosotros </h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen Sobre Nosotros"></img>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            eleifend, metus efficitur molestie elementum, risus nunc dictum
            magna, id faucibus elit sem et odio. Quisque cursus et nunc et
            vehicula. Integer consequat interdum mauris, in auctor arcu
            sollicitudin in. Nam eu dolor neque. Vestibulum vel egestas sem.
            Aenean gravida, odio ultrices accumsan varius, arcu quam aliquet
            lorem, ut aliquam mauris nulla sit amet justo.
          </p>
          <p>
            {" "}
            Donec sapien orci, efficitur ac blandit eget, lobortis sit amet
            tellus. Vivamus bibendum accumsan nisl, eu luctus eros lacinia
            sagittis. Nunc non lacus eros. Phasellus rhoncus mollis felis nec
            venenatis. Phasellus non libero et lorem sagittis luctus.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
