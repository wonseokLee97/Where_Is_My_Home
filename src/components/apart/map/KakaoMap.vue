<template>
  <div>
    <div id="map"></div>
    <p id="result"></p>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
      /* global kakao */
      positions: [],
      latlng: {
        slng: "",
        elng: "",
        slat: "",
        elat: "",
      },
    };
  },

  watch: {
    apartList() {
      //type
      if (typeof this.apartList == "string") {
        alert("해당 지역에 아파트가 없습니다!");
        this.displayUnfind(this.apartList);
        this.SET_APT_LIST("");
      } else this.displayMarkers(this.apartList);
    },
  },

  computed: {
    ...mapState("apartStore", ["apartList"]),
  },

  methods: {
    ...mapActions("apartStore", ["getApartListByLngLat"]),
    ...mapMutations("apartStore", ["SET_APT_LIST"]),

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(35.2057155248371, 126.81148246309938),
        level: 7,
      };
      this.map = new kakao.maps.Map(container, options);
      this.map.setMaxLevel(7);
    },

    displayUnfind(apartList) {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();
      const getMap = this.map;

      geocoder.addressSearch(apartList, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          getMap.setCenter(coords);
        }
      });
      kakao.maps.event.addListener(this.map, "dragend", this.loadDragList);
    },

    displayMarkers(apartList) {
      const positions = [];
      const forCluster = [];

      apartList.forEach((apt) => {
        const parse_pos = {
          title: apt.apartmentName,
          latlng: new kakao.maps.LatLng(apt.lat, apt.lng),
        };

        const fc = {
          title: apt.apartmentName,
          code: apt.aptCode,
          lat: apt.lat,
          lng: apt.lng,
        };

        positions.push(parse_pos);
        forCluster.push(fc);
      });

      // 1. 지도위의 마커 초기화
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          item.setMap(null);
        });
      }

      // 2. 마커 이미지 커스터마이징
      const imgSrc = require("@/assets/markerStar.png");
      const imgSize = new kakao.maps.Size(33, 30);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

      // 4. 지도 이동
      const bounds = positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds(),
      );

      this.map.setBounds(bounds);
      this.map.setLevel(4);

      const clusterer = new kakao.maps.MarkerClusterer({
        map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCener: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 5, // 클러스터 할 최소 지도 레벨
      });

      var data = {
        positions: forCluster,
      };

      const markers = [];
      const clusterMarkers = [];

      data.positions.forEach((position) => {
        markers.push({
          title: position.title,
          code: position.code,
          marker: new kakao.maps.Marker({
            position: new kakao.maps.LatLng(position.lat, position.lng),
            title: position.title,
            image: markerImage,
          }),
        });
      });

      const getMap = this.map;
      markers.forEach((marker) => {
        var iwContent = `<div style="padding:5px;">${marker.marker.getTitle()}</div>`;
        var iwRemoveable = true;
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        kakao.maps.event.addListener(marker.marker, "click", function () {
          infowindow.open(getMap, marker.marker);
          alert(marker.code);
        });
      });

      markers.forEach((marker) => {
        clusterMarkers.push(marker.marker);
      });

      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(clusterMarkers);

      kakao.maps.event.addListener(clusterer, "clusterclick", function () {
        this.zoom(clusterer);
      });
    },

    zoom(cluster) {
      // 현재 지도 레벨에서 1레벨 확대한 레벨
      var level = this.map.getLevel() - 5;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      this.map.setLevel(level, { anchor: cluster.getCenter() });
    },
  },

  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      // script 태그 객체 생성
      const script = document.createElement("script");
      script.src = process.env.VUE_APP_KAKAO_URL;
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
        // console.log("loaded", window.kakao);
      });
      document.head.appendChild(script);
    } else {
      // console.log("이미 로딩됨: ", window.kakao);
      this.initMap();
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
