<template>
  <b-container class="bv-example-row mt-3">
    <b-card no-body style="width: 100%">
      <b-card-sub-title><br />{{ comment.userId }} {{ comment.regtime }}</b-card-sub-title>
      <template v-if="modify">
        <board-comment-input type="modify" @cancle="cancle" :mcomment="comment" />
      </template>
      <template v-else>
        <b-card-body class="text-left">
          <b-col class="text-right" v-if="userInfo.userId === comment.userId">
            <b-icon icon="pen" @click="modifyComment" />
            &nbsp;
            <b-icon icon="x-square" @click="deleteCommentAction" />
          </b-col>
          <div v-html="message" />
        </b-card-body>
      </template>
    </b-card>
  </b-container>
</template>

<script>
import BoardCommentInput from "@/components/board/comment/BoardCommentInput";
import { mapState, mapActions } from "vuex";

const boardStore = "boardStore";
const memberStore = "memberStore";

export default {
  name: "BoardCommentItem",
  components: {
    BoardCommentInput,
  },
  data() {
    return {
      modify: false,
    };
  },
  props: {
    comment: {},
  },
  methods: {
    ...mapActions(boardStore, ["deleteComment"]),
    modifyComment() {
      this.modify = true;
    },
    deleteCommentAction() {
      if (confirm("삭제하시겠습니까?")) {
        this.deleteComment(this.comment);
      }
    },
    cancle() {
      this.modify = false;
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.comment.content) return this.comment.content.split("\n").join("<br>");
      return "";
    },
  },
};
</script>

<style>
.blog-comment::before,
.blog-comment::after,
.blog-comment-form::before,
.blog-comment-form::after {
  content: "";
  display: table;
  clear: both;
}

.blog-comment {
  padding-left: 15%;
  padding-right: 15%;
}

.blog-comment ul {
  list-style-type: none;
  padding: 0;
}

.blog-comment img {
  opacity: 1;
  filter: Alpha(opacity=100);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
}

.blog-comment img.avatar {
  position: relative;
  float: left;
  margin-left: 0;
  margin-top: 0;
  width: 65px;
  height: 65px;
}

.blog-comment .post-comments {
  border: 1px solid #eee;
  margin-bottom: 20px;
  margin-left: 85px;
  margin-right: 0px;
  padding: 10px 20px;
  position: relative;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  background: #fff;
  color: #6b6e80;
  position: relative;
}

.blog-comment .meta {
  font-size: 13px;
  color: #aaaaaa;
  padding-bottom: 8px;
  margin-bottom: 10px !important;
  border-bottom: 1px solid #eee;
}

.blog-comment ul.comments ul {
  list-style-type: none;
  padding: 0;
  margin-left: 85px;
}

.blog-comment-form {
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 40px;
}

.blog-comment h3,
.blog-comment-form h3 {
  margin-bottom: 40px;
  font-size: 26px;
  line-height: 30px;
  font-weight: 800;
}
</style>
