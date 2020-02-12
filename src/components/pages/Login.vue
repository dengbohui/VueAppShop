<template>
    <div>
        <van-nav-bar
            title="用户登陆"
            left-text="返回"
            left-arrow
            @click-left="goback"
        />
        <div class="login-panel">
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
            <div class="login-button">
            <van-button type="primary" size = "large" @click="loginAction" :loading="openLoading">立即登陆</van-button>
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
        // 一打开页面就判断登陆状态
        created(){
            if(localStorage.userInfo){
                Toast.success('您已经登录')
                this.$router.push('/')
            }
        },
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
            loginAction(){
                if(this.checkForm()){
                    this.axiosLoginUser()
                }
            },
            axiosLoginUser(){
                this.openLoading = true;
                axios({
                    url:url.login,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response=>{
                    console.log(response);
                    if(response.data.code == 200){
                        //保存用户登陆状态操作
                        new Promise((resolve,reject)=>{
                        localStorage.userInfo={userName:this.username}
                        setTimeout(()=>{
                            resolve()
                        },500)
                        }).then(()=>{
                                Toast.success('登录成功')
                                this.$router.push('/')
                        }).catch(err=>{
                                Toast.fail('登录状态保存失败')
                                console.log(err)
                        })
                    }else{
                        Toast.fail('登录失败')
                        this.openLoading = false
                    }
                            
                })
                .catch((error)=>{
                    Toast.fail('登录失败')
                    this.openLoading = false
                    
                })
            }
        },
        
    }
</script>

<style scoped>
    .login-panel{
        width: 96%;
        border-radius: 5px;
        /* position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%); */
        margin: 20px auto;
        padding-bottom: 80px;
    }
    .login-button{
        padding-top: 10px;
        margin: 10px auto;
        border-radius: 10px;
    }
</style>