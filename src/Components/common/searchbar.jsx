import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "../css/searchbar.css";
import Toast from "./Toast";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchQuery === "") {
      Toast.toastMessage("success", "Please write what you want to search");
    } else {
      const navigateValue = "/search/" + searchQuery;
      navigate(navigateValue);
    }
  };

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="search">
            <form onSubmit={handleSearch}>
              <div className="columns is-gapless">
                <div className="column">
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    name="searchInput"
                    className="form-control"
                    placeholder="Search for your Favourite Movie"
                    value={searchQuery}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="column is-2">
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
