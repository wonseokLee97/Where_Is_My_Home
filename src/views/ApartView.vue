<template>
  <div>
    <h3><b-icon icon="map"></b-icon> Apart Service</h3>
    <!-- search bar -->
    <apart-search></apart-search>
    <!-- map -->
    <kakao-map></kakao-map>
    <!-- modal -->
    <button @click="showModal">버튼</button>
    <template v-if="modal">
      <apart-info aptCode="11110000000002" @closeModal="closeModal"></apart-info>
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
    };
  },
  components: {
    KakaoMap,
    ApartSearch,
    ApartInfo,
  },
  methods: {
    showModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
  },
};
</script>

<style></style>
