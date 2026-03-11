import MovieCard from "./MovieCard";

function MovieList({ movies, onToggleFavorite, onSelectMovie }) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          onToggleFavorite={onToggleFavorite}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;
