<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
      <b-col md="8" offset-md="2">
        <b-form @submit="search">
          <b-input-group>
            <template #prepend>
              <b-select v-model="searchParam.key">
                <option value="subject">제목</option>
                <option value="userid">작성자</option>
              </b-select>
            </template>
            <b-form-input
              id="content"
              type="text"
              placeholder="search"
              ref="content"
              v-model="searchParam.word"
            />
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
  name: "BoardSearch",
  data() {
    return {
      searchParam: {
        key: "subject",
        word: "",
      },
    };
  },
  methods: {
    search(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      if (!this.searchParam.word) {
        msg = "검색어를 입력해주세요";
        err = false;
        this.$refs.content.focus();
      }

      if (!err) alert(msg);
      else {
        this.$emit("search", this.searchParam);
      }
    },
  },
};
</script>

<style></style>
