import Guitarra from "./guitarra";

function ListadoGuitarras({ guitarras }) {
  return (
    <div>
      <h2 className="heading">Listado De Guitarras</h2>
      {guitarras.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra) => (
            <Guitarra guitarra={guitarra.attributes} key={guitarra.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListadoGuitarras;
