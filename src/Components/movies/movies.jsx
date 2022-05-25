import SearchBarWithPhoto from "../common/searchbarwithphoto";
import MoviesColllection from "./moviesCollection";
import React from "react";
import "bulma/css/bulma.css";
import "../css/moviesCollection.css";

function Movies(props) {
  return (
    <React.Fragment>
      <SearchBarWithPhoto />
      <div className="container movie-collection-container">
        <div className="columns is-multiline p-0 pb-3 pt-5 last">
          <MoviesColllection type="upcoming" mediaType="movie" />
          <MoviesColllection type="popular" mediaType="movie" />
          <MoviesColllection type="top_rated" mediaType="movie" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Movies;
