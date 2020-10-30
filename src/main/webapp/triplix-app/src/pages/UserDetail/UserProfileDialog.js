import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

const UserProfileDialog = (props) => {
  const { profileOpen, setProfileOpen } = props.open;
  console.log(props);

  const handleProfileClose = () => {
    setProfileOpen(false);
  };
  const handleProfileCloseUpdate = (value) => {
    console.log(value);
    var profiel = value.target.value;
    console.log(value.target);
    setProfileOpen(false);
  };
  return (
    <Dialog
      open={profileOpen}
      onClose={handleProfileClose}
      fullWidth="true"
      maxWidth="md"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">인트로듀스 마이쉘</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="profile"
          name="profile"
          label="자기소개"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProfileClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleProfileCloseUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
