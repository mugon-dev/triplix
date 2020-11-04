/*global kakao*/
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect } from "react";
import UploadMap from "./UploadMap";

const MapDialog = (props) => {
  const { onClose, searchValue, open } = props;
  console.log("modal: " + searchValue);
  const handleClose = (value) => {
    console.log("modal 종료: 1");
    console.log(value);
    onClose(value);
  };

  const handleListItemClick = (value) => {
    console.log("modal 종료: 2");
    console.log(value);
    onClose(value);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <UploadMap search={searchValue} open={open} onClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default MapDialog;
