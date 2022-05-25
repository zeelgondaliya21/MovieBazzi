import React, { useEffect, useState } from "react";
import WatchList from "./WatchList";
import Users from "./Users";
import Settings from "./Settings";
import Reviews from "./Reviews";
import { getUserDetails } from "../../services/userServices";
import "../css/profile.css";

function Profile(props) {
  const [user, setUser] = useState({});

  const getUserData = async () => {
    try {
      const { data } = await getUserDetails();
      const t = { ...data };
      setUser({ ...t });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  });

  return (
    <React.Fragment>
      <div className="container profile-container">
        <div className="user-info">
          <div className="row">
            <div className="col-2 d-inline text-center">
              <img
                className="user-profile-photo d-inline "
                src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                alt="user"
              />
            </div>
            <div className="col-10 pt-4">
              <h1 className="user-name">{user.name}</h1>
              <h5 className="user-mail">{user.email}</h5>
              {user.isAdmin && <h5 className="user-mail">Admin</h5>}
            </div>
          </div>
          <hr className="hr-main" />
          {!user.isAdmin && (
            <div className="category-div">
              <h4 className="category-title">WatchList</h4>
              <hr className="hr-cat" />
              <div className="row">
                <WatchList user={user} />
              </div>
            </div>
          )}
          {user.isAdmin && (
            <div className="category-div">
              <h4 className="category-title">Users</h4>
              <hr className="hr-cat" />
              <div className="row">
                <Users />
              </div>
            </div>
          )}
          <div className="category-div">
            <h4 className="category-title">Reviews</h4>
            <hr className="hr-cat" />
            <Reviews isAdmin={user.isAdmin} />
          </div>

          <div className="category-div">
            <h4 className="category-title">Settings</h4>
            <hr className="hr-cat" />

            <Settings userID={user._id} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;

// function Profile(props) {
//   const [user, setUser] = useState({});
//   const [clickedButton, setClickedButton] = useState({
//     watchlist: true,
//     reviews: false,
//     settings: false,
//   });

//   useEffect(() => {
//     const temp = { ...props.user };
//     setUser({ ...temp });
//   }, [props.user]);

//   const handleSidebarClick = (event) => {
//     if (event.target.name === "watchlist") {
//       const temp = { watchlist: true, reviews: false, settings: false };
//       setClickedButton(temp);
//     }
//     if (event.target.name === "reviews") {
//       const temp = { watchlist: false, reviews: true, settings: false };
//       setClickedButton(temp);
//     }
//     if (event.target.name === "settings") {
//       const temp = { watchlist: false, reviews: false, settings: true };
//       setClickedButton(temp);
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="container profile-container">
//         <div className="row">
//           <div className="col-3 align-items-center text-center">
//             <div className="user-info">
//               <img
//                 className="user-profile-photo d-block mx-auto"
//                 src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
//                 alt="user"
//               />
//               <h4 className="user-name d-block mx-auto">{user.name}</h4>
//               <p className="user-mail d-block mx-auto">{user.email}</p>
//             </div>
//             <div>
//               <button
//                 className="sidebar-button d-block mx-auto active"
//                 name="watchlist"
//                 onClick={handleSidebarClick}
//               >
//                 Watch List
//               </button>
//               <button
//                 className="sidebar-button d-block mx-auto"
//                 name="reviews"
//                 onClick={handleSidebarClick}
//               >
//                 Reviews
//               </button>
//               <button
//                 className="sidebar-button d-block mx-auto"
//                 name="settings"
//                 onClick={handleSidebarClick}
//               >
//                 Settings
//               </button>
//             </div>
//           </div>
//           <div className="col-9">
//             {clickedButton.watchlist && <WatchList userID={user._id} />}
//             {clickedButton.settings && <Settings userID={user._id} />}
//             {clickedButton.reviews && <Reviews userID={user._id} />}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default Profile;
