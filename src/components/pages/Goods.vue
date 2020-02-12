<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="topImage-div">
            <img :src="goodsInfo.image" width="100%">
        </div>
        <div class="goods-price">￥{{goodsInfo.PRESENT_PRICE |moneyFilter}}元</div>
        <div class="goods-name"><van-icon name="fire" />{{goodsInfo.name}}</div>
        <div class="bar">
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <!-- <div v-html="goodsInfo.DETAIL">

                    </div> -->
                    <div class="detail">
                        <img :src="goodsInfo.DETAIL1" width="100%">
                        <img :src="goodsInfo.DETAIL2" width="100%">
                        <img :src="goodsInfo.DETAIL3" width="100%">
                        <img :src="goodsInfo.DETAIL4" width="100%">
                        <img :src="goodsInfo.DETAIL5" width="100%">
                    </div>
                </van-tab>
                <van-tab title="商品评价">
                    正在制作中
                </van-tab>
                <van-tab title="商品推荐">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-goods-action>
                    <van-goods-action-icon icon="chat-o" text="客服" @click="onClickHelp"/>
                    <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickCart"/>
                    <van-goods-action-button type="warning" text="加入购物车" @click="onClickAddCart"/>
                    <van-goods-action-button type="danger" text="立即购买" @click="onClickBuy"/>
                </van-goods-action>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // 引入后台服务接口文件
    import url from '../../serviceAPI.config'
    import {Toast} from 'vant'
    // 引入价格格式过滤器
    import {toMoney} from '../../flter/moneyFilter'
    // import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
    export default {
        data() {
            return {
                goodsId:'',
                goodsInfo:{},//商品详细信息
            }
        },
        // 声明价格格式过滤器
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        created(){
            //this.goodsId = this.$route.query.goodsId,
            //console.log(this.goodsId);
            
            this.getInfo()
        },
        methods: {
            getInfo() {
                axios({
                    url:url.goods,
                    method:'get',
                    //data:{goodsId:this.goodsId},
                }).then(response=>{
                    console.log(response);
                    if(response.status == 200 && response.data){
                        this.goodsInfo = response.data
                        console.log(this.goodsInfo);
                    }else{
                        Toast('服务器错误，数据获取失败')
                    }
                    
                }).catch(error=>{
                    console.log(error);
                    
                })
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            onClickHelp(){
                Toast('功能尚待开发中.......')
            },
            onClickCart(){
                Toast('功能尚待开发中.......')
            },
            onClickAddCart(){
                //取出购物车内的商品数据
                let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) :[]
                //判断购物车内是否已经有这个商品
                //如果没有返回undeifnd，如果有返回第一个查找到的数据
                let isHaveGoods=cartInfo.find(cart=>cart.goodsId==this.goodsId)
                console.log(isHaveGoods)
                if(!isHaveGoods){
                    //没有商品直接添加到数组中
                    //重新组成添加到购物车的信息  
                    let newGoodsInfo={
                        goodsId:this.goodsInfo.id,
                        Name:this.goodsInfo.name,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.image,
                        count:1
                    }
                    console.log(newGoodsInfo);
                    
                    cartInfo.push(newGoodsInfo) //添加到购物车
                    localStorage.cartInfo=JSON.stringify(cartInfo) //操作本地数据
                    Toast.success('添加成功')

                }else{
                    Toast.success('已有此商品')
                }
                this.$router.push({name:'Cart'})  //进行跳转
            
            },
            onClickBuy(){
                Toast('功能尚待开发中.......')
            }
            
        },
    }
</script>

<style scoped>
    .goods-name,
    .goods-price{
        background-color: #fff;
    }
    .goods-price{
        color: #e5017d;
        padding-bottom: .5rem;
    }
    .goods-name{
        font-weight: bold;
    }
    .detail{
        /* 设置详情图片缝隙 */
        font-size: 0
    }
    .bar{
        /* display: none; */
        padding-top: .6rem;
    }
</style>