import styles from "./styles/index.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/header";
import Footer from "./components/footer";

import {
  Links,
  Outlet,
  Scripts,
  LiveReload,
  MetaFunction,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

// Función que proporciona los enlaces que se incluirán en la cabecera HTML
export function links() {
  return [
    // Normaliza el estilo en todos los navegadores
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    // Importa los estilos locales de la aplicación
    {
      rel: "stylesheet",
      href: styles,
    },
    // Conecta con el servicio de fuentes de Google
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    // Importa la fuente Lato desde Google Fonts
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit&display=swap",
    },
  ];
}

// Componente principal de la aplicación
export default function App() {
  const carritoLs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : null;

  // Estado para almacenar el carrito de compras
  const [carrito, setCarrito] = useState(carritoLs);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar una guitarra al carrito
  const agregarCarrito = (guitarra) => {
    // Verificar si la guitarra ya está en el carrito
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Si ya existe, actualiza la cantidad
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });
      setCarrito(carritoActualizado);
    } else {
      // Si no existe, agrégala al carrito
      setCarrito([...carrito, guitarra]);
    }
  };

  // Función para modificar la cantidad de guitarras en el carrito
  const actualizarCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };

  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter(
      (guitarraState) => guitarraState.id !== id
    );
    setCarrito(carritoActualizado);
  };

  // Renderiza la aplicación con la estructura HTML básica
  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}

// Función para definir metadatos de la página
export const meta: MetaFunction = () => {
  return {
    title: "Ryan's Blog",
    description: "This is my blog",
    "twitter:card": "summary_large_image",
    "og:description": "...",
    "og:image": "...",
  };
};

// Componente para definir la estructura básica del documento HTML
function Document({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Configuración básica del documento */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Incluye los enlaces especificados anteriormente */}
        <Links />
      </head>

      <body>
        {/* Encabezado común para todas las páginas */}
        <Header />
        {/* Contenido específico de la página actual */}
        {children}
        {/* Pie de página común para todas las páginas */}
        <Footer />

        {/* Scripts necesarios para la aplicación */}
        <Scripts />
        {/* Recarga en vivo para desarrollo */}
        <LiveReload />
      </body>
    </html>
  );
}

// Componente para manejar errores de ruta
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      // Página no encontrada: error 404
      return (
        <Document>
          <p className="error">
            {error.status}: Página no encontrada - La ruta especificada no
            existe.
            <p></p>
            <Link className="error-enlace" to="/">
              Volver
            </Link>
          </p>
        </Document>
      );
    } else {
      // Manejar otros errores
      return (
        <Document>
          <p className="error">
            {error.status} {error.status.text}
          </p>
        </Document>
      );
    }
  }

  return null;
}
