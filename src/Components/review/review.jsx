import React, { useState, useEffect } from "react";
import Joi from "joi";
import { Box, TextareaAutosize, Rating, Grid, Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import "../css/review.css";
import { useParams, useNavigate } from "react-router-dom";
import movieDummy from "../singleMovie/tempMovieDetail.json";
import tvDummy from "../singleTVShow/tempTVDetail.json";
import { giveReview } from "../../services/reviewsServices";
import movieServices from "../../services/moviesServices";
import Toast from "../common/Toast";

function Review(props) {
  const { id, type } = useParams();
  const mediaType = type === "tvshows" ? "tv" : "movie";

  const [details, setDetails] = useState(
    type === "tvshows" ? tvDummy : movieDummy
  );

  const getTVDetails = async () => {
    const { data } = await movieServices.getMoviesDetails(mediaType, id);
    const t = { ...data };
    setDetails({ ...t });
  };

  const imgURL = "https://image.tmdb.org/t/p/w500" + details.poster_path;

  useEffect(() => {
    getTVDetails();
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const schema = Joi.object().keys({
      rating: Joi.number().required().min(0).max(10),
      review: Joi.string().required().trim(),
    });

    const { error } = schema.validate(reviewData);

    if (error) {
      Toast.toastMessage("error", error.details[0].message);
    } else {
      let toastID = "";
      try {
        toastID = Toast.toastLoading();
        const res = await giveReview(
          reviewData.rating,
          reviewData.review,
          mediaType,
          id,
          type === "tvshows" ? details.name : details.title,
          details.poster_path
        );
        console.log("RESPONSE RECEIVED: ", res.data);
        if (res.status === 200) {
          Toast.toastUpdate(toastID, "success", "Review Submited Successfully");
          navigate("/" + type + "/" + id);
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastUpdate(toastID, "error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response.data);
      }
    }
  };

  const [reviewData, setReviewData] = useState({ rating: "", review: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <div className="container review-rating-container">
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 5, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <h2 className="media-title">Please give your opinion....</h2>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 5, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <img src={imgURL} alt={id} />
                </Grid>
                <Grid item xs={9}>
                  <Box
                    sx={{
                      // width: 500,
                      height: 100,
                      maxWidth: "100%",
                    }}
                  >
                    <Grid
                      container
                      rowSpacing={5}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12}>
                        <h2 className="media-title">
                          {type === "tvshows" ? details.name : details.title} ({" "}
                          {type === "tvshows"
                            ? details.first_air_date.substring(0, 4)
                            : details.release_date.substring(0, 4)}{" "}
                          )
                        </h2>
                      </Grid>

                      <Grid item xs={12}>
                        <Rating
                          name="rating"
                          defaultValue={0}
                          onChange={handleInput}
                          value={reviewData.rating}
                          max={10}
                          size="large"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextareaAutosize
                          name="review"
                          value={reviewData.review}
                          onChange={handleInput}
                          aria-label="empty textarea"
                          placeholder="Enter Review"
                          style={{
                            width: 500,
                            height: 85,
                            background: "black",
                            color: "white",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Review;
