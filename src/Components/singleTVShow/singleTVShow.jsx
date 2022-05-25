import React from "react";
import { useParams } from "react-router-dom";
import SingleTVBody from "./singleTVBody";

function SingleTVShow(props) {
  const { id } = useParams();
  return (
    <React.Fragment>
      <SingleTVBody tvID={id} />
    </React.Fragment>
  );
}

export default SingleTVShow;
