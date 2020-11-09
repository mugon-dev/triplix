import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../MainArea/Loader";
import Picture from "../MainArea/Picture";
import FlipMove from "react-flip-move";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const Container = styled.div`
  width: 1440px;
  margin: 36px 0;
  columns: 3;
  column-gap: 40px;
`;

const UserBoardList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
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
        console.log(posts);
      });
  }, []);
  return (
    <InfiniteScroll
      dataLength={posts.length}
      // next={(mood && moodNext) || next}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <Container>
        <FlipMove>

          {posts.map(({ post, id, btitle, bcontent, member, comment, bimage, bId, good, latitude, longitude, pick, bgoodNum }) => (
            <Picture
              id={member.id}
              name={member.mname}
              bId={id}
              title={btitle}
              content={bcontent}
              member={member}
              image={bimage}
              good={good}
              pick={pick}
              comment={comment}
              latitude={latitude}
              longitude={longitude}
              goodnum={bgoodNum}
            />
          ))}

        </FlipMove>
      </Container>
    </InfiniteScroll>
  );
};

export default UserBoardList;
