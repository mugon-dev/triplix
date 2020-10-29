import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Fab,
  makeStyles,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";
import { UploadDropZone } from "../pages/Upload/UploadStyled";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  DropZoneArea: {
    height: "80%",
    width: "600px",
    border: "4px dashed #979797",
    boxSizing: "border-box",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto 0",
    backgroundColor: "#404040",
  },
  DropzoneParagrap: {
    fontFamily: "Noto Sans KR",
    fontStyle: "normal",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  colorq: {
    display: "flex",
    marginTop: "50px",
  },
}));

const UserImageDialog = (props) => {
  const classes = useStyles();
  const { onClose, changeImage, open } = props;

  const handleClose = (e) => {
    setImage("");
    onClose();
  };

  const handleCloseUpdate = (changeImage) => {
    console.log(changeImage);
    const formData = new FormData();
    formData.append("image", changeImage);
    fetch("http://localhost:8000/member/image", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
      body: formData,
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          alert("업로드 완료");
        } else {
          alert("업로드 실패");
        }
      });
    onClose(changeImage);
  };

  const [image, setImage] = useState();
  const onDrop = async (file) => {
    setImage(file[0]);
    console.log(image);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <UploadDropZone>
        <DropzoneArea
          onDrop={onDrop}
          dropzoneClass={classes.DropZoneArea}
          dropzoneParagraphClass={classes.DropzoneParagrap}
          Icon=""
          dropzoneText={
            <div style={{ textAlign: "center" }}>
              <img
                src={image ? URL.createObjectURL(image) : null}
                alt={image ? image.name : null}
              />
            </div>
          }
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          showPreviewsInDropzone={true}
          useChipsForPreview //사진이 아니라 이름으로 보여주기 위함
          previewText="Selected files"
          filesLimit={1} //파일 갯수
          // previewGridProps={{
          //     //업로드시 아래 select 파일 이라고 뜨는것
          //     container: { spacing: 1, direction: 'row' },
          // }}
          //  previewChipProps={{ classes: { root: classes.previewChip } }}
        />
        {/* <Dropzone
                            bimage={bimage}
                            setHadImageurl={setBimage}
                                                 
                        />  */}
      </UploadDropZone>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          name="cancel"
          value="cancel"
        >
          Cancle
        </Button>
        <Button
          onClick={() => handleCloseUpdate(image)}
          color="primary"
          name="update"
          value="update"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserImageDialog;
