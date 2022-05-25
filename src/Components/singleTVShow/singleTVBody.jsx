import React, { useEffect, useState } from "react";
import dummyData from "./tempTVDetail.json";
import SingleTVCover from "./singleTVCover";
import SingleTVAsside from "./singleTVAsside";
import SingleTVGeneral from "./singleTVGeneral";
import movieServices from "../../services/moviesServices";
import "bootstrap/dist/css/bootstrap.css";
import "../css/singleMovieBody.css";
import SingleTVReviews from "./singleTVReviews";

function SingleTVBody(props) {
  const [tvDetails, setTVDetails] = useState(dummyData);

  const getTVDetails = async () => {
    const { data } = await movieServices.getMoviesDetails("tv", props.tvID);
    const t = { ...data };
    setTVDetails({ ...t });
  };

  useEffect(() => {
    getTVDetails();
  });

  return (
    <React.Fragment>
      <SingleTVCover imgURL={tvDetails.backdrop_path} />
      <div className="container movie-detail">
        <div className="body-detail">
          <div className="body-detail2">
            <SingleTVAsside details={tvDetails} />
            <SingleTVGeneral details={tvDetails} />
          </div>
          <SingleTVReviews tvID={tvDetails.id} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SingleTVBody;
