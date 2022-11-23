<template>
  <div>
    <div id="qna-box">
      <b-table id="table-box" class="lex-grow-1 text-left" :items="qnasD" :fields="fields">
        <template #cell(state)="data">
          <h6 v-if="data.value == 1">답변완료</h6>
          <h6 v-else>미답변</h6>
        </template>
        <template #cell(subject)="data">
          <router-link :to="``" @click.native="moveList(data.item)">{{ data.value }}</router-link>
        </template>
      </b-table>
      <b-col class="text-right">
        <b-button @click="onModal" class="m-1">문의하기</b-button>
      </b-col>
    </div>
  </div>
</template>


<script>
import { mapActions, mapMutations, mapState } from "vuex";
// import QnaModal from './QnaModal.vue';

const boardStore = "boardStore";

export default {
  name: "QnaList",
  data() {
    return {
      qnasD: null,
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
    // this.qnasD = this.qnas;
  },
  // components: {
  //   QnaModal,
  // },
  computed: {
    ...mapState(boardStore, ["qnas", "qnaCnt", "isModal"]),
  },

  watch: {
    qnas() {
      console.log("changed");
      console.log(this.qnasD);
      console.log(this.qnas);
      this.qnasD = this.qnas;
    }
  },

  methods: {
    ...mapActions(boardStore, ["listQna"]),
    ...mapMutations(boardStore, ["SET_QNA_MODAL"]),

    onModal() {
      console.log(this.isModal);
      this.SET_QNA_MODAL(true);
      console.log(this.isModal);
    },
  },
};
</script>
<style>
body {
  margin: 0
}
div {
  box-sizing: border-box;
}
/* #table-box {
  margin: 0 auto;
  width: 50%;
} */
#qna-box {
  margin: 0 auto;
  width: 50%;
}
</style>
