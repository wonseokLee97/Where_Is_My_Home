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
import { mapState } from "vuex";
import BoardSerach from "./search/BoardSerach.vue";
export default {
  name: "BoardList",
  data() {
    return {
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
    }
  },
  created() {
    this.$store.dispatch("getArticles");
  },
  components: {
    BoardSerach,
  },

  methods:{
    moveList(item){
      console.log(item.userid);
      console.log(this.userid);
      if(this.userid == "admin" || this.userid == item.userid){
        this.$router.push({
          name: "boardview",
          params: { articleno: item.articleno },
        })
      } else if(item.userid != this.userid){
        alert("관리자와 작성자만 접근 가능합니다!");
      }
    },

    moveWrite(){
      if (this.userid) {
        this.$router.push({
          name: "boardwrite",
        })
      } else {
        alert("로그인 필요!")
        this.$router.push({
          name: "login",
        })
      }
    }
  },

  computed: {
    ...mapState({
      articles: (state) => state.board.articles,
      userid: (state) => state.member.userid,
    }),
  },
};
</script>

<style></style>