<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Where is my home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/board">Q&A</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="#" v-if="getUser" @click="logout">Logout</b-nav-item>
          <b-nav-item to="/login" v-else>Login</b-nav-item>
          <span>{{ userid }}</span>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderNav",
  methods: {
    logout() {
      // mutation 호출
      console.log("logout");
      this.$store.commit("LOGOUT");
    },
  },
  computed: {
    ...mapState({
      userid: (state) => state.member.userid,
    }),

    getUser() {
      console.log(this.userid + "!!");
      if (this.userid) {
        return true;
      } else {
        return false;
      }
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
