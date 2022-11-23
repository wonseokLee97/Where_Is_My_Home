<template>
  <div id="app">
    <qna-modal></qna-modal>
    <br /><br /><br /><br />
    <h1>QnA</h1>
    <br />
    <qna-list></qna-list>
  </div>
</template>

<script>
// import QnaCategory from "./Category/QnaCategory.vue";
import QnaList from "./QnaList.vue";
import QnaModal from './QnaModal.vue';

export default {
  components: { QnaList, QnaModal },
};
</script>

<style></style>
