<template>
  <div>
    <board-comment-item v-for="(comment, index) in comments" :key="index" :comment="comment" />
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
