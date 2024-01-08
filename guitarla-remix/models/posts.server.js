export async function getPosts() {
  const respuesta = await fetch(`${process.env.API_URL_POST}`);
  return await respuesta.json();
}

export async function getPost(url) {
  const respuesta = await fetch(`${process.env.API_URL_POST1}[url]=${url}&populate=imagen`);
  return await respuesta.json();
}
