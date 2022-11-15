<template>
  <div>
    <div>
      <b-table responsive :items="board.articles" :fields="fields">
        <template #cell(subject)="data">
          <a :href="`/board/view/${data.item.articleno}`">{{ data.value }}</a>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState({
      board: (state) => state.board,
    }),
  },
};
</script>

<style></style>
