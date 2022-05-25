import React, { useEffect, useState } from "react";
import "../css/singleMovieBody.css";
import SingleMovieRecommendation from "./singleMovieRecommendation";
import SingleMovieWatchNow from "./singleMovieWatchNow";
import SingleMovieTrailer from "./singleMovieTrailer";
import movieServices from "../../services/moviesServices";

function SingleMovieGeneral(props) {
  const [cast, setCast] = useState([]);
  // const componentMounted = useRef(true);

  const getCastDetails = async (id) => {
    const { data } = await movieServices.getCastDetails("movie", id);
    const { cast } = data;
    setCast([...cast]);
  };

  // useEffect(() => {
  //   if (componentMounted.current) {
  //     getCastDetails(props.details.id);
  //   }
  //   return () => {
  //     componentMounted.current = false;
  //   };
  // });

  useEffect(() => {
    getCastDetails(props.details.id);
  });

  return (
    <div className="body-detail3 general">
      <div className="container div">
        <h2 className="single-movie-general single-movie-h2">
          {props.details.title}{" "}
          <span> ({props.details.release_date.substring(0, 4)}) </span>
        </h2>

        <h3 className="single-movie-general single-movie-h3">Cast</h3>
        {cast.slice(0, 3).map((c, i) => {
          return (
            <p
              key={i}
              className="single-movie-general description single-movie-p"
            >
              {c.name} {i < 2 && "   ,  "}
            </p>
          );
        })}

        <h3 className="single-movie-general subtitle  single-movie-h3">
          Overview
        </h3>
        <p className="single-movie-general description single-movie-p">
          {props.details.overview}
        </p>

        <h3 className="single-movie-general subtitle  single-movie-h3">
          Watch On
        </h3>
        <SingleMovieWatchNow movieID={props.details.id} />

        <h3 className="single-movie-general subtitle  single-movie-h3 recomendation-title">
          Recommendations
        </h3>
        <SingleMovieRecommendation movieID={props.details.id} />

        <h3 className="single-movie-general subtitle  single-movie-h3 recomendation-title">
          Trailer
        </h3>
        <SingleMovieTrailer movieID={props.details.id} />
      </div>
    </div>
  );
}

export default SingleMovieGeneral;
