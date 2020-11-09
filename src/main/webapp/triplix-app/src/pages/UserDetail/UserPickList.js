import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import Loader from "../MainArea/Loader";
import Picture from "../MainArea/Picture";
import FlipMove from "react-flip-move";
import jwt_decode from "jwt-decode";

const Container = styled.div`
  width: 1440px;
  margin: 36px 0;
  columns: 3;
  column-gap: 40px;
`;

const UserPickList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    //위도,경도, 이미지 가져오기
    let jwtTokenTemp = localStorage.getItem("Authorization");
    let jwtToken = jwtTokenTemp.replace("Bearer ", "");
    let id = jwt_decode(jwtToken).id;
    console.log(jwtToken);
    console.log(id);

    fetch("http://localhost:8000/pick/my/" + id, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
        console.log("board리스트" , posts);
      });
  }, []);

  console.log("bbbbbb",posts);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      // next={(mood && moodNext) || next}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <Container>
        <FlipMove>
          {posts.map(
            ({
              board
            }) => (
              <Picture
                id={board.id}
                name={board.member.mname}
                bId={board.id}
                title={board.title}
                content={board.bcontent}
                member={board.member}
                image={board.bimage}
                good={board.good}
                comment={board.comment}
                pick={board.pick}
                goodnum={board.bgoodNum}
                latitude={board.latitude}
                longitude={board.longitude}
              />
            )
          )}
        </FlipMove>
      </Container>
    </InfiniteScroll>
  );
};

export default UserPickList;
