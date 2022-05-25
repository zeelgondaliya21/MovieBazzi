import React from "react";
import "bulma/css/bulma.css";
import SearchBarWithPhoto from "../common/searchbarwithphoto";
import MoviesColllection from "../movies/moviesCollection";

function TVShows(props) {
  return (
    <React.Fragment>
      <SearchBarWithPhoto />
      <div className="container movie-collection-container">
        <div className="columns is-multiline p-0 pb-3 pt-5 last">
          <MoviesColllection type="popular" mediaType="tv" />
          <MoviesColllection type="top_rated" mediaType="tv" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TVShows;
