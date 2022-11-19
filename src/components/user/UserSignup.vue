<template>
    <b-container class="bv-example-row mt-3">
        <br>
        <div>
            <h3>회원가입</h3>
        </div>
        <hr>
        <b-row>
            <b-col></b-col>
            <b-col cols="6">
                <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
                    <b-form @submit="onRegist" class="text-left">
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
                                aria-describedby="input-live-help input-live-feedback"
                                required placeholder="아이디" 
                                trim></b-form-input>

                            <b-form-invalid-feedback id="input-live-feedback">
                                아이디는 6자 이상 입력하세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="이름:" label-for="username">
                            <b-form-input 
                                type="text" 
                                id="username" 
                                ref="username" 
                                v-model="user.userName" 
                                required placeholder="이름"
                                @keyup.enter="confirm"/>
                        </b-form-group>
                        <b-form-group label="비밀번호:" label-for="userpwd">
                            <b-form-input 
                                type="text"
                                id="userpwd" 
                                ref="userpwd" 
                                v-model="user.userPwd"
                                required placeholder="비밀번호"
                                @keyup.enter="confirm"/>
                        </b-form-group>
                        <b-form-group label="이메일:" label-for="emailid">
                            <b-form-input
                                type="text"
                                id="emailid" 
                                ref="emailid" 
                                v-model="user.emailId"
                                required placeholder="이메일 아이디"
                                @keyup.enter="confirm"/>
                            <span>@</span>
                            <b-form-select 
                                v-model="user.emailDomain"
                                @change="onChange($event)"
                                class="mb-3"
                                >
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
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            check: {
                idCheck: false,
            },
            user: {
                userId: "",
                userPwd: null,
                userName: null,
                emailId: null,
                emailDomain: "gmail.com",
                // grade: "G",
            },
        }
    },

    methods: {
        onChange(event) {
            console.log("==" + event + "==");
        },
        onRegist() {
            console.log(this.user);
            this.$store.dispatch("registUser", this.user);
        },
    },

    computed: {
        idState() {
            return this.user.userId.length >= 6 ? true : false
            // if (this.user.userId == "") {
            //     return null;
            // } else if (this.user.userId.length >= 6){
            //     return true;
            // } else {
            //     return false;
            // }
        }
    }
}
</script>

<style>

</style>