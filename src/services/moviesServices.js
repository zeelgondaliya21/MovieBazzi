import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

export async function getTrendingMovies() {
  return await axios.get(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=" + api_key
  );
}

export async function getTrendingTVShows() {
  return await axios.get(
    "https://api.themoviedb.org/3/trending/tv/week?api_key=" + api_key
  );
}

export async function getUpcomingMovies() {
  return await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
      api_key +
      "&language=en-US&page=1"
  );
}

export async function getCollections(mediaType, type) {
  const reqURL =
    "https://api.themoviedb.org/3/" +
    mediaType +
    "/" +
    type +
    "?api_key=" +
    api_key +
    "&language=en-US&page=1";
  // "&language=en-US&page=1&region=IN";

  return await axios.get(reqURL);
}

export async function getSearchQueryDetails(query) {
  return await axios.get(
    "https://api.themoviedb.org/3/search/multi?api_key=" +
      api_key +
      "&language=en-US&query=" +
      query +
      "&page=1&include_adult=false"
  );
}

export async function getMoviesDetails(mediaType, id) {
  return await axios.get(
    "https://api.themoviedb.org/3/" +
      mediaType +
      "/" +
      id +
      "?api_key=" +
      api_key
  );
}

export async function getCastDetails(mediaType, id) {
  const castURL =
    "https://api.themoviedb.org/3/" +
    mediaType +
    "/" +
    id +
    "/credits?api_key=" +
    api_key +
    "&language=en-US";
  return await axios.get(castURL);
}

export async function getRecommendationDetails(mediaType, id) {
  return await axios.get(
    "https://api.themoviedb.org/3/" +
      mediaType +
      "/" +
      id +
      "/recommendations?api_key=" +
      api_key +
      "&language=en-US&page=1"
  );
}

export async function getWatchProviderDetails(mediaType, id) {
  return await axios.get(
    "https://api.themoviedb.org/3/" +
      mediaType +
      "/" +
      id +
      "/watch/providers?api_key=" +
      api_key
  );
}

export async function getTrailerDetails(mediaType, id) {
  return await axios.get(
    "https://api.themoviedb.org/3/" +
      mediaType +
      "/" +
      id +
      "/videos?api_key=" +
      api_key +
      "&language=en-US"
  );
}

const movieServices = {
  getTrendingMovies,
  getTrendingTVShows,
  getUpcomingMovies,
  getCollections,
  getSearchQueryDetails,
  getMoviesDetails,
  getCastDetails,
  getRecommendationDetails,
  getTrailerDetails,
  getWatchProviderDetails,
};

export default movieServices;
