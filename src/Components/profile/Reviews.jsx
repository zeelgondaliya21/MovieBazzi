import React, { useEffect, useState } from "react";
import {
  Rating,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteReviewAsAdmin,
  deleteReviewAsUser,
  getAllReviewAsAdmin,
  getAllReviewAsUser,
} from "../../services/reviewsServices";
import SingleMovieCardHome from "../home/singleMovieCardHome";
import Toast from "../common/Toast";

function Reviews(props) {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteReviewID, setDeleteReviewID] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const getReviews = async () => {
    try {
      let res = "";
      if (props.isAdmin) {
        res = await getAllReviewAsAdmin(deleteReviewID);
      } else {
        res = await getAllReviewAsUser(deleteReviewID);
      }
      setReviews([...res.data]);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Toast.toastMessage("error", err.response.data);
      }
      console.log("AXIOS ERROR: ", err.response && err.response.data);
    }
  };

  useEffect(() => {
    getReviews();
  });

  const handleReviewDelete = async (event) => {
    let toastID = "";
    try {
      setOpen(false);
      toastID = Toast.toastLoading();
      let res = "";
      if (props.isAdmin) {
        res = await deleteReviewAsAdmin(deleteReviewID);
      } else {
        res = await deleteReviewAsUser(deleteReviewID);
      }
      if (res.status === 200) {
        Toast.toastUpdate(toastID, "success", "Successfully Deleted!!");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Toast.toastUpdate(toastID, "error", err.response.data);
      }
      console.log("AXIOS ERROR: ", err.response && err.response.data);
    }
  };

  if (reviews === undefined) {
    return null;
  }

  if (reviews.length === 0) {
    return <p className="category-title">0 Reviews</p>;
  }

  return (
    <React.Fragment>
      {reviews.map((m, i) => {
        const media = m.mediaType === "tv" ? "tvshows" : "movies";
        return (
          <div key={i} className="row">
            <div className="col-1 align-items-center text-center mt-4">
              <SingleMovieCardHome
                type={media}
                id={parseInt(m.mediaID)}
                imgURL={m.mediaPoster}
                isFromWatchList={true}
              />
            </div>
            <div className="col-8 my-4">
              {props.isAdmin && (
                <React.Fragment>
                  <h4 className="watchlist-h4">{m.userName}</h4>
                  <h6 className="watchlist-h4">{m.mediaName}</h6>
                </React.Fragment>
              )}
              {!props.isAdmin && (
                <h4 className="watchlist-h4">{m.mediaName}</h4>
              )}
              <Rating value={m.rating} max={10} readOnly />
              <br></br>
              <p className="review-p">{m.review}</p>
            </div>
            <div className="col-3 mt-4">
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-primary mr-2" disabled>
                    Likes <span className="badge">{m.likeCount.length}</span>
                  </button>
                  <button className="btn btn-primary ml-1" disabled>
                    Dislikes{" "}
                    <span className="badge">{m.dislikeCount.length}</span>
                  </button>
                </div>
                <div className="col-12 mt-2">
                  {props.isAdmin &&
                    (m.reportCount.length >= 3 ? (
                      <button className="btn btn-danger mr-2" disabled>
                        Reports{" "}
                        <span className="badge">{m.reportCount.length}</span>
                      </button>
                    ) : (
                      <button className="btn btn-primary mr-2" disabled>
                        Reports{" "}
                        <span className="badge">{m.reportCount.length}</span>
                      </button>
                    ))}
                  <button
                    className="btn btn-warning ml-1"
                    onClick={() => {
                      setDeleteReviewID(m._id);
                      setOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Review?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleReviewDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Reviews;
