import React from "react";

function SingleTVCover(props) {
  const imgURL = "https://image.tmdb.org/t/p/w780" + props.imgURL;
  return (
    <div
      className="movie-cover"
      style={{
        backgroundImage: `url("${imgURL}")`,
      }}
    ></div>
  );
}

export default SingleTVCover;
