<template>
  <div>
    <h3>아파트 거래 정보 테이블</h3>
    <b-table responsive :items="apartDeals" :fields="fields" />
    <b-pagination
      align="center"
      v-model="params.pg"
      pills
      :total-rows="totalRows"
      :per-page="params.spp"
      class="customPagination"
      @change="pageClick"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const apartStore = "apartStore";

export default {
  name: "ApartDealList",
  data() {
    return {
      params: {
        pg: 1,
        spp: 10,
        start: 1,
      },
      fields: [
        { key: "dealAmount", label: "거래가", tdClass: "tdClass" },
        { key: "dealYear", label: "년", tdClass: "tdSubject" },
        { key: "dealMonth", label: "월", tdClass: "tdClass" },
        { key: "dealDay", label: "일", tdClass: "tdClass" },
        { key: "area", label: "면적", tdClass: "tdClass" },
        { key: "floor", label: "층", tdClass: "tdClass" },
      ],
    };
  },
  props: {
    aptCode: { type: String },
  },
  computed: {
    ...mapState(apartStore, ["apartDeals", "totalRows"]),
  },
  created() {
    const searchParam = {
      aptCode: this.aptCode,
      params: this.params,
    };
    this.getApartDeals(searchParam);
  },
  methods: {
    ...mapActions(apartStore, ["getApartDeals"]),
    pageClick(page) {
      this.params.pg = page;
      this.params.start = (this.params.pg - 1) * this.params.spp;
      const searchParam = {
        aptCode: this.aptCode,
        params: this.params,
      };
      this.getApartDeals(searchParam);
    },
  },
};
</script>

<style></style>
