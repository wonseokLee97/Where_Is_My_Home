<template>
  <div id="modalFirst" class="black-bg" v-show="onOff">
    <div id="qna-input" class="white-bg text-left">
      <br />
      <div>
        <h4>문의하기</h4>
      </div>
      <hr />
      <b-form-group label="제목:" label-for="subject">
        <b-form-input id="subject" v-model="qna.subject" placeholder="제목을 입력하세요."></b-form-input>
      </b-form-group>
      <b-form-group label="내용:" label-for="content">
        <b-form-textarea
          id="content"
          v-model="qna.content"
          rows="6"
          max-rows="6"
          placeholder="내용을 입력하세요."
          no-resize
        ></b-form-textarea>
      </b-form-group>
      <b-col class="text-center">
        <b-button type="button" variant="dark" class="m-1 text-right" @click="moveUndo"> 취소 </b-button>
        &nbsp;&nbsp;
        <b-button type="button" variant="dark" class="m-1 text-right" @click="moveJoin"> 등록하기 </b-button>
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

const boardStore = "boardStore";
const memberStore = "memberStore";

export default {
  data() {
    return {
      onOff: false,

      qna: {
        userId: null,
        subject: null,
        content: null,
      },
    };
  },
  methods: {
    ...mapMutations(boardStore, ["SET_QNA_MODAL"]),
    ...mapActions(boardStore, ["writeQna", "listQna"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),

    moveJoin(event) {
      event.preventDefault();
      this.qna.userId = this.checkUserInfo().userId;
      this.writeQna(this.qna);
      this.SET_QNA_MODAL(false);
      this.listQna();
      this.onOff;
    },

    moveUndo() {
      this.SET_QNA_MODAL(false);
    },
  },

  watch: {
    onOff() {
      this.qna.content = null;
      this.qna.subject = null;
    },

    isModal() {
      if (this.onOff == true) {
        this.onOff = false;
      } else if (this.onOff == false && this.isModal == true) {
        this.onOff = true;
      }
    },
  },

  // 새로고침을 했을 때.. isModal (false -> true) 모달창 띄어준다.
  // 새로고침을 했을 때.. isModal (true -> false)

  computed: {
    ...mapState(boardStore, ["isModal", "qnas"]),
  },

  created() {
    this.SET_QNA_MODAL(false);
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
#qna-input {
  outline: solid 1px rgba(0, 0, 0, 0.083);
}
#modalFirst {
  z-index: 2;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.152);
  position: fixed;
  padding: 20px;
}
.white-bg {
  margin: 0 auto;
  width: 30%;
  height: 55%;
  background: white;
  border-radius: 3px;
  padding: 5px 20px 0px 20px;
}
</style>
