export async function getCurso() {
  const respuesta = await fetch(`${process.env.API_URL_C}`);
  return await respuesta.json();
}
