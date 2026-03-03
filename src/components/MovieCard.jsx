function MovieCard({ title, image, rating }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", borderRadius: "5px" }}
      />
      <h3>{title}</h3>
      <p>⭐ {rating}</p>
    </div>
  );
}

export default MovieCard;
