<template>
  <div>
    <h3><b-icon icon="map"></b-icon> Apart Service</h3>
    <!-- search bar -->
    <apart-search></apart-search>
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

export default {
  name: "ApartView",
  data() {
    return {
      modal: false,
      aptCode: "",
    };
  },
  components: {
    KakaoMap,
    ApartSearch,
    ApartInfo,
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
  },
};
</script>

<style></style>
