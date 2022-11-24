<template>
  <b-container class="bv-example-row">
    <br />
    <b-row class="text-center">
      <b-col md="8" offset-md="2">
        <b-form @submit="search">
          <b-input-group>
            <b-form-input id="content" type="text" placeholder="search" ref="content" v-model="word" />
            <template #append>
              <b-button type="submit" variant="outline-secondary">검색</b-button>
            </template>
          </b-input-group>
          <template v-if="searchList.length">검색어 추천: {{ searchList | listToString }}</template>
        </b-form>
      </b-col>
    </b-row>
    <br />
  </b-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

const apartStore = "apartStore";

export default {
  name: "ApartNameSearch",
  data() {
    return {
      word: "",
    };
  },
  methods: {
    ...mapActions(apartStore, ["searchAptNames", "getAptByName"]),
    ...mapMutations(apartStore, ["SET_SEARCH_LIST"]),
    search(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      if (!this.word) {
        msg = "검색어를 입력해주세요";
        err = false;
        this.$refs.content.focus();
      }

      if (!err) alert(msg);
      else {
        this.getAptByName(this.word);
        this.SET_SEARCH_LIST([]);
      }
    },
  },
  computed: {
    ...mapState(apartStore, ["searchList"]),
  },
  watch: {
    word() {
      this.searchAptNames(this.word);
    },
  },
  beforeDestroy() {
    this.SET_SEARCH_LIST([]);
  },
  filters: {
    listToString(list) {
      let ret = "";
      for (let item of list) {
        ret += item + " ";
      }
      return ret;
    },
  },
};
</script>

<style></style>
