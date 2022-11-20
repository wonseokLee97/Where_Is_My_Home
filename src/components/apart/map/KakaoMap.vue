<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  mounted() {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.type = "text/javascript";
    script.src = process.env.VUE_APP_KAKAO_URL;
    document.head.appendChild(script);

    this.container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.2057155248371, 126.81148246309938),
      level: 3,
    };

    this.map = new kakao.maps.Map(this.container, options);
    this.marker = new kakao.maps.Marker({
      map: this.map,
      position: this.map.getCenter(),
    });
  },
  methods: {
    setMarker(...args) {
      var geocoder = new kakao.maps.services.Geocoder();

      var lng = 126.81148246309938;
      var lat = 35.2057155248371;

      if (arguments.length == 1) {
        // 주소로 좌표를 검색
        geocoder.addressSearch(args[0], function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            lng = result[0].x;
            lat = result[0].y;
          }
        });
      } else if (arguments.length == 2) {
        lng = args[0];
        lat = args[1];
      }

      var coords = new kakao.maps.LatLng(lat, lng);
      this.marker.setPosition(coords);
      // 지도 중심좌표를 접속위치로 변경
      this.map.setCenter(coords);

      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
