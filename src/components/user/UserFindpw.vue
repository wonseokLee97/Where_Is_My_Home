<template>
<b-container class="bv-example-row mt-3">
<hr>
    <b-row>
        <b-col></b-col>
        <b-col cols="6">
            <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
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
</b-container>
</template>

<script>

export default {
    data() {
        return {
            user: {
                userEmail: null,
                userName: null,
            },
        };
    },

    methods: {
        async confirm() {
            if (this.user.userEmail == null) {
                alert("이메일은 필수값입니다.");
                this.$refs.userEmail.focus();
            } else if (this.user.userName == null) {
                alert("이름은 필수값입니다.");
                this.$refs.userName.focus();
            }
        },

        moveBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>