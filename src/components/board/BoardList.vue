<template>
  <div>
    <board-search @search="search"></board-search>
    <br />
    <div>
      <b-table responsive :items="articles" :fields="fields">
        <template #cell(subject)="data">
          <router-link :to="``" @click.native="moveList(data.item)">{{ data.value }}</router-link>
        </template>
      </b-table>
    </div>
    <b-col class="text-left">
      <b-button variant="dark" @click="moveWrite" class="m-1">글쓰기</b-button>
    </b-col>
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
import { mapActions, mapState } from "vuex";
import BoardSearch from "./search/BoardSearch.vue";

const boardStore = "boardStore";

export default {
  name: "BoardList",
  components: {
    BoardSearch,
  },
  data() {
    return {
      params: {
        pg: 1,
        spp: 10,
        start: 1,
        key: null,
        word: null,
      },
      fields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    this.listArticle(this.params);
  },
  computed: {
    ...mapState(boardStore, ["articles", "totalRows"]),
  },
  methods: {
    ...mapActions(boardStore, ["listArticle"]),
    moveList(item) {
      this.$router.push({
        name: "boardview",
        params: { articleno: item.articleNo },
      });
    },
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    search(searchParam) {
      this.params.key = searchParam.key;
      this.params.word = searchParam.word;
      this.params.pg = 1;
      this.params.start = 1;
      this.listArticle(this.params);
    },
    pageClick(page) {
      this.params.pg = page;
      this.params.start = (this.params.pg - 1) * this.params.spp;
      this.listArticle(this.params);
    },
  },
};
</script>
