import axios from "axios";
import auth from "./authServices";

const apiEndpoint = process.env.REACT_APP_USER_API_ENDPOINT;

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

export async function getAllUserAsAdmin() {
  return await axios.get(apiEndpoint + "admin", axiosConfig);
}

export async function deleteUserAsAdmin(userID) {
  return await axios.delete(apiEndpoint + "admin", {
    data: { userID: userID },
    ...axiosConfig,
  });
}

// -----------------------------------------------------------------------------------
//USER
// -----------------------------------------------------------------------------------

export async function getUserDetails() {
  return await axios.get(apiEndpoint + "me", axiosConfig);
}

export async function deleteUserAsUser() {
  return await axios.delete(apiEndpoint + "me", axiosConfig);
}

export async function changePassword(data) {
  return await axios.put(
    apiEndpoint + "me/changepassword",
    { old: data.old, new: data.new },
    axiosConfig
  );
}

export async function addToWishlist(
  mediaType,
  mediaID,
  mediaName,
  mediaPoster
) {
  return await axios.put(
    apiEndpoint + "me/watchlist",
    {
      mediaType: mediaType,
      mediaID: mediaID,
      mediaName: mediaName,
      mediaPoster: mediaPoster,
    },
    axiosConfig
  );
}

export async function deleteFromWishlist(id) {
  return await axios.delete(apiEndpoint + "me/watchlist", {
    data: { id: id },
    ...axiosConfig,
  });
}

// -----------------------------------------------------------------------------------

const user = {
  getAllUserAsAdmin,
  deleteUserAsAdmin,
  getUserDetails,
  deleteUserAsUser,
  changePassword,
  addToWishlist,
  deleteFromWishlist,
};

export default user;
