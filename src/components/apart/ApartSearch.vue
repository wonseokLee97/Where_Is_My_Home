<template>
  <b-container class="bv-example-row">
    <b-form-select
      v-model="sido"
      :options="sidoList"
      text-field="시도 목록"
      @change="getGugunList"
    ></b-form-select>
    <b-form-select
      v-model="gugun"
      :options="gugunList"
      text-field="구군 목록"
      @change="getDongList"
    ></b-form-select>
    <b-form-select v-model="dong" :options="dongList" text-field="동 목록"></b-form-select>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const apartStore = "apartStore";

export default {
  name: "ApartSearch",
  data() {
    return {
      sido: "",
      gugun: "",
      dong: "",
    };
  },
  computed: {
    ...mapState(apartStore, ["sidoList", "gugunList", "dongList"]),
  },
  created() {
    this.getSidoList();
  },
  methods: {
    ...mapActions(apartStore, ["getSidoList", "getGugunList", "getDongList"]),
    sidoChange() {
      this.getGugunList(this.sido);
    },
    gugunChange() {
      this.getDongList(this.gugun);
    },
  },
};
</script>

<style></style>
