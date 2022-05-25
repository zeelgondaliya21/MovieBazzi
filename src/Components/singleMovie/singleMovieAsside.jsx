import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../../services/authServices";
import { addToWishlist } from "../../services/userServices";
import Toast from "../common/Toast";
import "../css/singleMovieBody.css";

function SingleMoivieAsside(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { poster_path, runtime, release_date, title, id } = props.details;

  const imgURL = "https://image.tmdb.org/t/p/w500" + poster_path;
  const reviewRedirectLink = "/movies/" + id + "/review";

  const handleAddToWatchlist = async () => {
    const token = auth.getToken();

    if (token === null) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      let toastID = "";
      try {
        toastID = Toast.toastLoading();
        const res = await addToWishlist("movie", id + "", title, poster_path);
        console.log("RESPONSE RECEIVED: ", res.data);
        if (res.status === 200) {
          Toast.toastUpdate(toastID, "success", "Added to Watch List");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastUpdate(toastID, "error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response && err.response.data);
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
            alt={title}
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
          <span className="title single-movie-general">Runtime</span>
          <span className="item"> {runtime} minutes </span>
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
          <span className="title single-movie-general">Release Date</span>
          <span className="item">{release_date}</span>
          <span className="title single-movie-general">
            <Link
              to={{
                pathname: reviewRedirectLink,
                state: { from: location.pathname },
              }}
            >
              <button type="button" class="btn btn-warning">
                Review
              </button>
            </Link>
          </span>
          <span className="title single-movie-general">
            <button
              onClick={handleAddToWatchlist}
              type="button"
              class="btn btn-warning"
            >
              Add to Watchlist
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleMoivieAsside;
