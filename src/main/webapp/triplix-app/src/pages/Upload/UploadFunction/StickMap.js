/*global kakao*/
import React, { useEffect, useState } from "react";
const { kakao } = window;
function StickMap(props) {
  const [location, setLocation] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
  });

  useEffect(() => {
    const container = document.getElementById("stickMap");
    const options = {
      center: new kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options); // 지도를 생성합니다
    const markerPosition = new kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);
  return (
    <div>
      <div
        id="stickMap"
        style={{
          width: "200px",
          height: "200px",
        }}
      ></div>
    </div>
  );
}

export default StickMap;
