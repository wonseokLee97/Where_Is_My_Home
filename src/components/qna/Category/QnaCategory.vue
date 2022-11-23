<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
      <b-col md="8" offset-md="2">
        <h1>qna</h1>
        <b-form @submit="search">
          <b-input-group>
            <template #prepend>
              <b-select v-model="searchParam.key">
                <option value="subject">제목</option>
                <option value="userid">작성자</option>
              </b-select>
            </template>
            <b-form-input id="content" type="text" placeholder="search" ref="content" v-model="searchParam.word" />
            <template #append>
              <b-button type="submit" variant="outline-secondary">검색</b-button>
            </template>
          </b-input-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "QnaCategory",
  data() {
    return {
      searchParam: {
        key: "subject",
        word: "",
      },
    };
  },
  methods: {
    search() {
      console.log("search");
    },
  },
};
</script>

<style></style>
