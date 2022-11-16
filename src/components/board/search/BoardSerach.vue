<template>
  <div>
    <b-form @submit="search">
      <b-input-group>
        <!-- <template #prepend>
        <b-input-group-text>검색</b-input-group-text>
      </template> -->
        <template #append>
          <b-form-input
            id="content"
            type="text"
            placeholder="search"
            style="width: 500px"
            ref="content"
            v-model="content"
          ></b-form-input>

          <select v-model="selected" @change="onChange($event)">
            <option value="title">제목</option>
            <option value="writer">작성자</option>
          </select>

          <b-button type="submit" variant="outline-secondary">검색</b-button>
        </template>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "BoardSearch",
  data() {
    return {
      content: "",
      selected: "title",
    };
  },

  methods: {
    onChange(event) {
      console.log("==" + event.target.value + "==");
    },

    search(event) {
      event.preventDefault();
      console.log(this.content);
      console.log(this.selected);

      let err = true;
      let msg = "";

      if (!this.content) {
        msg = "검색어를 입력해주세요";
        err = false;
        this.$refs.content.focus();
      }

      if (!err) alert(msg);
      else {
        if (this.selected == "제목") {
          this.$store.dispatch("searchTitle", this.content);
        } else {
          this.$store.dispatch("searchWriter", this.content);
        }
      }
    },
  },
};
</script>

<style></style>
