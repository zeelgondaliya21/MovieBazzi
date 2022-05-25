import React, { useEffect, useState, useRef } from "react";
import movieServices from "../../services/moviesServices";
import SingleMovieCardHome from "../home/singleMovieCardHome";

function MoviesColllection(props) {
  const [movies, setMovies] = useState([]);
  const componentMounted = useRef(true);

  const getMoviesList = async () => {
    const { data } = await movieServices.getCollections(
      props.mediaType,
      props.type
    );
    const { results } = data;
    const temp = [...results];
    setMovies([...temp]);
  };

  useEffect(() => {
    if (componentMounted.current) {
      getMoviesList();
    }
    return () => {
      componentMounted.current = false;
    };
  });

  return (
    <React.Fragment>
      <div className="column is-full movie-collection">
        <p className="has-text-weight-bold has-text-white is-size-3 is-family-sans-serif movie-collection-title">
          {props.type === "popular" &&
            props.mediaType === "movie" &&
            "Popular Movies"}
          {props.type === "top_rated" &&
            props.mediaType === "movie" &&
            "Top Rated Movies"}
          {props.type === "upcoming" &&
            props.mediaType === "movie" &&
            "Upcoming Movies"}
          {props.type === "popular" &&
            props.mediaType === "tv" &&
            "Popular TV Shows"}
          {props.type === "top_rated" &&
            props.mediaType === "tv" &&
            "Top Rated TV Shows"}
          {props.type === "upcoming" &&
            props.mediaType === "tv" &&
            "Upcoming TV Shows"}
        </p>
        <hr className="latest-movie-hr" />
      </div>
      {movies.map((m) => {
        return (
          <SingleMovieCardHome
            key={m.id}
            id={m.id}
            imgURL={m.poster_path}
            type={props.mediaType === "movie" ? "movies" : "tvshows"}
          />
        );
      })}
    </React.Fragment>
  );
}

export default MoviesColllection;
