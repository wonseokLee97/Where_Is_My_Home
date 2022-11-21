<template>
  <b-modal id="modal-lg" size="lg" ref="my-modal" hide-footer title="아파트 정보">
    <h3>아파트 정보</h3>
    <kakao-load-view :road="apartInfo" />
    <b-table stacked :items="[apartInfo]" :fields="fields" />
    <apart-deal-list :aptCode="aptCode" />
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal"> Close </b-button>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApartDealList from "./ApartDealList";
import KakaoLoadView from "./map/KakaoLoadView";

const apartStore = "apartStore";

export default {
  components: {
    ApartDealList,
    KakaoLoadView,
  },
  name: "AptInfo",
  data() {
    return {
      fields: [
        { key: "roadName", label: "도로명", tdClass: "tdSubject" },
        { key: "jibun", label: "지번", tdClass: "tdClass" },
        { key: "apartmentName", label: "아파트 이름", tdClass: "tdClass" },
        { key: "dong", label: "법정동", tdClass: "tdClass" },
        { key: "buildYear", label: "건축년도", tdClass: "tdClass" },
      ],
    };
  },
  props: ["aptCode"],
  computed: {
    ...mapState(apartStore, ["apartInfo"]),
  },
  created() {
    this.getApartInfo(this.aptCode);
  },
  methods: {
    ...mapActions(apartStore, ["getApartInfo"]),
    hideModal() {
      this.$refs["my-modal"].hide();
      this.$emit("closeModal");
    },
  },
  mounted() {
    this.$refs["my-modal"].show();
  },
};
</script>

<style></style>
