<template>
  <div id="app">
    <div class="qna-box">
      <qna-modal></qna-modal>
      <br /><br /><br /><br />
      <h1 style="text-align: left; margin-left: 22%">QnA</h1>
      <hr />
      <qna-list></qna-list>
    </div>
  </div>
</template>

<script>
// import QnaCategory from "./Category/QnaCategory.vue";
import QnaList from "./QnaList.vue";
import QnaModal from "./QnaModal.vue";

export default {
  components: { QnaList, QnaModal },
};
</script>

<style>
.qna-box {
}
</style>
