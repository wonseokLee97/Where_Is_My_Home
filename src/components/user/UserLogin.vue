<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>로그인</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</b-alert>
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                ref="userid"
                v-model="user.userId"
                required
                placeholder="아이디 입력...."
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
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button type="button" variant="secondary" class="m-1" @click="confirm">로그인</b-button>
            <b-button type="button" variant="dark" class="m-1" @click="moveJoin">회원가입</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      isLoginError: false,
      user: {
        userId: null,
        userPwd: null,
      },
    };
  },
  methods: {
    confirm() {
      console.log(this.user);
      if (this.user.userId == null) {
        alert("아이디를 입력하세요!");
        this.$refs.userid.focus();
      } else if (this.user.userPwd == null) {
        alert("비밀번호를 입력하세요!");
        this.$refs.userpwd.focus();
      } else {
        this.$store.dispatch("setLoginUser", this.user);
        this.$router.push({ name: "home" });
      }
    },
    moveJoin() {
      this.$router.push({ name: "join" });
    },
  },
};
</script>

<style></style>
