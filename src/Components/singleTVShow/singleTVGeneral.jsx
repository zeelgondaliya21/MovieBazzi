import React, { useEffect, useState } from "react";
import SingleTVWatchNow from "./singleTVWatchNow";
import SingleTVRecommendation from "./singleTVRecommendation";
import "../css/singleMovieBody.css";
import SingleTVSeasons from "./singleTVSeasons";
import movieServices from "../../services/moviesServices";

function SingleTVGeneral(props) {
  const [cast, setCast] = useState([]);

  const getCastDetails = async (id) => {
    const { data } = await movieServices.getCastDetails("tv", id);
    const { cast } = data;
    setCast([...cast]);
  };

  useEffect(() => {
    getCastDetails(props.details.id);
  });

  return (
    <div className="body-detail3 general">
      <div className="container div">
        <h2 className="single-movie-general single-movie-h2">
          {props.details.name}{" "}
          <span> ({props.details.first_air_date.substring(0, 4)}) </span>
        </h2>

        <h3 className="single-movie-general single-movie-h3">Cast</h3>
        {cast.slice(0, 4).map((c, i) => {
          return (
            <p
              key={i}
              className="single-movie-general description single-movie-p"
            >
              {c.name} {i < 3 && "   ,  "}
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
        <SingleTVWatchNow tvID={props.details.id} />

        <h3 className="single-movie-general subtitle  single-movie-h3 recomendation-title">
          Seasons
        </h3>
        <SingleTVSeasons seasonData={props.details.seasons} />

        <h3 className="single-movie-general subtitle  single-movie-h3 recomendation-title">
          Recommendations
        </h3>
        <SingleTVRecommendation tvID={props.details.id} />

        {/* <h3 className="single-movie-general subtitle  single-movie-h3 recomendation-title">
          Trailer
        </h3>
        <SingleTVTrailer tvID={props.details.id} /> */}
      </div>
    </div>
  );
}

export default SingleTVGeneral;
