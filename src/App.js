import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import Movies from "./Components/movies/movies";
import Home from "./Components/home/home";
import Login from "./Components/login/login";
import Celebrities from "./Components/celebrities/celebrities";
import TVShows from "./Components/tvShow/tvshows";
import SingleMovie from "./Components/singleMovie/singleMovie";
import Profile from "./Components/profile/profile";
import Review from "./Components/review/review";
import SingleTVShow from "./Components/singleTVShow/singleTVShow";
import Search from "./Components/search/Search";
import Logout from "./Components/login/logout";
import auth from "./services/authServices";
import ProtectedRoute from "./Components/ProtectedRoute";
import Header from "./Components/common/Header";
import Footer from "./Components/common/Footer";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const jwt = auth.getToken();
      const currentUser = jwtDecode(jwt);
      setUser(currentUser);
    } catch (error) {}
  }, []);

  return (
    <Router>
      <Header user={user} />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route exact path="/" element={<Home user={user} />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        {/* <Route exact path="/profile" element={<Profile user={user} />}></Route> */}
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route
          exact
          path="/celebrities"
          element={<Celebrities user={user} />}
        ></Route>
        <Route exact path="/search/:query" element={<Search />}></Route>
        <Route exact path="/movies" element={<Movies user={user} />}></Route>
        <Route
          exact
          path="/movies/:id"
          element={<SingleMovie user={user} />}
        ></Route>
        <Route exact path="/tvshows" element={<TVShows user={user} />}></Route>
        <Route
          exact
          path="/tvshows/:id"
          element={<SingleTVShow user={user} />}
        ></Route>
        <Route
          exact
          path="/:type/:id/review"
          element={<ProtectedRoute component={Review} />}
        ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
