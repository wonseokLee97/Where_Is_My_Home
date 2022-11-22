<template>
  <b-modal
    id="modal-xl"
    size="xl"
    ref="my-modal"
    scrollable
    lazy
    hide-footer
    @hidden="hideModal"
    header-close-content="x"
    title-html="아파트 정보"
  >
    <a name="home"></a>

    <apart-info-nav />
    <h3><a name="loadview">로드뷰</a></h3>
    <kakao-load-view :road="apartInfo" />
    <hr />

    <h3><a name="info">아파트 정보</a></h3>
    <b-table stacked :items="[apartInfo]" :fields="fields" />
    <hr />

    <h3><a name="list">거래 내역</a></h3>
    <apart-deal-list :aptCode="aptCode" />

    <b-button class="mt-3" variant="outline-danger" block @click="hideModal"> Close </b-button>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApartDealList from "./ApartDealList";
import ApartInfoNav from "./ApartInfoNav";
import KakaoLoadView from "./map/KakaoLoadView";

const apartStore = "apartStore";

export default {
  components: {
    ApartDealList,
    KakaoLoadView,
    ApartInfoNav,
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
