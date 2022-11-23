<template>
  <div>
    <b-row class="text-center">
      <b-col md="5">
        <apart-deal-chart />
      </b-col>
      <b-col md="7">
        <b-table responsive :items="apartDeals" :current-page="params.pg" :per-page="params.spp" :fields="fields" />
        <b-pagination
          align="center"
          v-model="params.pg"
          pills
          :total-rows="totalRows"
          :per-page="params.spp"
          @change="pageClick"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ApartDealChart from "./ApartDealChart.vue";

const apartStore = "apartStore";

export default {
  name: "ApartDealList",
  components: { ApartDealChart },
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
  async created() {
    await this.getApartDeals(this.aptCode);
  },
  methods: {
    ...mapActions(apartStore, ["getApartDeals"]),
    pageClick(page) {
      this.params.pg = page;
      this.params.start = (this.params.pg - 1) * this.params.spp;
    },
  },
};
</script>

<style></style>
