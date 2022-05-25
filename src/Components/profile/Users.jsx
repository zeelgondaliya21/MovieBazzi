import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  deleteUserAsAdmin,
  getAllUserAsAdmin,
} from "../../services/userServices";
import Toast from "../common/Toast";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteUserID, setDeleteUserID] = useState();

  const handleClickOpen = (event) => {
    setDeleteUserID(event.target.value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUsers = async () => {
    try {
      let res = await getAllUserAsAdmin();
      setUsers([...res.data]);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Toast.toastMessage("error", err.response.data);
      }
      console.log("AXIOS ERROR: ", err.response && err.response.data);
    }
  };

  useEffect(() => {
    getUsers();
  });

  const handleUserDelete = async () => {
    let toastID = "";
    try {
      setOpen(false);
      toastID = Toast.toastLoading();
      let res = await deleteUserAsAdmin(deleteUserID);
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

  if (users === undefined) {
    return null;
  }

  if (users.length === 0) {
    return <p className="category-title">0 Users</p>;
  }

  return (
    <React.Fragment>
      {users.map((u, i) => {
        return (
          <React.Fragment key={i}>
            <div className="col-1 d-inline text-center mt-4">
              <img
                className="d-inline"
                src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                alt="user"
              />
            </div>
            <div className="col-3 mt-4">
              <h4 className="user-name">{u.name}</h4>
              <p className="user-mail">{u.email}</p>
            </div>
            <div className="col-2 mt-4">
              <button
                className="btn btn-warning mt-4"
                onClick={handleClickOpen}
                value={u._id}
              >
                Delete
              </button>
            </div>
          </React.Fragment>
        );
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleUserDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Users;
