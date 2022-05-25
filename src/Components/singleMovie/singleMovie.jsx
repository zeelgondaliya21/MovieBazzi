import React from "react";
import { useParams } from "react-router-dom";
import SingleMovieBody from "./singleMovieBody";

function SingleMovie(props) {
  const { id } = useParams();
  return (
    <React.Fragment>
      <SingleMovieBody movieID={id} />
    </React.Fragment>
  );
}

export default SingleMovie;
