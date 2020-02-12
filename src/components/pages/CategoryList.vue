<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品类别"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <!-- <div class="leftNav" :style="leftNavStyle">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key = "index">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div> -->
                    <div :style="leftNavStyle" >
                        <van-sidebar v-model="activeKey" >
                            <van-sidebar-item v-for="(item,index) in category" :key = "index" :title="item.MALL_CATEGORY_NAME" />
                            <van-sidebar-item title="标签名称" />
                            <van-sidebar-item title="标签名称" />
                        </van-sidebar>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="rightNav">
                        <van-tabs v-model="activeSubky">
                            <van-tab v-for="(items,index) in categorySub" :key= "index" :title="items.MALL_SUB_NAME">内容 1</van-tab>
                            <van-tab title="标签 1"></van-tab>
                            <van-tab title="标签 2"></van-tab>
                            <van-tab title="标签 3"></van-tab>
                        </van-tabs>
                    </div>
                    <div id = "list-div" >
                        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                            <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                @load="onload"
                            >
                            <!-- <div class="list-item" v-for="item in list" :key="item">
                                {{item}}
                            </div> -->
                                <van-cell v-for="item in list" :key="item" :title="item" />
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
        <div class="pagination">
            <van-pagination 
                v-model="currentPage" 
                :total-items="24" 
                :items-per-page="5"
            />
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
                activeKey: 0,//控制大类别切换
                activeSubky:0,//控制小类别切换
                category:[],
                categoryIndex:0,//大类别
                leftNavStyle:{
                    height:''
                },
                categorySub:[],//小类别
                loading:false,//控制上拉加载
                finished:false,//上拉加载是否有数据
                list:[],//商品数据
                refreshing:false,//下拉刷新
                currentPage: 1,
                

                //page:1,商品列表的页数
                //goodlist:[]，商品列表信息
                //categorySubId:'',商品子类id

            }
        },
        created(){
            this.getCategory(),
            this.getHeight(),
            this.getCategorySub()
        },
        methods:{
            onClickLeft() {
                this.$router.go(-1)
            },
            getHeight(){
                //获取窗口高度
                let winHeight = document.documentElement.clientHeight;
                this.leftNavStyle.height = winHeight-46 +'px'
            },
            //获取大类数据
            getCategory(){
                axios({
                    url:url.category,
                    method:'get'
                })
                .then(response=>{
                    //console.log(response);
                    if(response.status == 200 && response.data.data){
                        this.category = response.data.data;
                        console.log(this.category);
                        
                    }else{
                        Toast('服务器错误，数据获取失败！')
                    }
                })
            },
            clickCategory(index){
                this.categoryIndex = index;
            },
            // 获取小类类别列表
            getCategorySub(){
                axios({
                    url:url.categorySub,
                    method:'get',

                })
                .then(response=>{
                    //console.log(response);
                    if(response.status == 200 && response.data){
                        this.categorySub = response.data.data;
                        console.log(this.categorySub);
                        
                    }else{
                        Toast('服务器错误，数据获取失败！')
                    }
                    
                })
                .catch(error=>{
                    console.log(error);
                    
                })
            },
            //上拉加载方法
            onload(){
                setTimeout(()=>{
                    for(let i = 0;i<10;i++){
                        this.list.push(this.list.length+1)
                    }
                    this.loading = false;
                    if(this.list.length>=20){
                        this.finished = true;//设置加载已完成
                    }
                },500)
            },
            //下拉刷新方法
            onRefresh(){
                setTimeout(()=>{
                    this.refreshing = false;
                    this.finished = false;//设置可加载数据
                    this.list = [];//清空数据
                    this.onload();//重新调用方法加载
                },500)
            },
            getGoodList(){
                
            }

        },
        //操作DOM
        mounted () {
            //获取窗口高度
            //let winHeight = document.documentElement.clientHeight;
            // 通栏显示
            //document.getElementsByClassName("leftNav").style.height= winHeight-46 +'px'
        },
    }
</script>

<style scoped>
    .leftNav{
        background-color: #eee;
    }
    .leftNav ul li{
        line-height: 2rem;
        border-bottom: 1px solid #fff;
        padding: 3px;
        font-size: .8rem;
        text-align: center;
    }
    .categoryActive{
        background-color: #fff;
    }
    /* .rightNav{
        padding-left: .3rem;
    } */
    .pagination{
        padding-bottom: 3rem;
    }
</style>