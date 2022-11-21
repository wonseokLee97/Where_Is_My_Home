<template>
  <div>
    <h3><b-icon icon="map"></b-icon> Apart Service</h3>
    <!-- search bar -->
    <apart-search></apart-search>
    <!-- map -->
    <kakao-map></kakao-map>
    <!-- modal -->
    <apart-info aptCode="11110000000001"></apart-info>
  </div>
</template>

<script>
import KakaoMap from "@/components/apart/map/KakaoMap";
import ApartSearch from "@/components/apart/ApartSearch";
import ApartInfo from "@/components/apart/ApartInfo";

export default {
  name: "ApartView",
  components: {
    KakaoMap,
    ApartSearch,
    ApartInfo,
  },
};
</script>

<style></style>
