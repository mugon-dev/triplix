import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";
import { login, logout } from "../../store";
import UploadPage from "../Upload/UploadPage";

const MarginContainer = styled.div`
  max-width: 1440px;
  margin: auto;
`;

const Container = styled.header`
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 0;
`;

const Title = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 900;
  font-size: 34px;
  line-height: 49px;
  color: #ff534b;
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterText = styled(Link)`
  text-decoration: none;
  padding: 15px;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.28px;
  color: #ffffff;

  &:hover {
    color: #ff534b;
  }
`;

const Input = styled.input`
  flex: 1;
  color: #ffffff;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -0.32px;
`;

const SearchBtn = styled.button`
  color: #ff534b;
  background-color: transparent;
  border: none;
  outline: none;
`;

const SearhContainer = styled.form`
  width: 50%;
  display: flex;
  border: 2px solid #ff534b;
  border-radius: 40px;
  padding: 5px 10px;
  align-items: center;
`;

const Label = styled.span`
  margin-top: 4px;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: -0.32px;
  font-weight: 500;
  color: #ff534b;
`;

const BackColor = {
  backgroundColor: "rgba(64, 64, 64, 0.7)",
};

const ColorStyle = {
  color: "white",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  console.log("navbar");
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [board, setBoard] = useState({
    bTitle: "",
    bContent: "",
  });
  const onClose = () => {
    setIsModalOpen(false);
  };

  const BoardRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/board/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify(board),
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        if (res === "ok") {
          alert("오케이");
        } else {
          alert("글등록 실패");
        }
      });
  };

  const isLogin = useSelector((store) => store.isLogin);
  const dispatch = useDispatch();

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const logoutProc = () => {
    localStorage.removeItem("Authorization");
    dispatch(logout());
  };
  const [area, setArea] = useState("");
  return (
    <MarginContainer>
      <Container>
        <Title to={"/"}>
          <img src="/images/NavbarLogo.png" alt="Logo" />
        </Title>
        <SearhContainer>
          <Input
            type="text"
            placeholder="지역을 검색해보세요! ex. 서울 부산 ..."
            value={area}
            onChange={(e) => setArea(e.currentTarget.value)}
          />
        </SearhContainer>

        <RegisterContainer>
          {isLogin ? (
            <>
              <Link style={ColorStyle} onClick={logoutProc}>
                로그아웃
              </Link>
              <div>|</div>
              <RegisterText
                style={ColorStyle}
                onClick={() => setIsModalOpen(true)}
              >
                글 등록
                <UploadPage open={IsModalOpen} close={onClose} />
              </RegisterText>
              <Link style={ColorStyle} to="/userpage">
                MyPage
              </Link>
            </>
          ) : (
            <>
              <RegisterText to={"/login"}>로그인</RegisterText>
              <div>|</div>
              <RegisterText to={"/register"}>회원가입</RegisterText>
            </>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/*<Avatar
                                src={user.photoURL}
                                alt={user.displayName}
                                onClick={() =>
                                    history.push(`/user/${user.uid}`)
                                }
                                style={{ cursor: 'pointer' }}
                            />*/}
          </div>
        </RegisterContainer>
      </Container>
    </MarginContainer>
  );
};
