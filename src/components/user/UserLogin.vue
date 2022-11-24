<template>
  <div class="bv-example-row">
    <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade indicators img-width="1024" img-height="480">
      <b-carousel-slide :img-src="require('@/assets/main.jpg')"></b-carousel-slide>
      <!-- <b-carousel-slide :img-src="require('@/assets/main2.jpg')"></b-carousel-slide> -->
    </b-carousel>
    <div class="bv-example-row container">
      <br />
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card class="middle-position-login text-center mt-3" align="left">
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
              <br>
              <b-button type="button" variant="secondary" class="m-1" @click="confirm"> 로그인 </b-button>
              <b-button type="button" variant="light" class="m-1" @click="moveFindpw"> 비밀번호 찾기 </b-button>
              <hr />
              <b-button type="button" variant="dark" class="m-1" @click="moveJoin"> 회원가입 </b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
  </div>
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

<style>
.middle-position-login{
  z-index: 2;
  bottom: -20px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.45);
  /* max-width: 50rem; */
  width: 38vw;
  position: absolute;
}
</style>
