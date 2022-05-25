import React from "react";
// import { Link } from "react-router-dom";

function SearchedPerson(props) {
  // const singlePersonRedirect =
  //           "/" +
  //           (props.mediaType === "movie" ? "movies" : "tvshows") +
  //           "/" +
  //           m.id;

  return (
    <React.Fragment>
      <div className="column is-full search-collection">
        <p className="has-text-weight-bold has-text-white is-size-3 is-family-sans-serif search-collection-title">
          Celebrity
        </p>
        <hr className="search-hr" />
      </div>

      {/* <Link key={i} to={singlePageRedirect}>
        <img className="search-img" src={imgURL} alt={m.id} />
      </Link> */}
    </React.Fragment>
  );
}

export default SearchedPerson;
