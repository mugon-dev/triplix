/*global kakao*/
import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const { kakao } = window;

function UploadMap(props) {
  const classes = useStyles();
  const { onClose, search, open } = props;
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(search, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }
    // // 지도를 클릭한 위치에 표출할 마커입니다
    // var marker = new kakao.maps.Marker({
    //   // 지도 중심좌표에 마커를 생성합니다
    //   position: map.getCenter(),
    // });
    // // 지도에 마커를 표시합니다
    // marker.setMap(map);

    // kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    //   // 클릭한 위도, 경도 정보를 가져옵니다
    //   var latlng = mouseEvent.latLng;

    //   // 마커 위치를 클릭한 위치로 옮깁니다
    //   marker.setPosition(latlng);

    //   var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
    //   message += "경도는 " + latlng.getLng() + " 입니다";
    //   console.log(message);

    // });
    var geocoder = new kakao.maps.services.Geocoder();
    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          var content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
      var latlng = mouseEvent.latLng;
      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
      console.log(message);
      setLocation({
        latitude: latlng.getLat(),
        longitude: latlng.getLng(),
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  }, [search]);

  const handleClose = (value) => {
    console.log("위도: " + location.latitude);
    console.log("경도: " + location.longitude);
    onClose(value);
  };
  return (
    <div>
      <Container>{search}</Container>
      <div
        id="myMap"
        style={{
          width: "500px",
          height: "500px",
        }}
      ></div>
      <div class="hAddr">
        <span class="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr"></span>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleClose(location)}
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Grid>
    </div>
  );
}

export default UploadMap;
