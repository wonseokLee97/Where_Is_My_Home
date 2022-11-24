<template>
  <div>
    <b-row class="text-center">
      <b-col md="6" offset-md="3">
        {{ this.distance }}m 이내의 상권 정보를 검색합니다.
        <b-input-group class="custon-input-group mt-3" prepend="0" append="1km">
          <b-form-input type="range" min="0" max="1000" v-model="distance" @mouseup="mouseup" />
        </b-input-group>
      </b-col>
      <b-col md="6" offset-md="3">
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="flavour-1"
          />
        </b-form-group>
      </b-col>
      <b-col md="5" offset-md="1">
        <b-table :items="storeInfo" :fields="fields" />
      </b-col>
      <b-col md="5" offset-md="1">
        <kakao-map-store :storeList="showStoreList" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import KakaoMapStore from "@/components/apart/map/KakaoMapStore";

const apartStore = "apartStore";

export default {
  name: "StoreInfo",
  components: {
    KakaoMapStore,
  },
  data() {
    return {
      distance: 0,
      fields: [
        { key: "categoryMain", label: "분류", tdClass: "tdSubject" },
        { key: "count", label: "수", tdClass: "tdClass" },
      ],
      selected: [],
      options: [],
      showStoreList: [],
    };
  },
  created() {
    this.SET_STORE_INFO([]);
    this.SET_STORE_LIST([]);
  },
  computed: {
    ...mapState(apartStore, ["apartInfo", "storeInfo", "storeList"]),
  },
  watch: {
    selected() {
      this.showStoreList = [];
      for (let store of this.storeList) {
        if (this.selected.indexOf(store.categoryMain) >= 0) {
          this.showStoreList.push(store);
        }
      }
    },
  },
  methods: {
    ...mapMutations(apartStore, ["SET_STORE_INFO", "SET_STORE_LIST"]),
    ...mapActions(apartStore, ["getStoreInfo", "getStoreList"]),
    async mouseup() {
      let param = {
        lng: this.apartInfo.lng,
        lat: this.apartInfo.lat,
        distance: this.distance / 1000,
      };
      await this.getStoreInfo(param);
      await this.getStoreList(param);

      this.options = [];
      for (let store of this.storeInfo) {
        this.options.push({ text: store.categoryMain, value: store.categoryMain });
      }
      this.showStoreList = [];
    },
  },
};
</script>

<style scoped></style>
