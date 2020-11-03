/*global kakao*/
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const UserMap = () => {
  const [posts, setPosts] = useState([]);
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

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // {posts.map(
    //   ({
    //     bimage,
    //     latitude,
    //     longitude
    //   }) => (

    //   )
    // )}
    const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);
  return (
    <div>
      <div
        id="myMap"
        style={{
          width: "500px",
          height: "500px",
        }}
      ></div>
    </div>
  );
};

export default UserMap;
