import React from "react";
import SingleMovieCardHome from "../home/singleMovieCardHome";

function SearchedMovie(props) {
  return (
    <React.Fragment>
      <div className="column is-full search-collection">
        <p className="has-text-weight-bold has-text-white is-size-3 is-family-sans-serif search-collection-title">
          Movies
        </p>
        <hr className="search-hr" />
      </div>

      {props.searchData
        .filter((movie) => {
          return movie.media_type === "movie" && movie.poster_path !== null;
        })
        .map((movie) => {
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

export default SearchedMovie;
