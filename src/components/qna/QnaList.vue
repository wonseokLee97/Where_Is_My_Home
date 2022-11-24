<template>
  <div>
    <div id="qna-box">
      <b-table id="table-box" class="lex-grow-1 text-left" :items="qnasD" :fields="fields">
        <template #cell(state)="data">
          <h6 v-if="data.item.comment">답변완료</h6>
          <h6 v-else>미답변</h6>
        </template>
        <template #cell(subject)="data">
          <router-link :to="``" @click.native="moveDetail(data.item)">{{ data.value }}</router-link>
          <template v-if="flag == data.item.articleNo">
            <div v-if="data.item.comment == null" style="width: 100%">
              <hr />
              <b-textarea
                id="comment"
                v-model="comment.content"
                rows="3"
                max-rows="3"
                placeholder="내용을 입력하세요."
                no-resize
              ></b-textarea>
              <br />
              <b-col class="text-right">
                <b-button type="button" @click="moveComment()">등록</b-button>
              </b-col>
            </div>
            <div v-else>
              <hr />
              <div class="comment-box">
                <b-form-textarea no-resize disabled :value="comment.content"></b-form-textarea>
              </div>
            </div>
          </template>
        </template>
      </b-table>
      <b-col class="text-right">
        <b-button @click="onModal" class="m-1">문의하기</b-button>
      </b-col>
      <br />
      <br />
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
      flag: null,
      qnasD: null,
      comment: {
        articleNo: null,
        content: null,
      },

      fields: [
        {
          key: "state",
          label: "답변상태",
          tdClass: "tdClass",
          thStyle: { width: "20%" },
        },
        {
          key: "subject",
          label: "제목",
          tdClass: "tdSubject",
          thStyle: { width: "40%" },
        },
        {
          key: "userId",
          label: "작성자",
          tdClass: "tdClass",
          thStyle: { width: "20%" },
        },
        {
          key: "regtime",
          label: "작성일",
          tdClass: "tdClass",
          thStyle: { width: "20%" },
        },
      ],
    };
  },
  created() {
    this.listQna();
    this.qnasD = null;
  },

  // components: {
  //   QnaModal,
  // },
  computed: {
    ...mapState(boardStore, ["qnas", "qnaCnt", "isModal", "totalRows"]),
  },

  watch: {
    qnas() {
      this.flag = null;
      this.qnasD = this.qnas;
    },
  },

  methods: {
    ...mapActions(boardStore, ["listQna", "writeQnaComment"]),
    ...mapMutations(boardStore, ["SET_QNA_MODAL"]),

    onModal() {
      this.SET_QNA_MODAL(true);
    },

    moveDetail(item) {
      if (item == null) {
        this.flag = null;
        this.comment.articleNo = null;
      } else if (this.flag != null) {
        if (this.flag == item.articleNo) {
          this.flag = null;
          this.comment.articleNo = null;
        } else if (this.flag >= 0) {
          this.flag = item.articleNo;
          this.comment.articleNo = item.articleNo;
        }
      } else {
        this.flag = item.articleNo;
        this.comment.articleNo = item.articleNo;
      }
      this.comment.content = item.comment;
    },

    moveComment() {
      this.writeQnaComment(this.comment);
      this.comment.content = null;
      this.moveDetail(null);
    },
  },
};
</script>
<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.comment-box {
  background: rgb(207, 207, 207);
}
.customPagination {
  z-index: 6;
}
/* #table-box {
  margin: 0 auto;
  width: 50%;
} */
#qna-box {
  margin: 0 auto;
  width: 60%;
}
</style>
