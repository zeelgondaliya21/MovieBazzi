import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFromWishlist } from "../../services/userServices";
import SingleMovieCardHome from "../home/singleMovieCardHome";
import Toast from "../common/Toast";

function WatchList(props) {
  const [watch, setWatch] = useState();

  const { watchlist } = props.user;

  useEffect(() => {
    setWatch(watchlist);
  }, [watchlist]);

  const removeFromWatchlist = async (event) => {
    let toastID = "";
    try {
      toastID = Toast.toastLoading();
      const res = await deleteFromWishlist(event.target.value);
      console.log("RESPONSE RECEIVED: ", res.data);
      if (res.status === 200) {
        Toast.toastUpdate(toastID, "success", "Succesfully Removed");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Toast.toastUpdate(toastID, "error", err.response.data);
      }
      console.log("AXIOS ERROR: ", err.response && err.response.data);
    }
  };

  if (watch === undefined) {
    return null;
  }

  if (watch.length === 0) {
    return <p className="category-title">0 WatchList</p>;
  }

  return (
    <React.Fragment>
      {watch.map((m, i) => {
        const media = m.mediaType === "tv" ? "tvshows" : "movies";
        return (
          <React.Fragment key={i}>
            <div className="col-1 align-items-center text-center mt-4">
              <SingleMovieCardHome
                type={media}
                id={parseInt(m.mediaID)}
                imgURL={m.mediaPoster}
                isFromWatchList={true}
              />
            </div>
            <div className="col-3 mt-4">
              <h4 className="watchlist-h4">{m.mediaName}</h4>
              <br></br>
              <button
                className="btn btn-warning"
                onClick={removeFromWatchlist}
                value={m._id}
              >
                <DeleteIcon />
              </button>
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default WatchList;
