export async function getGuitarras() {
  const respuesta = await fetch(`${process.env.API_URL}`);
  return await respuesta.json();
}

export async function getGuitarra(url) {
  const respuesta = await fetch(`${process.env.API_URL1}[url]=${url}&populate=imagen`);
  return await respuesta.json();
}

