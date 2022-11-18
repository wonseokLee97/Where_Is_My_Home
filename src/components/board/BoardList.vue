<template>
  <div>
    <board-serach></board-serach>
    <br />
    <div>
      <b-table responsive :items="articles" :fields="fields">
        <template #cell(subject)="data">
          <!-- <div @click="moveLIst">{{data.value}}</div> -->
          <!-- <button type="button" @click="moveList">{{data.value}}</button> -->
          <!-- <router-link :to="`/board/view/${data.item.articleno}`">{{ data.value }}</router-link> -->
          <router-link :to="``" @click.native="moveList(data.item)">{{ data.value }}</router-link>
        </template>
      </b-table>
    </div>
    <b-col class="text-left">
      <b-button variant="dark" @click="moveWrite" class="m-1">글쓰기</b-button>
      <!-- to="/board/write" -->
    </b-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BoardSerach from "./search/BoardSerach.vue";

const boardStore = "boardStore";

export default {
  name: "BoardList",
  components: {
    BoardSerach,
  },
  data() {
    return {
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    this.listArticle();
  },
  computed: {
    ...mapState(boardStore, ["articles"]),
  },
  methods: {
    ...mapActions(boardStore, ["listArticle"]),
    moveList(item) {
      this.$router.push({
        name: "boardview",
        params: { articleno: item.articleNo },
      });
    },
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
  },
};
</script>

<style></style>
