<template>
  <b-container class="bv-example-row">
    <b-form-select
      v-model="dongInfo.sidoName"
      :options="sidoList"
      text-field="시도 목록"
      @change="changeSido"
      prepend
    ></b-form-select>
    <b-form-select v-model="dongInfo.gugunName" :options="gugunList" text-field="구군 목록"></b-form-select>
    <b-button @click="getApartList(dongInfo)">검색</b-button>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const apartStore = "apartStore";

export default {
  name: "ApartSearch",
  data() {
    return {
      dongInfo: {
        sidoName: "",
        gugunName: "",
      },
    };
  },
  computed: {
    ...mapState(apartStore, ["sidoList", "gugunList"]),
  },
  created() {
    this.getSidoList();
  },
  methods: {
    ...mapActions(apartStore, ["getSidoList", "getGugunList", "getApartList"]),
    changeSido() {
      this.getGugunList(this.dongInfo);
    },
    changeGugun() {
      this.getDongList(this.dongInfo);
    },
  },
};
</script>

<style>
.custom-select {
  width: 30%;
  margin: 10px;
}
</style>
