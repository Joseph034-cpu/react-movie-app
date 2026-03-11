import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
} from "./api/movieApi";

import inceptionImg from "./assets/images/inception.jpg";
import interstellarImg from "./assets/images/interstellar.jpg";
import darkKnightImg from "./assets/images/dark-knight.jpg";
import avengersImg from "./assets/images/avengers.jpg";
import jokerImg from "./assets/images/joker.jpg";
import matrixImg from "./assets/images/matrix.jpg";
import thorImg from "./assets/images/thor.jpg";
import spidermanImg from "./assets/images/spiderman.jpg";
import johnWickImg from "./assets/images/john-wick.jpg";
import blackPantherImg from "./assets/images/black-panther.jpg";

function App() {
  // ---------- TOP LEVEL HOOKS ----------
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies
      ? JSON.parse(savedMovies)
      : [
          {
            id: 1,
            title: "Inception",
            image: inceptionImg,
            rating: 8.8,
            isFavorite: false,
          },
          {
            id: 2,
            title: "Interstellar",
            image: interstellarImg,
            rating: 8.6,
            isFavorite: false,
          },
          {
            id: 3,
            title: "The Dark Knight",
            image: darkKnightImg,
            rating: 9.0,
            isFavorite: false,
          },
          {
            id: 4,
            title: "Avengers",
            image: avengersImg,
            rating: 8.0,
            isFavorite: false,
          },
          {
            id: 5,
            title: "Joker",
            image: jokerImg,
            rating: 8.5,
            isFavorite: false,
          },
          {
            id: 6,
            title: "The Matrix",
            image: matrixImg,
            rating: 8.7,
            isFavorite: false,
          },
          {
            id: 7,
            title: "Thor",
            image: thorImg,
            rating: 7.9,
            isFavorite: false,
          },
          {
            id: 8,
            title: "Spiderman",
            image: spidermanImg,
            rating: 8.2,
            isFavorite: false,
          },
          {
            id: 9,
            title: "John Wick",
            image: johnWickImg,
            rating: 8.4,
            isFavorite: false,
          },
          {
            id: 10,
            title: "Black Panther",
            image: blackPantherImg,
            rating: 7.8,
            isFavorite: false,
          },
        ];
  });

  const [loading, setLoading] = useState(true); // ✅ TOP LEVEL
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  // ---------- FETCH MOVIES ----------
  useEffect(() => {
    const loadMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, []);

  // ---------- SAVE TO LOCAL STORAGE ----------
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // ---------- HANDLERS ----------
  const handleSearch = async (query) => {
    setSearchQuery(query);

    // if search box is empty, load popular movies again
    if (!query) {
      const movies = await getPopularMovies();
      setMovies(movies);
      return;
    }

    // search movies from API
    const results = await searchMovies(query);
    setMovies(results);
  };

  const toggleFavorite = (id) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie,
    );
    setMovies(updatedMovies);
  };

  const openMovie = async (movie) => {
    const details = await getMovieDetails(movie.id);
    const trailer = await getMovieTrailer(movie.id);

    setSelectedMovie({
      ...movie,
      overview: details.overview,
      releaseDate: details.release_date,
    });

    setTrailerKey(trailer);
  };
  const closeMovie = () => setSelectedMovie(null);

  // ---------- FILTERED MOVIES ----------
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const favoriteMovies = movies.filter((movie) => movie.isFavorite);

  // ---------- RENDER ----------
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Header />
      <SearchBar onSearch={handleSearch} />

      {favoriteMovies.length > 0 && (
        <>
          <h2 style={{ textAlign: "center" }}>⭐ Your Favorites</h2>
          <MovieList
            movies={favoriteMovies}
            onToggleFavorite={toggleFavorite}
            onSelectMovie={openMovie}
          />
        </>
      )}

      <h2 style={{ textAlign: "center" }}>All Movies</h2>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading movies...</p>
      ) : (
        <MovieList
          movies={filteredMovies}
          onToggleFavorite={toggleFavorite}
          onSelectMovie={openMovie}
        />
      )}

      {selectedMovie && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "320px",
              textAlign: "center",
              color: "black",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <h2>{selectedMovie.title}</h2>

            <p>⭐ {selectedMovie.rating}</p>

            <p>{selectedMovie.overview}</p>

            {trailerKey && (
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}

            <p>
              <strong>Release Date:</strong> {selectedMovie.releaseDate}
            </p>

            <button
              onClick={closeMovie}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
