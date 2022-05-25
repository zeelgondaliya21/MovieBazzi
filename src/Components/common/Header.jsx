import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/header.css";

function Header({ user }) {
  const location = useLocation();

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src="https://i.ibb.co/Lp6zg2f/Logo2-removebg-preview.png"
              alt="Movie-Bazzi"
              border="0"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  Home <span className="sr-only"></span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movies">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tvshows">
                  TV Shows
                </NavLink>
              </li>
            </ul>
          </div>
          {!user && location.pathname !== "/login" && (
            <Link
              to={{
                pathname: "/login",
                state: { from: location.pathname },
              }}
            >
              <button className="btn btn-warning ">Log In</button>
            </Link>
          )}
          {user && (
            <React.Fragment>
              {location.pathname !== "/profile" && (
                <Link to="/profile">
                  <div className="header-profile-name">
                    <p>Hi {user.name}</p>
                  </div>
                </Link>
              )}
              <Link to="/logout">
                <button className="btn btn-warning">Log out</button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
