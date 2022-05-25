import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.css";
import SingleMovieCardHome from "./singleMovieCardHome";
import "../css/latestmovie.css";
import movieServices from "../../services/moviesServices";

function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const componentMounted = useRef(true);

  // const getUpcoming = async (isMounted) => {
  //   if (isMounted) {
  //     return;
  //   }

  //   const { data } = await movieServices.getUpcomingMovies();
  //   const { results } = data;
  //   const upMovies = [...results];
  //   setUpcomingMovies(upMovies);
  // };

  // useEffect(() => {
  //   let isMounted = false;
  //   getUpcoming(isMounted);

  //   return () => {
  //     isMounted = true;
  //   };
  // });

  const getUpcoming = async () => {
    const { data } = await movieServices.getUpcomingMovies();
    const { results } = data;
    const upMovies = [...results];
    setUpcomingMovies(upMovies);
  };

  useEffect(() => {
    if (componentMounted.current) {
      getUpcoming();
    }
    return () => {
      componentMounted.current = false;
    };
  });

  return (
    <React.Fragment>
      <div className="column is-full movie-category">
        <p className="has-text-weight-bold has-text-white is-size-3 is-family-sans-serif">
          Upcoming Movies
        </p>
        <hr className="latest-movie-hr" />
      </div>
      {upcomingMovies.slice(0, 5).map((movie) => {
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

export default UpcomingMovies;
