import axios from "axios";
import auth from "./authServices";

const apiEndpoint = process.env.REACT_APP_REVIEW_API_ENDPOINT;

const token = auth.getToken();

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-auth-token": token,
  },
};

// -----------------------------------------------------------------------------------
//ADMIN
// -----------------------------------------------------------------------------------

export async function getAllReviewAsAdmin() {
  return await axios.get(apiEndpoint + "admin", axiosConfig);
}

export async function deleteReviewAsAdmin(reviewID) {
  return await axios.delete(apiEndpoint + "admin", {
    data: { reviewID: reviewID },
    ...axiosConfig,
  });
}

// -----------------------------------------------------------------------------------
//USER
// -----------------------------------------------------------------------------------

export async function getAllReviewAsUser() {
  return await axios.get(apiEndpoint + "me/getall", axiosConfig);
}

export async function deleteReviewAsUser(reviewID) {
  return await axios.delete(apiEndpoint + "me/delete", {
    data: { reviewID: reviewID },
    ...axiosConfig,
  });
}

export async function giveReview(
  rating,
  review,
  mediaType,
  mediaID,
  mediaName,
  mediaPoster
) {
  const reviewData = {
    rating: rating,
    review: review,
    mediaType: mediaType,
    mediaID: mediaID,
    mediaName: mediaName,
    mediaPoster: mediaPoster,
  };

  return await axios.post(apiEndpoint + "me/give", reviewData, axiosConfig);
}

export async function giveLike(reviewID) {
  return await axios.put(
    apiEndpoint + "me/like",
    { reviewID: reviewID },
    axiosConfig
  );
}

export async function giveDislike(reviewID) {
  return await axios.put(
    apiEndpoint + "me/dislike",
    { reviewID: reviewID },
    axiosConfig
  );
}

export async function giveReport(reviewID, reason) {
  return await axios.put(
    apiEndpoint + "me/report",
    { reviewID: reviewID, reason: reason },
    axiosConfig
  );
}

// -----------------------------------------------------------------------------------
//GENERAL
// -----------------------------------------------------------------------------------

export async function getSingleMovieReviews(mediaType, mediaID) {
  return await axios.post(
    apiEndpoint + "general",
    { mediaType: mediaType, mediaID: mediaID },
    axiosConfig
  );
}

const review = {
  getAllReviewAsAdmin,
  deleteReviewAsAdmin,
  getAllReviewAsUser,
  deleteReviewAsUser,
  getSingleMovieReviews,
  giveReview,
  giveLike,
  giveDislike,
  giveReport,
};

export default review;
