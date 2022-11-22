<template>
  <div>
    <div id="map" class="map" ref="map"></div>
  </div>
</template>

<script>
const KAKAO_URL = process.env.VUE_APP_KAKAO_URL;

export default {
  name: "KakaoRoadView",
  props: ["road"],
  watch: {
    road: {
      deep: true,
      handler() {
        this.kakao && this.kakao.maps ? this.initMap() : this.addKakaoMapScript();
      },
    },
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = KAKAO_URL;
      document.head.appendChild(script);
      this.initMap();
    },
    initMap() {
      // var roadviewContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var roadviewContainer = this.$refs["map"];
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      //지도를 생성할 때 필요한 기본 옵션
      var position = new kakao.maps.LatLng(this.road.lat, this.road.lng); //지도의 중심좌표.

      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      }); //지도 생성 및 객체 리턴
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 500px;
}
#loadview {
  height: 600px;
  background-color: #ffffff;
}
</style>
