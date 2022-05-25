import React from "react";
import SearchBarWithPhoto from "../common/searchbarwithphoto";
import LatestMovie from "./latestmovie";

function Home(props) {
  return (
    <React.Fragment>
      <SearchBarWithPhoto />
      <LatestMovie />
    </React.Fragment>
  );
}

export default Home;
