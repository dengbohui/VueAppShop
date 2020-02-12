<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="购物车"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <!--清空购物车-->
        <div class="card-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <!--显示购物车中的商品-->
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="cart-img"><img :src="item.image" width="100%" /></div>
                <div class="cart-text">
                    <div class="cart-goods-name">{{item.Name}}</div>
                    <div class="cart-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="cart-goods-price">
                    <div class="Oneprice">
                        ￥{{item.price | moneyFilter}}
                    </div>
                    <div class="count">
                        x{{item.count}}
                    </div>
                    <div class="allMoney">
                        ￥{{item.price*item.count | moneyFilter}}
                    </div>
                </div>
            </div>
        </div>
        <!--显示总金额-->
        <div class="totalMoney">

            商品总价：￥ {{totalMoney | moneyFilter}}

        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    // 引入价格格式过滤器
    import {toMoney} from '../../flter/moneyFilter'
    export default {
        data() {
            return {
                cartInfo:[],//购物车商品
                isEmpty:false,//购物车是否为空
            }
        },
        created () {
            this.getCartInfo()
        },
        // 声明价格格式过滤器
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            //得到购物车的商品
            getCartInfo(){
                if(localStorage.cartInfo){
                    //如果有数据，执行赋值操作
                    this.cartInfo = JSON.parse(localStorage.cartInfo)//将数组转换为对象
                }
                //否则设置购物车为空
                console.log('this.cartInfo:'+JSON.stringify(this.cartInfo));//将数组转换为字符串
                
                this.isEmpty = this.cartInfo.length>0 ? true: false
            },
            //清空购物车的商品
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            }
        },
        computed:{
            totalMoney(){
                let allMoney = 0
                this.cartInfo.forEach((item,index) => {
                allMoney += item.price*item.count
                });
                // 解决刷新页面后商品总价格恢复默认价格的bug
                localStorage.cartInfo=JSON.stringify(this.cartInfo)

                return allMoney
            }
    },
        
    }
</script>

<style scoped>
    .card-title{
        height: 2rem;
        line-height:2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
        text-align: right;
    }
    .cart-row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;


    }
    .cart-img{
        flex:6;
    }
    .cart-text{
        flex:14;
        padding-left:10px;
    }
    .cart-control{
        padding-top: 10px;
    }
    .cart-goods-price{
        flex:4;
        text-align: right;
    }
    .allMoney{
        color:red;
    }
    .totalMoney{
        text-align: right;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding: 5px;
    }
</style>