<template>
  <div class="bv-example-row">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide :img-src="require('@/assets/main.jpg')"></b-carousel-slide>
      <!-- <b-carousel-slide :img-src="require('@/assets/main2.jpg')"></b-carousel-slide> -->
    </b-carousel>
    <div class="bv-example-row container">
      <br />
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card
            class="middle-position-myPage text-center mt-3"
            style="max-width: 40rem"
            align="left"
          >
            <b-form @submit="doModify" class="text-left">
              <br />
              <div>
                <h4>내 정보</h4>
              </div>
              <hr />
              <br />
              <b-form-group label="아이디:" label-for="userid">
                <b-form-input :disabled="true" v-model="user.userId"></b-form-input>
              </b-form-group>
              <b-form-group label="이름:" label-for="username">
                <b-form-input
                  type="text"
                  id="username"
                  ref="username"
                  v-model="user.userName"
                  required
                  placeholder="이름"
                  @keyup.enter="confirm"
                />
              </b-form-group>
              <b-form-group label="비밀번호:" label-for="userpwd">
                <b-form-input
                  type="password"
                  id="userpwd"
                  ref="userpwd"
                  v-model="user.userPwd"
                  required
                  placeholder="비밀번호"
                  @keyup.enter="confirm"
                />
              </b-form-group>
              <b-form-group label="이메일:" label-for="emailid">
                <b-form-input
                  type="text"
                  id="emailid"
                  ref="emailid"
                  v-model="user.emailId"
                  required
                  placeholder="이메일 아이디"
                  @keyup.enter="confirm"
                />
                <span>@</span>
                <b-form-select v-model="user.emailDomain" @change="onChange($event)" class="mb-3">
                  <b-form-select-option value="gmail.com">Gmail</b-form-select-option>
                  <b-form-select-option value="naver.com">Naver</b-form-select-option>
                  <b-form-select-option value="ssafy.com">SSAFY</b-form-select-option>
                  <b-form-select-option value="kakao.com">KaKao</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <b-button type="submit" variant="secondary" class="m-1">수정</b-button>
              <b-button type="button" variant="danger" class="m-1 float-right" @click="doDelete"
                >회원탈퇴</b-button
              >
            </b-form>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "@/store";

const memberStore = "memberStore";
export default {
  data() {
    return {
      check: {
        idCheck: false,
      },
      user: {
        // userId: this.userInfo.userId,
        // userPwd: this.userInfo.userPwd,
        // userName: this.userInfo.userName,
        // emailId: this.userInfo.emailId,
        // emailDomain: this.userInfo.emailDomain,
        userId: "",
        userPwd: "",
        userName: "",
        emailId: "",
        emailDomain: "",
      },
    };
  },
  created() {
    this.user = store.getters["memberStore/checkUserInfo"];
    console.log(this.user);
  },
  methods: {
    ...mapActions(memberStore, ["modifyUser", "deleteUser"]),

    onChange(event) {
      console.log("==" + event + "==");
    },
    doModify(event) {
      event.preventDefault();
      this.modifyUser(this.user);
    },
    doDelete() {
      // event.preventDefault();
      console.log("탈퇴!!");
      this.deleteUser(this.user.userId);
    },
  },

  computed: {
    idState() {
      return this.user.userId.length >= 6 ? true : false;
      // if (this.user.userId == "") {
      //     return null;
      // } else if (this.user.userId.length >= 6){
      //     return true;
      // } else {
      //     return false;
      // }
    },
  },
};
//
</script>

<style>
.middle-position-myPage {
  z-index: 2;
  bottom: -150px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.45);
  /* max-width: 50rem; */
  width: 38vw;
  position: absolute;
}
</style>
