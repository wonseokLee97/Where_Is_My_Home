<template>
  <div>
    <br>
    <h3><b-icon icon="map"></b-icon> Apart Service</h3>
    <b-button @click="toggle">
      <template v-if="searchName"> 아파트 이름으로 검색 </template>
      <template v-else> 시군구 정보로 검색 </template>
    </b-button>
    <!-- search bar -->
    <template v-if="searchName">
      <apart-name-search></apart-name-search>
    </template>
    <template v-else>
      <apart-search></apart-search>
    </template>
    <br>
    <!-- map -->
    <kakao-map @click="showModal"></kakao-map>
    <!-- modal -->
    <template v-if="modal">
      <apart-info :aptCode="aptCode" @closeModal="closeModal"></apart-info>
    </template>
  </div>
</template>

<script>
import KakaoMap from "@/components/apart/map/KakaoMap";
import ApartSearch from "@/components/apart/ApartSearch";
import ApartInfo from "@/components/apart/ApartInfo";
import ApartNameSearch from "@/components/apart/ApartNameSearch";

export default {
  name: "ApartView",
  data() {
    return {
      modal: false,
      aptCode: "",
      searchName: false,
    };
  },
  components: {
    KakaoMap,
    ApartSearch,
    ApartInfo,
    ApartNameSearch,
  },
  methods: {
    showModal(aptCode) {
      this.modal = true;
      this.aptCode = aptCode;
    },
    closeModal() {
      this.modal = false;
      this.aptCode = "";
    },
    toggle() {
      this.searchName = !this.searchName;
    },
  },
};
</script>

<style></style>
