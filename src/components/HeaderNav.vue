<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Where is my home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/board">Q&A</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="#" v-if="userInfo" @click="logout">Logout</b-nav-item>
          <b-nav-item to="/login" v-else>Login</b-nav-item>
          <b-nav-item to="/signup">SignUp</b-nav-item>
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
    logout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style>
.navbar.navbar-dark.bg-dark {
  background-color: #423d3d59 !important;
}
.navbar-brand {
  font-size: xx-large !important;
}
</style>
