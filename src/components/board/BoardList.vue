<template>
  <div>
    <board-serach></board-serach>
    <br />
    <div>
      <b-table responsive :items="articles" :fields="fields">
        <template #cell(subject)="data">
          <router-link :to="`/board/view/${data.item.articleno}`">{{ data.value }}</router-link>
        </template>
      </b-table>
    </div>
    <b-col class="text-left">
      <b-button variant="dark" to="/board/write" class="m-1">글쓰기</b-button>
    </b-col>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BoardSerach from "./search/BoardSerach.vue";
export default {
  name: "BoardList",
  data() {
    return {
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    this.$store.dispatch("getArticles");
  },
  components: {
    BoardSerach,
  },

  computed: {
    ...mapState({
      articles: (state) => state.board.articles,
    }),
  },
};
</script>

<style></style>
