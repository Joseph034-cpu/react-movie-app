import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

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
  const [searchQuery, setSearchQuery] = useState("");

  // Movies array
  const movies = [
    { id: 1, title: "Inception", image: inceptionImg, rating: 8.8 },
    { id: 2, title: "Interstellar", image: interstellarImg, rating: 8.6 },
    { id: 3, title: "The Dark Knight", image: darkKnightImg, rating: 9.0 },
    { id: 4, title: "Avengers", image: avengersImg, rating: 8.0 },
    { id: 5, title: "Joker", image: jokerImg, rating: 8.5 },
    { id: 6, title: "The Matrix", image: matrixImg, rating: 8.7 },
    { id: 7, title: "Thor", image: thorImg, rating: 7.9 },
    { id: 8, title: "Spiderman", image: spidermanImg, rating: 8.2 },
    { id: 9, title: "John Wick", image: johnWickImg, rating: 8.4 }, // updated
    { id: 10, title: "Black Panther", image: blackPantherImg, rating: 7.8 },
  ];

  // Update search query
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter movies based on search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;
