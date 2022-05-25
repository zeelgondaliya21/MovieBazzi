import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.css";
import SingleMovieCardHome from "./singleMovieCardHome";
import "../css/latestmovie.css";
import movieServices from "../../services/moviesServices";

function TrendingTVShows(props) {
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const componentMounted = useRef(true);

  const getTrendingTVShows = async () => {
    const { data } = await movieServices.getTrendingTVShows();
    const { results } = data;
    const tvMovies = [...results];
    setTrendingTVShows(tvMovies);
  };

  useEffect(() => {
    if (componentMounted.current) {
      getTrendingTVShows();
    }
    return () => {
      componentMounted.current = false;
    };
  });

  return (
    <React.Fragment>
      <div className="column is-full movie-category">
        <p className="has-text-weight-bold has-text-white is-size-3 is-family-sans-serif">
          Trending TV Shows
        </p>
        <hr className="latest-movie-hr" />
      </div>
      {trendingTVShows.slice(0, 10).map((movie) => {
        return (
          <SingleMovieCardHome
            key={movie.id}
            id={movie.id}
            imgURL={movie.poster_path}
            type="tvshows"
          />
        );
      })}
    </React.Fragment>
  );
}

export default TrendingTVShows;
