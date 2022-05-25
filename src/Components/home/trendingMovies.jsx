import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.css";
import SingleMovieCardHome from "./singleMovieCardHome";
import "../css/latestmovie.css";
import movieServices from "../../services/moviesServices";

function TrendingMovies(props) {
  const componentMounted = useRef(true);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getTrendingMovies = async () => {
    const { data } = await movieServices.getTrendingMovies();
    const { results } = data;
    const trMovies = [...results];
    setTrendingMovies(trMovies);
  };

  useEffect(() => {
    if (componentMounted.current) {
      getTrendingMovies();
    }
    return () => {
      componentMounted.current = false;
    };
  });

  return (
    <React.Fragment>
      <div className="column is-full movie-category">
        <p className="has-text-weight-bold has-text-white is-size-3 is-family-sans-serif">
          Trending Movies
        </p>
        <hr className="latest-movie-hr" />
      </div>
      {trendingMovies.slice(0, 10).map((movie) => {
        return (
          <SingleMovieCardHome
            key={movie.id}
            id={movie.id}
            imgURL={movie.poster_path}
            type="movies"
          />
        );
      })}
    </React.Fragment>
  );
}

export default TrendingMovies;
