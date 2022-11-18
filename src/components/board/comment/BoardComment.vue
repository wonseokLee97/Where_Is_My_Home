<template>
  <div>
    <div v-for="(comment, index) in comments" :key="index">
      <template v-if="ifModify(comment.commentNo)">
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

const boardStore = "boardStore";

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
    ...mapGetters(boardStore, ["modifyNo"]),
  },
  methods: {
    ifModify(commentNo) {
      return this.modifyNo == commentNo;
    },
  },
};
</script>

<style></style>
