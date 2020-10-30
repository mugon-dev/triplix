import React, { useState } from "react";
import styled from "styled-components";
import { SignUpLabel } from "../components/CommonStyle/SignUpLabel";
import { BackgroundBox } from "../components/CommonStyle/BackgroundBox";
import { InputBar } from "../components/CommonStyle/InputBar";
import { useHistory, Link } from "react-router-dom";
import { SubmittBtn } from "../components/CommonStyle/SubmittBtn";
import { useDispatch } from "react-redux";
import { login } from "../store";
import { SocialCollection } from "../components/CommonStyle/SocialCollection";
//import { SubmittBtn } from '../components/CommonStyle/SubmittBtn';
//import { BackgroundBox } from '../components/CommonStyle/BackgroundBox';
//import { InputBar } from '../components/CommonStyle/InputBar';
import { MainTheme } from "../components/CommonStyle/MainTheme";
//import { SignUpLabel } from '../components/CommonStyle/SignUpLabel';
import { SocialBox } from "../components/CommonStyle/SocialBox";
import { SocialFont } from "../components/CommonStyle/SocialFont";
import { SocialImage } from "../components/CommonStyle/SocialImage";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const LoginLabel = styled.div`
  margin-top: 5%;
  font-weight: 300;
  font-size: 30px;
  line-height: 43px;
  color: #ffffff;
`;

const IDCheckLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 87%;
  margin-top: -2%;
  letter-spacing: -1px;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
`;

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [member, setMember] = useState({
    mid: "",
    mpw: "",
  });

  const onLoginHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/member/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(member),
    })
      .then((res) => {
        //로컬 스토리지 저장
        for (let header of res.headers.entries()) {
          if (header[0] === "authorization") {
            localStorage.setItem("Authorization", header[1]);
          }
        }
        return res.text();
      })
      .then((res) => {
        if (res === "ok") {
          console.log(member);
          // 로그인 상태 값 리덕스 저장
          dispatch(login());
          props.history.push("/");
        } else {
          alert("아이디 혹은 비번을 다시 입력하세요!");
        }
      });
  };

  const changeValue = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainTheme bg={"/images/loginbg.jpg"}>
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <KeyboardBackspaceIcon
          onClick={() => {
            history.goBack();
          }}
          fontSize="large"
          style={{
            position: "absolute",
            paddingTop: "75px",
            marginLeft: "75px",
            display: "flex",
            cursor: "pointer",
            width: "50px",
            height: "50px",
            textAlign: "left",
            color: "white",
          }}
        />

        <LoginLabel>방문해주셔서 감사합니다</LoginLabel>
        <SignUpLabel style={{ marginTop: "1%" }}>
          <img
            style={{ marginRight: "30px" }}
            src="/images/NavbarLogo.png"
            alt="Logo"
          />
          &nbsp;로그인
        </SignUpLabel>

        <BackgroundBox style={{ height: "500px", marginTop: "-3%" }}>
          {/*소셜 로그인 박스*/}
          <SocialCollection>
            <SocialBox>
              <SocialImage bg={"/images/kakao.png"} />
              <SocialFont>
                카카오 아이디로
                <br /> 로그인
              </SocialFont>
            </SocialBox>
            <SocialBox>
              <SocialImage bg={"/images/naver.png"} />
              <SocialFont>
                네이버 아이디로
                <br /> 로그인
              </SocialFont>
            </SocialBox>
            <SocialBox>
              <SocialImage
                style={{
                  background: " #3B5998",
                  borderRadius: "35px",
                }}
              >
                <img src="/images/facebook.png" alt="Facebook" />
              </SocialImage>
              <SocialFont>
                페이스북 아이디로
                <br /> 로그인
              </SocialFont>
            </SocialBox>
            <SocialBox>
              <SocialImage bg={"/images/google.png"} alt="Google" />
              <SocialFont>
                구글 아이디로
                <br /> 로그인
              </SocialFont>
            </SocialBox>
          </SocialCollection>
          {/*inputBox Div*/}

          <form
            onSubmit={onLoginHandler}
            style={{
              height: "70%",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <InputBar
              style={{ height: "17%" }}
              placeholder="아이디"
              type="text"
              name="mid"
              onChange={changeValue}
            />
            <InputBar
              style={{ height: "17%", marginTop: "-3%" }}
              placeholder="비밀번호"
              type="password"
              name="mpw"
              onChange={changeValue}
            />
            <p
              style={{
                width: "86%",
                marginTop: "-4%",
                textAlign: "right",
              }}
            >
              비밀번호찾기
            </p>
            <SubmittBtn
              style={{ height: "17%", marginTop: "-4%" }}
              onClick={onLoginHandler}
            >
              TRIPLIX 로그인
            </SubmittBtn>

            <IDCheckLabel>
              <p>
                아이디가 없으신가요?&nbsp;&nbsp;
                <Link style={{ color: "red" }} to={"/register"}>
                  &nbsp;가입하기
                </Link>
              </p>
            </IDCheckLabel>
          </form>
        </BackgroundBox>
      </div>
    </MainTheme>
  );
};

export default Login;
