/*global kakao*/
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const Container = styled.div`
  width: 900px;
  height: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const UserMap = (props) => {
  const [posts, setPosts] = useState(props);
  console.log(1, props);
  useEffect(() => {
    const container = document.getElementById("userMap");
    const options = {
      center: new kakao.maps.LatLng(38.030524123908684, 127.39839986319302),
      level: 14,
    };
    const map = new kakao.maps.Map(container, options);

    {
      console.log(2, posts.posts[0].latitude);
      //console.log(3, posts[0].posts[0].latitude);
      console.log(posts.posts.map((posts) => console.log(4, posts.latitude)));
      posts.posts.map(
        (posts) =>
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(posts.latitude, posts.longitude),
            image: new kakao.maps.MarkerImage(
              posts.bimage,
              new kakao.maps.Size(64, 69),
              { offset: new kakao.maps.Point(27, 69) }
            ), // 마커이미지 설정
          })
      );
    }
  }, []);

  return (
    <Container>
      <div
        id="userMap"
        style={{
          width: "800px",
          height: "700px",
        }}
      ></div>
    </Container>
  );
};

export default UserMap;
