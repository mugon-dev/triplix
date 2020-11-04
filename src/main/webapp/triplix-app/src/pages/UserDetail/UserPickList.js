import React from "react";
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
          {posts.map(
            ({
              post,
              id,
              btitle,
              bcontent,
              member,
              comment,
              bimage,
              bId,
              good,
            }) => (
              <Picture
                id={member.mname}
                bId={id}
                title={btitle}
                content={bcontent}
                member={member}
                image={bimage}
                good={good}
                comment={comment}
              />
            )
          )}
        </FlipMove>
      </Container>
    </InfiniteScroll>
  );
};

export default UserPickList;
