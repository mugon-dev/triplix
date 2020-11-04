import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import Message from './DetailFunction/Message';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import CommentList from "./CommentList";
import jwt_decode from "jwt-decode";
import {
  ImageContainer,
  LeftContainer,
  MainContentContainer,
  RightContainer,
  TotalContainer,
  LeftBottomContainer,
  TextBox,
  LeftTopContainer,
  RightBottomContainer,
  RightTopContainer,
  CommentBox,
} from "./DetailStyle";
//import { DetailContent, PostName } from './DetailFunction/Article';
import ClearTwoToneIcon from "@material-ui/icons/ClearTwoTone";
//import ShowMoreText from 'react-show-more-text';
import { SubtitleFont } from "../Upload/UploadStyled";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { RatingFont } from "../Upload/UploadFunction/Rating";
//import ChatInput from './DetailFunction/ChatInput';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import ShowMoreText from "react-show-more-text";
import Message from "./Message";
import ChatInput from "./ChatInput";

import { Link } from "react-router-dom";
import UploadPage from "../Upload/UploadPage";
import UploadUpdate from "../Upload/UploadUpdate";

import Good from "./Good";

//import Subscribe from './DetailFunction/Subscribe';
//import Avartar from './DetailFunction/Avartar';
//import LikeInterest from './DetailFunction/Like_Interest';

const PostName = styled.h2`
  font-weight: bold;
  font-size: 32px;
  line-height: 46px;
  letter-spacing: -0.768px;
  color: #ffffff;
  margin-top: 20px;
`;

const DetailContent = styled.div`
  margin-top: 3%;
  width: 100%;
  height: auto;
  max-height: 220px;
  font-weight: 300;
  font-size: 22px;
  line-height: 32px;
  display: flex;
  color: #ffffff;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;


const RigthStyle = {
    textAlign : "right"
}

const useStyles = makeStyles((theme) => ({
    FollowBtn: {
        color: '#FFFFFF',
        border: '2px solid #FF534B',
        height: '24px',
        width: '55px',
        fontWeight: 500,
        fontSize: '13px',
        lineHeight: '19px',
        display: 'flex',
        boxSizing: 'border-box',
        borderRadius: '16px',
        marginTop: '10px',
    },
    RatingBtn: {
        width: '26px',
        height: '21px',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        alignItems: 'center',
        color: '#D84B45',
        margin: 'auto 0',
    },
}));
export default function DetailPage(props) {
    console.log(props,"detailres값");
    let comments = props.comment;
    let picks = props.pick;
    console.log("qwerasd",picks);
    console.log("cccc",comments);
    let bid =props.bId;
    let mid =0;
    if(localStorage.getItem("Authorization") != null){
        let jwtTokenTemp = localStorage.getItem("Authorization");
        let jwtToken = jwtTokenTemp.replace('Bearer ','');
        console.log("토큰 : ", jwtToken);
        mid = jwt_decode(jwtToken).id; 
    }


const useStyles = makeStyles((theme) => ({
  FollowBtn: {
    color: "#FFFFFF",

    border: "2px solid #FF534B",
    height: "24px",
    width: "55px",
    fontWeight: 500,
    fontSize: "13px",
    lineHeight: "19px",
    display: "flex",
    boxSizing: "border-box",
    borderRadius: "16px",
    marginTop: "10px",
  },
  RatingBtn: {
    width: "26px",
    height: "21px",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    alignItems: "center",
    color: "#D84B45",
    margin: "auto 0",
  },
}));

  const [board, setBoard] = useState();

  const [mId, setMid] = useState();

  useEffect(() => {
    if (localStorage.getItem("Authorization") != null) {
      let jwtTokenTemp = localStorage.getItem("Authorization");
      let jwtToken = jwtTokenTemp.replace("Bearer ", "");

      setMid(jwt_decode(jwtToken).id);
      setBoard(props.id);
    }
  }, []);

  console.log(mId, "------------mid");
  console.log(board, "-----------bid");


  console.log(props, "sss");

  const classes = useStyles();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const openMap = () => {
    window.open(
      `https://map.kakao.com/link/map/${props.address},${props.latitude},${props.longitude}`
    );
  };

  function likebutton() {
    document.querySelector("#like").className = "fas fa-thumbs-up fa-5x";
  }

  const executeOnClick = (isExpanded) => {
    // console.log(isExpanded);
  };

  const [IsModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const deleteBoard = () => {
    fetch("http://localhost:8000/board/delete/" + props.bId, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          alert("삭제완료");
          window.location.reload();
        } else {
          alert("삭제실패");
        }
      });
  };

  return (
    <Dialog
      scroll={"body"}
      maxWidth={false}
      open={props.open}
      onClose={props.close}
      // aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          backgroundColor: "rgba(64, 64, 64, 0.7)",
          backdropFilter: "blur(30px)",
          borderRadius: "20px",
          color: "#ffffff",
        },
      }}
    >
      <DialogContent>
        <TotalContainer>
          <MainContentContainer>
            <LeftContainer>
              <ImageContainer>
                <img
                  src={props.image}
                  alt={"사진"}
                  style={{
                    width: "100%",
                    hegiht: "100%",
                    maxHeight: "850px",
                    borderRadius: "20px",
                  }}
                />
                <LeftTopContainer style={{ left: "150px" }}>
                  {/* <LikeInterest postId={props.id} /> */}
                </LeftTopContainer>
                <LeftBottomContainer>
                  {/* <Avartar uid={props.uid} Type="Detail" /> */}
                  <div
                    style={{
                      alignItems: "left",
                      textAlign: "left",
                    }}
                  >
                    <TextBox>{props.name}</TextBox>
                    {/* <Subscribe userTo={props.uid} /> */}
                  </div>
                </LeftBottomContainer>
                <RightTopContainer>
                  {props.advertising && (
                    <div
                      style={{
                        width: "72px",
                        height: "26px",
                        border: "1px solid #FFFFFF",
                        boxSizing: "border-box",
                        borderRadius: "10px",
                        textAlign: "center",
                        alignItem: "center",
                        fontWeight: "normal",
                        fontSize: "14px",
                        lineHeight: "20px",
                        margin: "auto 0",
                      }}
                    >
                      광고 포함
                      {/*{props.advertising === false*/}
                      {/*    ? null*/}
                      {/*    : '광고 포함'}*/}
                    </div>
                  )}
                </RightTopContainer>
                <RightBottomContainer>
                  <div
                    style={{
                      display: "flex",
                      cursor: "pointer",
                    }}
                    onClick={openMap}
                  >
                    <img
                      style={{
                        marginRight: "4px",
                        width: "15px",
                        height: "20px",
                      }}
                      src="/images/location.png"
                      alt=""
                    />
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "13px",
                        lineHeight: "23px",
                      }}
                    >
                      카카오맵으로 이동
                    </p>
                  </div>
                </RightBottomContainer>
              </ImageContainer>
              <PostName>{props.title}</PostName>


              <DetailContent>
                <ShowMoreText
                  width={650}
                  //Default options
                  lines={6}
                  more={<ExpandMoreIcon fontSize="large" />}
                  less={<ExpandLessIcon />}
                  anchorClass=""
                  onClick={executeOnClick}
                  expanded={false}
                >
                  {props.content}
                </ShowMoreText>
              </DetailContent>
              <Good bid={bid} mid={mid} good={props.good} pick={props.pick} goodnum={props.goodnum}/>
            </LeftContainer>
            <RightContainer>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <p>댓글 목록</p>
                <div>
                  <ClearTwoToneIcon
                    fontSize="large"
                    style={{
                      cursor: "pointer",
                      marginTop: "-20%",
                      marginRight: "-28px",
                    }}
                    onClick={props.close}
                  />
                </div>
              </div>

              {<CommentList comment={comments} />}
              <CommentBox
                style={{
                  height: "auto",
                  minHeight: "35%",
                  maxHeight: "65%",
                  width: "100%",
                  marginTop: "60px",
                  overflow: "auto",
                }}
              >
               
              </CommentBox>
              {/*안풋바 */}

              <ChatInput id={props} />

              <form
                style={{
                  marginTop: "30px",
                  width: "100%",
                  height: "46px",
                  textAlign: "right",
                }}
              >
                <div>
                  {board === mId ? (
                    <>
                      <Button
                        className="btn btn-warning"
                        onClick={() => setIsModalOpen(true)}
                      >
                        수정
                      </Button>
                      <UploadUpdate
                        {...props}
                        open={IsModalOpen}
                        close={onClose}
                      />
                      <Button className="btn btn-danger" onClick={deleteBoard}>
                        삭제
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </RightContainer>
           
          </MainContentContainer>
        </TotalContainer>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
}