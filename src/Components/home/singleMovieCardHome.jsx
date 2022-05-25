import React from "react";
import { Link } from "react-router-dom";
import "../css/latestmovie.css";

function singleMovieCardHome(props) {
  const singlePageRedirect = "/" + props.type + "/" + props.id;

  if (props.isFromWatchList) {
    const imgURL = "https://image.tmdb.org/t/p/w92" + props.imgURL;
    return (
      <Link to={singlePageRedirect}>
        <img src={imgURL} alt={props.id} />
      </Link>
    );
  }
  const imgURL = "https://image.tmdb.org/t/p/w300" + props.imgURL;

  return (
    <div className="column is-one-fifth has-text-centered is-gapless">
      <Link to={singlePageRedirect}>
        <img className="latest-movie-img" src={imgURL} alt={props.id} />
      </Link>
    </div>
  );
}

export default singleMovieCardHome;
