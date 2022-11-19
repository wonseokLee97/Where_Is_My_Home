<template>
  <div>
    <b-navbar toggleable="lg" variant="faded" type="light">
      <b-navbar-brand tag="h1" class="mb-0" to="/">Happy House</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="#">아파트</b-nav-item>
          <b-nav-item-dropdown text="게시판">
            <b-dropdown-item to="/board">자유게시판</b-dropdown-item>
            <b-dropdown-item href="#">Q&A</b-dropdown-item>
          </b-nav-item-dropdown>
          <template v-if="userInfo">
            <b-nav-item @click="mypage">Mypage</b-nav-item>
            <b-nav-item @click="logout">Logout</b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="/login">Login</b-nav-item>
            <b-nav-item to="/signup">SignUp</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
//
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
    logout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style></style>
