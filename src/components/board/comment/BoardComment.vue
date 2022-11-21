<template>
  <div>
    <div v-for="comment in comments" :key="comment.commentNo">
      <board-comment-item :comment="comment" />
    </div>
  </div>
</template>

<script>
import BoardCommentItem from "@/components/board/comment/BoardCommentItem";

export default {
  name: "BoardComment",
  components: {
    BoardCommentItem,
  },
  props: {
    comments: [],
  },
};
</script>

<style></style>
