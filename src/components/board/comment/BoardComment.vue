<template>
  <div>
    <div v-for="(comment, index) in comments" :key="index">
      <template v-if="ifModify(comment.commentno)">
        <board-comment-input type="modify" :mcomment="comment" />
      </template>
      <template v-else>
        <board-comment-item :comment="comment" />
      </template>
    </div>
  </div>
</template>

<script>
import BoardCommentItem from "@/components/board/comment/BoardCommentItem";
import BoardCommentInput from "@/components/board/comment/BoardCommentInput";
import { mapGetters } from "vuex";

export default {
  name: "BoardComment",
  components: {
    BoardCommentItem,
    BoardCommentInput,
  },
  props: {
    comments: [],
  },
  computed: {
    ...mapGetters(["modifyno"]),
  },
  methods: {
    ifModify(commentno) {
      return this.modifyno == commentno;
    },
  },
};
</script>

<style></style>
