import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../MainArea/Loader";
import Picture from "../MainArea/Picture";
import FlipMove from "react-flip-move";
import jwt_decode from "jwt-decode";

const UserBoardList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [userId, setUserId] = useState();

  useEffect(() => {
    let jwtTokenTemp = localStorage.getItem("Authorization");
    let jwtToken = jwtTokenTemp.replace("Bearer ", "");

    setUserId(jwt_decode(jwtToken).id);

    console.log("userId" + userId);

    fetch("http://localhost:8000/member/my", {
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
          {/* {posts.map(({ post, id, btitle, bcontent, member, bimage, bId }) => (
            <Picture
              id={member.mname}
              bId={id}
              title={btitle}
              content={bcontent}
              member={member}
              image={bimage}
            />
          ))} */}
        </FlipMove>
      </Container>
    </InfiniteScroll>
  );
};

export default UserBoardList;
