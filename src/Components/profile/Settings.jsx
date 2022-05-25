import React, { useState } from "react";
import Joi from "joi";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteUserAsUser, changePassword } from "../../services/userServices";
import Toast from "../common/Toast";

function Settings(props) {
  const [changePasswordData, setchangePasswordData] = useState({
    old: "",
    new: "",
    newr: "",
  });

  const [openDeleteAccDialog, setOpenDeleteAccDialog] = useState(false);
  const [openChangePassDialog, setOpenChangePassDialog] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setOpenDeleteAccDialog(false);
      let res = await deleteUserAsUser();
      console.log(res.status);
      if (res.status === 200) {
        window.location = "/logout";
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Toast.toastMessage("error", err.response.data);
      }
      console.log("AXIOS ERROR: ", err.response && err.response.data);
    }
  };

  const handleClickOpenDeleteAccDialog = () => {
    setOpenDeleteAccDialog(true);
  };

  const handleCloseDeleteAccDialog = () => {
    setOpenDeleteAccDialog(false);
  };

  const handleClickOpenChangePassDialog = () => {
    setOpenChangePassDialog(true);
  };

  const handleCloseChangePassDialog = () => {
    setOpenChangePassDialog(false);
  };

  const handleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setchangePasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    const schema = Joi.object().keys({
      old: Joi.string().required(),
      new: Joi.string().required(),
      newr: Joi.string().required().valid(Joi.ref("new")),
    });

    const { error } = schema.validate(changePasswordData);

    if (error) {
      Toast.toastMessage("error", error.details[0].message);
    } else {
      const data = {
        old: changePasswordData.old,
        new: changePasswordData.new,
      };
      let toastID = "";
      try {
        toastID = Toast.toastLoading();
        handleCloseChangePassDialog();
        const res = await changePassword(data);
        console.log("RESPONSE RECEIVED: ", res.data);
        if (res.status === 200) {
          Toast.toastUpdate(toastID, "success", "Password Changed!!");
          setchangePasswordData({
            old: "",
            new: "",
            newr: "",
          });
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
    <div>
      <button
        className="btn btn-warning mr-3"
        onClick={handleClickOpenDeleteAccDialog}
      >
        Delete Account
      </button>
      <Dialog
        open={openDeleteAccDialog}
        onClose={handleCloseDeleteAccDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Review?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAccDialog} autoFocus>
            No
          </Button>
          <Button onClick={handleDeleteAccount}>Yes</Button>
        </DialogActions>
      </Dialog>

      <button
        className="btn btn-warning ml-3"
        onClick={handleClickOpenChangePassDialog}
      >
        Change Password
      </button>
      <Dialog
        open={openChangePassDialog}
        onClose={handleCloseChangePassDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChangePasswordInput}
            value={changePasswordData.old}
            name="old"
            autoFocus
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleChangePasswordInput}
            value={changePasswordData.new}
            name="new"
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleChangePasswordInput}
            value={changePasswordData.newr}
            name="newr"
            margin="dense"
            label="Repeat Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePassword}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Settings;
