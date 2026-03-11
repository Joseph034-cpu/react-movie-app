import axios from "axios";

const API_KEY = "369dc7041cb7108f9060cbda8fd6e9c6";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const getPopularMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  return response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    image: IMAGE_BASE_URL + movie.poster_path,
    isFavorite: false
  }));
};

// search movies
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  return response.data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    image: IMAGE_BASE_URL + movie.poster_path,
    isFavorite: false
  }));
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );

  return response.data;
};

export const getMovieTrailer = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  const trailer = response.data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return trailer ? trailer.key : null;
};
