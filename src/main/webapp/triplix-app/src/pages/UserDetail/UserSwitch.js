import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserBoardList from "./UserBoardList";
import UserMap from "./UserMap";
import jwt_decode from "jwt-decode";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`;

const MoodList = styled.ul`
  display: flex;
`;

const Mood = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 46px;
  margin-left: 20px;
  box-sizing: border-box;
  color: ${(props) => (props.active ? "#ff534b" : "")};
  cursor: pointer;

  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 35px;
  letter-spacing: -0.48px;

  &:hover {
    color: #ff534b;
    transition: color 300ms ease-out;
  }
`;
const Title = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 43px;
  letter-spacing: -0.6px;
`;

const UserSwitch = (props) => {
  const [mood, setMood] = useState("");
  const [posts, setPosts] = useState([]);
  const moods = ["서울", "대전", "대구", "부산", "찍고", "아하", "~!"];
  useEffect(() => {
    //위도,경도, 이미지 가져오기
    let jwtTokenTemp = localStorage.getItem("Authorization");
    let jwtToken = jwtTokenTemp.replace("Bearer ", "");
    let id = jwt_decode(jwtToken).id;
    console.log(jwtToken);
    console.log(id);

    fetch("http://localhost:8000/board/my/" + id, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
      });
  }, []);
  return (
    <div>
      {(() => {
        switch (props.select) {
          case 1:
            return (
              <div>
                <HeaderContainer>
                  <Title>전국팔도유랑</Title>
                  <br />
                  <br />
                  <br />
                  <br />
                  <MoodList>
                    {moods.map((moodText) => (
                      <Mood
                        key={moodText}
                        active={moodText === mood ? true : false}
                      >
                        {moodText}
                      </Mood>
                    ))}
                  </MoodList>
                </HeaderContainer>
                <br />
                <br />
                <br />
                <br />
                <UserBoardList />
              </div>
            );
          case 2:
            return <div>미구현</div>;
          default:
            return (
              <div>
                <UserMap posts={posts} />
              </div>
            );
        }
      })()}
    </div>
  );
};

export default UserSwitch;
