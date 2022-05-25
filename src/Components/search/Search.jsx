import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBarWithPhoto from "../common/searchbarwithphoto";
import "bulma/css/bulma.css";
import "../css/search.css";
import SearchFilter from "./SearchFilter";
import movieServices from "../../services/moviesServices";

function Search(props) {
  const { query } = useParams();

  const [searchData, setSearchdata] = useState([]);

  const getSearchData = async () => {
    const { data } = await movieServices.getSearchQueryDetails(query);
    const { results } = data;

    const temp = results.filter((m) => {
      return m.media_type === "tv" || m.media_type === "movie";
    });

    setSearchdata([...temp]);
  };

  useEffect(() => {
    getSearchData();
  });

  return (
    <React.Fragment>
      <SearchBarWithPhoto />
      <div className="container">
        <div className="searched-data columns is-multiline p-0 pb-3 last">
          <SearchFilter searchData={searchData} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Search;
