<template>
  <b-container class="bv-example-row mt-3">
    <br />
    <b-row>
      <b-col></b-col>
      <b-col cols="6">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <br />
            <div>
              <h4>로그인</h4>
            </div>
            <hr />
            <br />
            <b-alert show variant="danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</b-alert>
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                ref="userid"
                v-model="user.userId"
                required
                placeholder="아이디 입력"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                ref="userpwd"
                v-model="user.userPwd"
                required
                placeholder="비밀번호 입력"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button type="button" variant="secondary" class="m-1" @click="confirm"> 로그인 </b-button>
            <b-button type="button" variant="light" class="m-1" @click="moveFindpw"> 비밀번호 찾기 </b-button>
            <hr />
            <b-button type="button" variant="dark" class="m-1" @click="moveJoin"> 회원가입 </b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      user: {
        userId: null,
        userPwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      if (this.user.userId == null) {
        alert("아이디를 입력하세요!");
        this.$refs.userid.focus();
      } else if (this.user.userPwd == null) {
        alert("비밀번호를 입력하세요!");
        this.$refs.userpwd.focus();
      } else {
        await this.userConfirm(this.user);
        let token = sessionStorage.getItem("access-token");
        if (this.isLogin) {
          await this.getUserInfo(token);
          this.$router.push({ name: "home" });
        }
      }
    },
    moveJoin() {
      this.$router.push({ name: "signup" });
    },
    moveFindpw() {
      this.$router.push({ name: "findpw" });
    },
  },
};
</script>

<style></style>
