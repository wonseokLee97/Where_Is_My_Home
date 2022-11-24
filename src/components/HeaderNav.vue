<template>
  <div>
    <b-navbar class="header-nav" toggleable="lg" variant="faded" type="light" style="height: 80px">
      <b-navbar-brand tag="h1" class="mb-0" to="/" style="padding-left:10px;;">AS-APT</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="padding-left:13px;">
          <b-nav-item to="/apart">아파트</b-nav-item>
          <b-nav-item-dropdown text="게시판">
            <b-dropdown-item to="/board">자유게시판</b-dropdown-item>
            <b-dropdown-item to="/qna">Q&A</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" style="padding-right:13px;">
          <template v-if="userInfo">
            <b-nav-item @click="mypage" right>마이페이지</b-nav-item>
            <b-nav-item @click="favoriteApts" right>관심아파트</b-nav-item>
            <b-nav-item @click="logout" right>로그아웃</b-nav-item>
            <b-nav-item disabled>
              {{ userInfo.userId }} <template v-if="userInfo.grade == 'A'">(관리자)</template>
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="/login">로그인</b-nav-item>
            <b-nav-item to="/signup">회원가입</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "HeaderNav",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    mypage() {
      this.$router.push({ name: "mypage" });
    },
    favoriteApts() {
      this.$router.push({ name: "favoriteapt" });
    },
    logout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
.header-nav {
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
  z-index: 10;
}
</style>
