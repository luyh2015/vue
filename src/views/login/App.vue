<template>
    <div class="login">
        <el-card class="login-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="loginName">
                    <el-input v-model="ruleForm.loginName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
    export default{
        data() {
            let validateName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                callback();
            };
            let validatPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                callback();
            };
            return {
                ruleForm: {
                    loginName: '',
                    password: ''
                },
                rules: {
                    loginName: [
                        { validator: validateName, trigger: 'blur'}
                    ],
                    password: [
                        { validator: validatPassword, trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {
            ...mapState({
                profile: state => state.user.profile
            }),
            ...mapGetters({
                userInfo: 'USER_GET_USER_INFO'
            })
        },
        methods: {
            ...mapActions(['USER_POST_LOGIN']),
            ...mapMutations(['USER_SET_PROFILE']),
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        alert('submit!');
                        let ruleForm = this.ruleForm;
                        this.USER_POST_LOGIN({
                            loginName: ruleForm.loginName,
                            password: ruleForm.password,
                            roleType: 1,
                            rememberMe: 1
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.login {
    width: 500px;
    margin: 100px auto;

    &-card {
        padding-top: 30px;
        padding-right: 60px;
    }
}
</style>