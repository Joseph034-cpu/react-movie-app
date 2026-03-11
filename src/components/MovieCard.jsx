function MovieCard({
  id,
  title,
  image,
  rating,
  isFavorite,
  onToggleFavorite,
  onSelectMovie,
}) {
  return (
    <div
      onClick={() => onSelectMovie({ id, title, image, rating, isFavorite })}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", borderRadius: "5px" }}
      />
      <h3>{title}</h3>
      <p>⭐ {rating}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(id);
        }}
        style={{
          padding: "5px 10px",
          backgroundColor: isFavorite ? "red" : "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>
    </div>
  );
}

export default MovieCard;
