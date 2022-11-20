<template>
  <div>
    <h3><b-icon icon="map"></b-icon> Apart Service</h3>
    <!-- search bar -->
    <apart-search></apart-search>
    <!-- map -->
    <kakao-map></kakao-map>
    <!-- modal -->
    <router-view></router-view>
  </div>
</template>

<script>
import KakaoMap from "@/components/apart/map/KakaoMap";
import ApartSearch from "@/components/apart/ApartSearch";

export default {
  name: "ApartView",
  components: {
    KakaoMap,
    ApartSearch,
  },
};
</script>

<style></style>
