<template>
  <div id="map2"></div>
</template>

<script>
import { mapState } from "vuex";

const apartStore = "apartStore";

export default {
  name: "KaKaoMapStore",
  data() {
    return {
      /* global kakao */
      map2: null,
      markers: [],
    };
  },

  props: {
    storeList: { type: Array },
  },
  computed: {
    ...mapState(apartStore, ["apartInfo"]),
  },

  watch: {
    storeList() {
      this.displayMarkers(this.storeList);
    },
  },

  methods: {
    initMap() {
      const container = document.getElementById("map2");
      const options = {
        center: new kakao.maps.LatLng(this.apartInfo.lat, this.apartInfo.lng),
        level: 2,
      };
      this.map2 = new kakao.maps.Map(container, options);
      this.map2.setMaxLevel(4);
    },

    setHouse() {
      const houseImgSrc = require("@/assets/houseIcon.png");
      const houseImgSize = new kakao.maps.Size(33, 30);
      const houseImage = new kakao.maps.MarkerImage(houseImgSrc, houseImgSize);

      const house = new kakao.maps.Marker({
        map: this.map2,
        position: new kakao.maps.LatLng(this.apartInfo.lat, this.apartInfo.lng),
        title: "house",
        image: houseImage,
      });

      var iwContent = `<div style="padding:5px;">${house.getTitle()}</div>`;
      var iwRemoveable = true;
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      console.log(house.getTitle());

      kakao.maps.event.addListener(house, "mouseover", function () {
        infowindow.open(this.map2, house);
      });

      kakao.maps.event.addListener(house, "mouseout", function () {
        infowindow.close();
      });

      this.markers.push(house);
    },

    displayMarkers(storeList) {
      const positions = [];

      if (storeList.length == 0) {
        this.markers.forEach((item) => {
          if (item.getTitle() != "house") {
            item.setMap(null);
          }
        });
        return;
      }

      storeList.forEach((apt) => {
        const parse_pos = {
          title: apt.storeName,
          latlng: new kakao.maps.LatLng(apt.lat, apt.lng),
        };

        positions.push(parse_pos);
      });

      // 1. 지도위의 마커 초기화
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          if (item.getTitle() != "house") {
            item.setMap(null);
          }
        });
      }

      // 2. 마커 이미지 커스터마이징
      const imgSrc = require("@/assets/storeIcon.png");
      const imgSize = new kakao.maps.Size(33, 30);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

      // 3. 마커 표시하기
      const getMap = this.map2;
      positions.forEach((position) => {
        const marker = new kakao.maps.Marker({
          map: this.map2,
          position: position.latlng,
          title: position.title,
          image: markerImage,
        });

        var iwContent = `<div style="padding:5px;">${marker.getTitle()}</div>`;
        var iwRemoveable = true;
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        console.log(marker.getTitle());

        kakao.maps.event.addListener(marker, "mouseover", function () {
          console.log(this.map2);
          console.log(marker);
          infowindow.open(getMap, marker);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          console.log(getMap);
          console.log(marker);
          infowindow.close();
        });

        console.log(infowindow);
        this.markers.push(marker);
      });

      // 4. 지도 이동
      const bounds = positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds()
      );

      this.map2.setBounds(bounds);
      this.map2.setLevel(2);
    },
  },

  mounted() {
    const script = document.createElement("script");
    script.src = process.env.VUE_APP_KAKAO_URL;
    script.addEventListener("load", () => {
      kakao.maps.load(this.initMap());
      this.setHouse();
    });
    document.head.appendChild(script);
  },
};
</script>

<style scoped>
#map2 {
  width: 450px;
  height: 450px;
}
</style>
