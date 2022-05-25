import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../../services/authServices";
import { addToWishlist } from "../../services/userServices";
import Toast from "../common/Toast";
import "../css/singleMovieBody.css";

function SingleTVAsside(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    poster_path,
    number_of_episodes,
    number_of_seasons,
    name,
    id,
    first_air_date,
    last_air_date,
    status,
  } = props.details;

  const imgURL = "https://image.tmdb.org/t/p/w500" + poster_path;
  const reviewRedirectLink = "/tvshows/" + id + "/review";

  const handleAddToWatchlist = async () => {
    const token = auth.getToken();

    if (token === null) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      let toastID = "";
      try {
        toastID = Toast.toastLoading();
        const res = await addToWishlist("tv", id + "", name, poster_path);
        console.log("RESPONSE RECEIVED: ", res.data);
        if (res.status === 200) {
          Toast.toastUpdate(toastID, "success", "Added to Watch List");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastUpdate(toastID, "error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response.data);
      }
    }
  };

  return (
    <div className="body-detail3 asside">
      <div className="asside">
        <figure className="show-img fig">
          <img
            data-v-49816e12=""
            src={imgURL}
            alt={name}
            className="poster-image"
          />
        </figure>
        <div className="detail">
          <span className="title single-movie-general">Genres</span>
          <div className="item">
            {props.details.genres.map((genre, i) => {
              return (
                <span key={i} className="detail--chip">
                  {genre.name}{" "}
                </span>
              );
            })}
          </div>

          <span className="title single-movie-general">Total Seasons</span>
          <div className="item">
            {" "}
            <span className="detail--chip">{number_of_seasons} </span>
          </div>

          <span className="title single-movie-general">Total Episodes</span>
          <div className="item">
            {" "}
            <span className="detail--chip">{number_of_episodes} </span>
          </div>

          <span className="title single-movie-general">
            First Episode Release Date
          </span>
          <div className="item">
            {" "}
            <span className="detail--chip">{first_air_date} </span>
          </div>

          {status === "Ended" && (
            <React.Fragment>
              <span className="title single-movie-general">
                Last Episode Release Date
              </span>
              <div className="item">
                {" "}
                <span className="detail--chip">{last_air_date} </span>
              </div>
            </React.Fragment>
          )}

          <span className="title single-movie-general">Language</span>
          <div className="item">
            {props.details.spoken_languages.map((lang, i) => {
              return (
                <span key={i} className="detail--chip">
                  {lang.name}{" "}
                </span>
              );
            })}
          </div>

          <span className="title single-movie-general">Created By</span>
          <div className="item">
            {props.details.created_by.map((c, i) => {
              return (
                <span key={i} className="detail--chip">
                  {c.name}{" "}
                </span>
              );
            })}
          </div>

          <span className="title single-movie-general">
            <Link
              to={{
                pathname: reviewRedirectLink,
                state: { from: location.pathname },
              }}
            >
              <button type="button" className="btn btn-warning">
                Review
              </button>
            </Link>
          </span>

          <span className="title single-movie-general">
            <button
              onClick={handleAddToWatchlist}
              type="button"
              className="btn btn-warning"
            >
              Add to Watchlist
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleTVAsside;
