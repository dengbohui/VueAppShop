<template>
    <div>
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goback"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                placeholder="请输入用户名（至少三位）"
                required
                clearable
                @blur="usernameCheck"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码（至少五位）"
                required
                clearable
                @blur="passwordCheck"
            />
            <div class="register-button">
            <van-button type="primary" size = "large" @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // 引入后台服务接口文件
    import url from '../../serviceAPI.config'
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                username:'',
                password:'',
                //是否开启用户注册的Loading状态
                openLoading:false,
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        methods: {
            goback() {
              this.$router.go(-1)  
            },
            checkForm(){
                let isOk= true
                if(this.username.length<3){
                    this.usernameErrorMsg="用户名不能小于3位"
                    Toast.fail('您注册的用户名或密码不符合规范')
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位"
                    Toast.fail('您注册的用户名或密码不符合规范')
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            },
            usernameCheck(){
                if(this.username.length<3){
                    Toast.fail('用户名不能小于3位');
                }
            },
            passwordCheck(){
                if(this.username.length<3){
                    Toast.fail('密码不能少于6位');
                }
            },
            registerAction(){
                if(this.checkForm()){
                    this.axiosRegisterUser()
                }
            },
            axiosRegisterUser(){
                this.openLoading = true;
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response=>{
                    console.log(response);
                    if(response.data.code==200){
                        this.$router.push('/')
                        Toast.success('注册成功');
                    }else{
                        this.openLoading = false;
                        Toast.fail('注册失败');
                    }
                    
                })
                .catch((error)=>{
                    this.openLoading = false;
                    console.log(error);
                    
                })
            }
        },
        
    }
</script>

<style scoped>
    .register-panel{
        width: 96%;
        border-radius: 5px;
        /* position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%); */
        margin: 20px auto;
        padding-bottom: 80px;
    }
    .register-button{
        padding-top: 10px;
        margin: 10px auto;
        border-radius: 10px;
    }
</style>