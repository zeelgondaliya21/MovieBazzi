import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {
  Rating,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import {
  getSingleMovieReviews,
  giveDislike,
  giveLike,
  giveReport,
} from "../../services/reviewsServices";
import auth from "../../services/authServices";
import { MenuItem, FormControl, Select } from "@mui/material";
import Toast from "../common/Toast";

function SingleTVReviews(props) {
  const [reviews, setReviews] = useState([]);
  const [reportReason, setReportReason] = useState("");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = auth.getToken();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReportReasonSelect = (event) => {
    setReportReason(event.target.value);
  };

  const getReviews = async () => {
    try {
      const res = await getSingleMovieReviews("tv", props.tvID + "");
      if (res.status === 200) {
        // console.log(res.data);
        const temp = [...res.data];
        setReviews([...temp]);
      }
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

  const handleReviewReport = async (event) => {
    if (token === null) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      let toastID = "";
      try {
        handleClose();
        toastID = Toast.toastLoading();
        const res = await giveReport(event.target.value, reportReason);
        if (res.status === 200) {
          Toast.toastUpdate(toastID, "success", "Successfully Reported");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastUpdate(toastID, "error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response && err.response.data);
      }
    }
  };

  const handleReviewLike = async (event) => {
    if (token === null) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      let toastID = "";
      try {
        toastID = Toast.toastLoading();

        console.log("Liked TV", event.target.value);

        const res = await giveLike(event.target.value);
        if (res.status === 200) {
          Toast.toastUpdate(toastID, "success", "Liked");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastUpdate(toastID, "error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response && err.response.data);
      }
    }
  };

  const handleReviewDislike = async (event) => {
    if (token === null) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      let toastID = "";
      try {
        toastID = Toast.toastLoading();

        console.log("Disliked TV", event.target.value);

        const res = await giveDislike(event.target.value);
        if (res.status === 200) {
          Toast.toastUpdate(toastID, "success", "Disliked");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastUpdate(toastID, "error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response && err.response.data);
      }
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="single-movie-reviews">
        <h3 className="single-movie-h3">Reviews</h3>
        <hr className="hr-review-title"></hr>
        <h4 className="single-movie-h3">0 Reviews</h4>
        <br></br>
        <br></br>
      </div>
    );
  }

  return (
    <div className="single-movie-reviews">
      <h3 className="single-movie-h3">Reviews</h3>
      <hr className="hr-review-title"></hr>
      {reviews.map((m, i) => {
        return (
          <div key={i} className="row">
            <div className="col-1 d-inline text-center">
              <img
                className="user-review-photo d-inline "
                src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                alt="user"
              />
            </div>
            <div className="col-8 my-4">
              <h4 className="watchlist-h4">{m.userName}</h4>
              <Rating value={m.rating} max={10} readOnly />
              <br></br>
              <p className="review-p">{m.review}</p>
            </div>
            <div className="col-3 mt-4">
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleReviewLike}
                    value={m._id}
                  >
                    <ThumbUpIcon />{" "}
                    <span className="badge">{m.likeCount.length}</span>
                  </button>
                  <button
                    className="btn btn-primary ml-1"
                    onClick={handleReviewDislike}
                    value={m._id}
                  >
                    <ThumbDownIcon />{" "}
                    <span className="badge">{m.dislikeCount.length}</span>
                  </button>
                </div>
                <div className="col-12 my-2">
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Report</DialogTitle>
                    <DialogContent>
                      <FormControl fullWidth>
                        <Select
                          value={reportReason}
                          onChange={handleReportReasonSelect}
                        >
                          <MenuItem value="Sexual content">
                            Sexual content
                          </MenuItem>
                          <MenuItem value="Violent or repulsive content">
                            Violent or repulsive content
                          </MenuItem>
                          <MenuItem value="Hateful or abusive content">
                            Hateful or abusive content
                          </MenuItem>
                          <MenuItem value="Harmful or dangerous acts">
                            Harmful or dangerous acts
                          </MenuItem>
                          <MenuItem value="Spam or misleading">
                            Spam or misleading
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleReviewReport} value={m._id}>
                        Report
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <button
                    className="btn btn-warning mr-4"
                    onClick={handleClickOpen}
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SingleTVReviews;
