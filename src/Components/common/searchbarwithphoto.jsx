import React from "react";
import "bulma/css/bulma.css";
import SeachBar from "./searchbar";

function SearchBarWithPhoto(props) {
  return (
    <React.Fragment>
      <div className="top">
        <div className="columns">
          <div className="column is-full featured_wrapper p-0">
            <img
              src="https://raw.githubusercontent.com/brixiobodino/coffeholic/main/banner.jpg"
              className="featured"
              alt=""
            />
          </div>
        </div>
      </div>
      <SeachBar />
    </React.Fragment>
  );
}

export default SearchBarWithPhoto;
