<template>
  <div id="qna-box">
    <b-table id="table-box" class="lex-grow-1 text-left" :items="qnas" :fields="fields">
      <template #cell(subject)="data">
        <router-link :to="``" @click.native="moveList(data.item)">{{ data.value }}</router-link>
      </template>
    </b-table>
    <b-col class="text-right">
      <b-button variant="dark" @click="moveWrite" class="m-1">문의하기</b-button>
    </b-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const boardStore = "boardStore";

export default {
  name: "BoardList",
  components: {},
  data() {
    return {
      fields: [
        { key: "state", label: "답변상태", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    this.listQna(this.params);
  },
  computed: {
    ...mapState(boardStore, ["qnas"]),
  },
  methods: {
    ...mapActions(boardStore, ["listQna"]),
    moveWrite() {
      this.$router.push({ name: "qnaWrite" });
    },
  },
};
</script>
<style>
#table-box {
  width: 85vw;
  margin-left: 7%;
}
</style>
