<template>
  <div class="bv-example-row">
    <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade indicators img-width="1024" img-height="480">
      <b-carousel-slide :img-src="require('@/assets/main.jpg')"></b-carousel-slide>
        </b-carousel>
    <div class="bv-example-row container">
      <br />
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card class="middle-position-signup text-center mt-3" align="left">
            <b-form @submit="doRegist" class="text-left">
              <br />
              <div>
                <h4>회원가입</h4>
              </div>
              <hr />
              <br />
              <b-form-group label="아이디:" label-for="userid">
                <!-- <b-form-input
                      :state = "idState"
                      type="text"
                      id="userid"
                      ref="userid"
                      v-model="user.userId"
                      required placeholder="아이디"
                      @keyup="idConfirm"/> -->
                <b-form-input
                  id="userid"
                  ref="userid"
                  v-model="user.userId"
                  :state="idState"
                  aria-describedby="input-live-idValidate input-live-feedback"
                  required
                  placeholder="아이디"
                  trim
                ></b-form-input>

                <b-form-invalid-feedback v-if="this.ready" id="input-live-feedback">
                  중복아이디 입니다!
                </b-form-invalid-feedback>

                <b-form-invalid-feedback v-else id="input-live-idValidate">
                  아이디는 6자 이상 입력하세요.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="이름:" label-for="username">
                <b-form-input
                  type="text"
                  id="username"
                  ref="username"
                  v-model="user.userName"
                  required
                  placeholder="이름"
                  @keyup.enter="onChange"
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
                  trim
                  @keyup.enter="onChange"
                />
              </b-form-group>
              <b-form-group label="비밀번호 확인:" label-for="userpwd">
                <b-form-input
                  id="userPwdCheck"
                  ref="userPwdCheck"
                  v-model="user.userPwdCheck"
                  :state="pwState"
                  aria-describedby="input-live-help input-live-feedback"
                  required
                  placeholder="비밀번호 확인"
                  trim
                  @keyup.enter="onChange"
                />

                <b-form-invalid-feedback id="input-live-feedback">
                  비밀번호가 일치하지 않습니다!
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="이메일:" label-for="emailid">
                <b-form-input
                  type="text"
                  id="emailid"
                  ref="emailid"
                  v-model="user.emailId"
                  required
                  placeholder="이메일 아이디"
                  @keyup.enter="onChange"
                />
                <span>@</span>
                <b-form-select v-model="user.emailDomain" @change="onChange($event)" class="mb-3">
                  <b-form-select-option value="gmail.com">Gmail</b-form-select-option>
                  <b-form-select-option value="naver.com">Naver</b-form-select-option>
                  <b-form-select-option value="ssafy.com">SSAFY</b-form-select-option>
                  <b-form-select-option value="kakao.com">KaKao</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <b-button type="submit" variant="secondary" class="m-1">회원등록</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const memberStore = "memberStore";

export default {
  data() {
    return {
      check: {
        idCheck: false,
        ready: false,
        pwCheck: false,
      },
      user: {
        userId: "",
        userPwd: null,
        userPwdCheck: null,
        userName: null,
        emailId: null,
        emailDomain: "gmail.com",
        grade: "G",
      },
    };
  },

  methods: {
    ...mapActions(memberStore, ["registUser", "idCheck"]),
    onChange(event) {
      console.log("==" + event + "==");
    },
    doRegist(event) {
      event.preventDefault();

      if (this.user.userId.length < 6) {
        alert("아이디 형식이 올바르지 않습니다!");
      } else if (!this.isValidId) {
        alert("아이디가 중복입니다!");
      } else if (!this.pwCheck) {
        alert("비밀번호 확인이 올바르지 않습니다!");
      } else {
        this.registUser(this.user);
      }
    },
    onReady() {
      this.ready = true;
    },
    notReady() {
      this.ready = false;
    },
    doValidate() {
      this.idCheck(this.user.userId);
    },
    pwOnReady() {
      this.pwCheck = true;
    },
    pwNotReady() {
      this.pwCheck = false;
    },
  },

  computed: {
    ...mapState(memberStore, ["isValidId"]),

    idState() {
      if (this.user.userId.length >= 6) {
        // validation 준비완료
        this.onReady();
        // 1. idCheck 실행
        this.doValidate();

        // 2. 중복 아이디가 없다면?
        if (this.isValidId) {
          return true;
        } else {
          return false;
        }
      } else if (this.user.userId.length == 0) {
        this.notReady();
        return null;
      } else {
        this.notReady();
        return false;
      }
    },

    pwState() {
      if (this.user.userPwdCheck == null) {
        console.log("비밀번호가 비었음!");
        return null;
      }
      if (this.user.userPwd === this.user.userPwdCheck) {
        this.pwOnReady();
        return true;
      } else {
        this.pwNotReady();
        return false;
      }
    },
  },

  watch: {},
};
//
</script>

<style>
.middle-position-signup {
  z-index: 2;
  bottom: -203px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.45);
  /* max-width: 50rem; */
  width: 38vw;
  position: absolute;
}
</style>
