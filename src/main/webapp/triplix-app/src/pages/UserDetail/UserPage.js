import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import UserImageDialog from "./UserImageDialog";
import styled from "styled-components";
import UserProfileDialog from "./UserProfileDialog";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import FlipMove from "react-flip-move";
import Picture from "../MainArea/Picture";
import Loader from "../MainArea/Loader";
import UserBoardList from "./UserBoardList";

const Container = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 14px;
  margin-top: -20px;
`;
const BackgroundImage = styled.div`
  width: 100%;
  height: 787px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 100) 0,
      rgba(25, 25, 25, 0) 20%,
      rgba(25, 25, 25, 0) 20%,
      rgba(0, 0, 0, 0) 66.66%,
      rgba(0, 0, 0, 0) 66.66%,
      rgba(0, 0, 0, 50) 100%
    ),
    url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;
const Username = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 35px;
  letter-spacing: -0.48px;
  margin-top: 12px;
  margin-bottom: 20px;
`;
const IntroductionFont = styled.p`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 35px;
  text-align: left;
  letter-spacing: -0.48px;
  color: #ffffff;
`;

const UserPage = () => {
  const [userinfo, setUserInfo] = useState("");
  const isLogin = useSelector((store) => store.isLogin);
  console.log(isLogin);

  useEffect(() => {
    fetch("http://localhost:8000/member/detail", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res);
        console.log(userinfo);
        console.log(userinfo.mname);
        console.log(userinfo.mimage);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [changeImage, setChangeImage] = useState(userinfo.miage);

  const handleClickOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // console.log("받아온이미지", changeImage);
    // setChangeImage(changeImage);
    // console.log(userinfo);
    // console.log("바뀐 이미지", changeImage);
    // setUserInfo((prevState) => {
    //   return {
    //     ...prevState,
    //     mimage: URL.createObjectURL(changeImage),
    //   };
    // });
    // console.log(userinfo);
    // console.log(URL.createObjectURL(changeImage));
    fetch("http://localhost:8000/member/detail", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res);
      });
  };
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [profile, setProfile] = useState({
    profile: "",
  });

  const handleClickProfileOpen = () => {
    setProfileOpen(true);
  };
  const handleProfileClose = () => {
    setProfileOpen(false);
  };
  const handleProfileCloseUpdate = () => {
    console.log(profile);
    fetch("http://localhost:8000/member/profile", {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          alert("업로드 완료");
          setProfile("");
          setUserInfo({
            ...userinfo,
            mprofile: profile,
          });
        } else {
          alert("업로드 실패");
        }
      });
    setProfileOpen(false);
  };
  const profileUpdate = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    console.log(profile);
  };

  return (
    <div>
      <Container>
        <BackgroundImage bg={"/images/userbgimg.jpg"} />
        {/* <BackgroundImage bg={userinfo.background} /> */}
      </Container>
      <div
        style={{
          display: "flex",
          marginLeft: "10%",
          marginTop: "-5%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "200px",
            height: "auto",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            src={userinfo.mimage} //{userinfo.photoURL}
            alt={""}
            style={{
              width: "200px",
              height: "200px",
              border: "2px solid #E44E47",
              boxSizing: "border-box",
            }}
          />
          <Fab
            color="primary"
            aria-label="add"
            style={{
              float: "right",
            }}
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Fab>
          <UserImageDialog
            changeImage={changeImage}
            open={open}
            onClose={handleClose}
          />
          <Username>{userinfo.mname}</Username> {/*{userinfo.displayName} */}
          {/* <Subscribe userTo={friendid} Type="FollowPage" /> */}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "380px",
            alignItems: "center",
            marginLeft: "65px",
          }}
        >
          <div>
            <IntroductionFont>인트로듀스 마이쉘</IntroductionFont>
            <IntroductionFont
              style={{
                marginTop: "20px",
                wordBreak: "break-all",
                fontWeight: "300",
              }}
            >
              여긴 나에 대한 정보가 들어있어요
              {userinfo.mprofile}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickProfileOpen}
                style={{
                  float: "right",
                }}
              >
                내 소개 수정
              </Button>
            </IntroductionFont>
            <Dialog
              open={profileOpen}
              onClose={handleProfileClose}
              fullWidth="true"
              maxWidth="md"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                인트로듀스 마이쉘
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="profile"
                  name="profile"
                  label="자기소개"
                  type="email"
                  fullWidth
                  onChange={profileUpdate}
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
          </div>
        </div>
      </div>
      <UserBoardList />
    </div>
  );
};

export default UserPage;
