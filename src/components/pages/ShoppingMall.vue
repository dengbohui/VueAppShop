<template>
    <div>
        <!-- 首页搜索模块 -->
        <div class="search-bar">
            <van-row class="text-row">
            <van-col span="3">
                <img :src="locationIcon" alt="" class="locationIcon">
            </van-col>
            <van-col span="16">
                <input type="text" class="search-input">
            </van-col>
            <van-col span="5">
                <van-button size="mini">查找</van-button>
            </van-col>
        </van-row>
        </div>
        <!-- 首页轮播图模块 -->
        <div class="swiper-area">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in bannerPicArray" :key="index">
                    <img v-lazy="item.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 导航条 -->
        <div class="type-bar">
            <div v-for="(item,index) in category" :key="index" @click="goCategory">
                <img v-lazy="item.image" alt="" width="90%">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>
        <!-- 广告条 -->
        <div>
            <img v-lazy="adBanner" alt="" width="100%">
        </div>
        <!-- 商品推荐 -->
        <div class="recomend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-boby">
                <swiper :options = "swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" alt="" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price |moneyFilter}} (￥{{item.mallPrice |moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
                <!-- 配置分页器小圆圈
                <div class="swiper-pagination" slot="pagination">

                </div> -->
            </div>
        </div>
        <!-- 楼层区 -->
        <!-- <div class="floor">
            <div class="floor-anormaly">
                <div class="floor-one">
                    <img :src="floor1_0.image" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floor1_1.image" width="100%">
                    </div><div class="floor-three">
                        <img :src="floor1_2.image" width="100%">
                    </div>

                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floor1.slice(3)" :key="index">
                    <img :src="item.image" width="100%">
                </div>
            </div>
        </div> -->
        <floor-component :floorData = "floor1" :floorTitle = "floorName.floor1"></floor-component>
        <floor-component :floorData = "floor2" :floorTitle = "floorName.floor2"></floor-component>
        <floor-component :floorData = "floor3" :floorTitle = "floorName.floor3"></floor-component>
        <!--热卖商品-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <!-- <goods-info :goodsId = "item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info> -->
                           
                            <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    // 引入楼层区组件
    import floorComponent from '../component/floorComponent'
    // 引入价格格式过滤器
    import {toMoney} from '../../flter/moneyFilter'
    // 引入热卖商品组件
    import goodsInfo from '../component/goodsInfoComponent'
    // 引入后台服务接口文件
    import url from '../../serviceAPI.config'
    export default {
        data() {
            return {
                // 首页搜索模块定位图片地址
                locationIcon:require('../../assets/images/location1.png'),
                // 轮播图片地址
                bannerPicArray:[
                // {imageUrl:'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg'},
                // {imageUrl:'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg'},
                // {imageUrl:'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg'},
            ],
                // 导航条地址
                category:[],
                // 广告条地址
                adBanner:'',
                recommendGoods:[],
                swiperOption:{
                    // 配置每次显示3个
                    slidesPerView:3,
                    // 配置分页器小圆圈
                    // pagination:{
                    //     el:'.swiper-pagination',
                    //     // 配置分页器小圆圈可以点击
                    //     clickable:true
                    // },
                    // 配置竖屏显示
                    // direction:'vertical'
                    // 鼠标滚轮可以控制
                    // mousewheel:true,
                    // 设置滚动效果
                    // freeMode:true,
                    // 配置无限循环滚动
                    loop:true
                },
                // 楼层区数据
                floor1:[],
                floor2:[],
                floor3:[],
                // floor1_0:{},
                // floor1_1:{},
                // floor1_2:{},
                floorName:{},
                // 商品热卖数据
                hotGoods:[],

            }
        },
        // 声明价格格式过滤器
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        components: {
            swiper,
            swiperSlide,
            floorComponent,
            goodsInfo
        },
        created () {
            // 配置axios
            axios({
                // url:'https://www.easy-mock.com/mock/5e2080a134c30656f7ccdd25/index',
                url:url.getShoppingMallInfo,
                method:'get',
            })
            .then(response=>{
                console.log(response);
                if(response.status == 200){
                    this.category = response.data.data.category;
                    this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArray = response.data.data.slides;
                    this.recommendGoods = response.data.data.recommend;
                    this.floor1 = response.data.data.floor1;
                    this.floor2 = response.data.data.floor2;
                    this.floor3 = response.data.data.floor3;
                    // this.floor1_0 = this.floor1[0];
                    // this.floor1_1 = this.floor1[1];
                    // this.floor1_2 = this.floor1[2];
                    this.floorName = response.data.data.floorName;
                    this.hotGoods = response.data.data.hotGoods;
                    
                }
                
            }).catch(error=>{
                console.log(error);
                
            })
        },
        methods: {
            goCategory() {
                this.$router.push('categoryList')
            }
        },
        
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        font-size: .8rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .locationIcon{
        width: 80%;
        height: 2.2rem;
        /* padding-top: .2rem; */
        padding-left: .3rem;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #fff!important;
        background-color: #e5017d;
        color: #fff;
    }
    .swiper-area{
        clear: both;
        /* 解决慢速网络下加载轮播图，小圆圈跑到下面显示的问题 */
        max-height: 9rem;
        overflow: hidden;
    }
    .type-bar{
        background-color: #fff;
        display: flex;
        margin: 0 .3rem .3rem .3rem;
        border-radius: .3rem;
        flex-direction: row;
        flex-wrap: nowrap;
        font-size: .8rem;
    }
    /* .type-bar :nth-child(1) img{
        width: 3rem;
        
    } */
    .type-bar div{
        padding: .3rem;
        font-size: .6rem;
        text-align: center;
        /* 每个div等分 */
        flex: 1;
    }
    .recomend-area{
        background-color: #fff;
        margin-top: .3rem;
    }
    .recommend-title{
        border-bottom: 1px solid #eee;
        font-size: .8rem;
        padding: .2rem;
        color: #e5017d;
    }
    .recommend-boby{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        border-right: 1px solid #eee;
        font-size: .6rem;
        text-align: center;
    }
    .floor-anormaly{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        border-bottom: 1px solid #eee;
    }
    .floor-anormaly div{
        width: 10rem;
        /* 设置为css盒子模型 */
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .floor-one{
        border-right: 1px solid #ddd;
    }
    .floor-two{
        border-bottom: 1px solid #ddd;
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #fff;
    }
    .floor-rule div{
        /* 设置为css盒子模型 */
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 10rem;
        border-bottom: 1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right: 1px solid #ddd;
    }
    .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
    }
    .hot-goods{
        height: 130rem;
        overflow: hidden;
    }
</style>