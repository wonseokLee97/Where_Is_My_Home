<template>
<div class="bv-example-row">
    <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade indicators img-width="1024" img-height="480">
        <b-carousel-slide :img-src="require('@/assets/main.jpg')"></b-carousel-slide>
        <!-- <b-carousel-slide :img-src="require('@/assets/main2.jpg')"></b-carousel-slide> -->
    </b-carousel>
    <div class="bv-example-row container">
        <br/>
        <b-row>
        <b-col></b-col>
        <b-col cols="6">
            <b-card class="middle-position-findPw text-center mt-3" style="max-width: 40rem" align="left">
                <b-form class="text-left">
                    <br>
                    <div>
                        <h4>비밀번호 찾기</h4>
                    </div>
                    <hr>
                    <br>
                    <h6 align="center">가입시 등록한 이메일로 이용하여 비밀번호를 재설정 해주세요.</h6>
                    <br>
                    <b-form-group label="이메일:" label-for="userEmail">
                        <b-form-input 
                            id="userEmail" 
                            ref="userEmail" 
                            v-model="user.userEmail" 
                            required placeholder="E-MAIL"
                            >
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="이름:" label-for="userName">
                        <b-form-input 
                            id="userName" 
                            ref="userName" 
                            v-model="user.userName" 
                            required
                            placeholder="NAME" 
                            >
                        </b-form-input>
                    </b-form-group>
                    <br><br>

                    <b-button type="button" variant="secondary" class="m-1" @click="moveBack" align="center">취소</b-button>
                    <b-button type="button" variant="secondary" class="m-1" @click="confirm" align="center">찾기</b-button>
                </b-form>
            </b-card>
        </b-col>
        <b-col></b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            user: {
                userEmail: null,
                userName: null,
            },
        };
    },
    computed: {
        ...mapState("memberStore", ["isValidate"]),
    },

    methods: {
        ...mapActions("memberStore", ["checkEmail", "sendEmail"]),
        async confirm() {
            if (this.user.userEmail == null) {
                alert("이메일은 필수값입니다.");
                this.$refs.userEmail.focus();
            } else if (this.user.userName == null) {
                alert("이름은 필수값입니다.");
                this.$refs.userName.focus();
            } else {
                await this.checkEmail(this.user);

                if (this.isValidate == this.user.userName) {
                    this.$router.push({ name: "login" });
                } 
            }
        },

        moveBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.middle-position-findPw {
    z-index: 2;
    bottom: -36px;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.45);
    /* max-width: 50rem; */
    width: 38vw;
    position: absolute;
}
</style>