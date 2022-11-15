<template>
  <div>
    <div>
      <b-table responsive :items="qna.qnas"></b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BoardList",
  created() {
    this.$store.dispatch("getQnas");
  },
  computed: {
    ...mapState({
      qna: (state) => state.qna,
    }),
  },
};
</script>

<style></style>
