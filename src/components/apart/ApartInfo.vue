<template>
  <b-modal
    id="modal-xl"
    size="xl"
    ref="my-modal"
    lazy
    hide-footer
    @hidden="hideModal"
    header-close-content="x"
    scrollable
  >
    <div v-bar class="box">
      <div>
        <template v-if="isFavoriteApt">
          <p class="h1 mb-2 sticky2" @click="removeFavorite">
            <b-icon-bookmark-heart-fill variant="danger" />
          </p>
        </template>
        <template v-else>
          <p class="h1 mb-2 sticky2" @click="addFavorite">
            <b-icon-bookmark-heart variant="danger" />
          </p>
        </template>

        <a name="home"></a>

        <apart-info-nav />
        <h3><a name="loadview">로드뷰</a></h3>
        <kakao-load-view :road="apartInfo" />
        <hr />

        <h3><a name="info">아파트 정보</a></h3>
        <b-table stacked :items="[apartInfo]" :fields="fields" />
        <hr />

        <h3><a name="store">상권 정보</a></h3>
        <store-info />
        <hr />

        <h3><a name="list">거래 내역</a></h3>
        <apart-deal-list :aptCode="aptCode" />
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApartDealList from "./ApartDealList";
import ApartInfoNav from "./ApartInfoNav";
import KakaoLoadView from "./map/KakaoLoadView";
import StoreInfo from "./StoreInfo";

const apartStore = "apartStore";
const memberStore = "memberStore";

export default {
  components: {
    ApartDealList,
    KakaoLoadView,
    ApartInfoNav,
    StoreInfo,
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
      param: Object,
    };
  },
  props: ["aptCode"],
  computed: {
    ...mapState(apartStore, ["apartInfo", "isFavoriteApt"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  async created() {
    await this.getApartInfo(this.aptCode);
    this.param = {
      userId: this.userInfo.userId,
      aptCode: this.aptCode,
    };
    this.checkFavoriteApt(this.param);
  },
  methods: {
    ...mapActions(apartStore, [
      "getApartInfo",
      "checkFavoriteApt",
      "addFavoriteApt",
      "removeFavoriteApt",
    ]),
    hideModal() {
      this.$refs["my-modal"].hide();
      this.$emit("closeModal");
    },
    addFavorite() {
      console.log(this.param);
      this.addFavoriteApt(this.param);
    },
    removeFavorite() {
      this.removeFavoriteApt(this.param);
    },
  },
  mounted() {
    this.$refs["my-modal"].show();
  },
};
</script>

<style scoped>
.box {
  text-align: center;
  height: 100%;
  background-size: 100%;
  font-size: 15px;
}

.sticky2 {
  position: fixed;
  top: 35px;
  text-align: left;
  width: 50px;
  z-index: 10;
}
</style>
