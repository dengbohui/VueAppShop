<template>
    <div class="goods-info" @click="goGoodsPage">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    // 引入价格格式过滤器
    import {toMoney} from '../../flter/moneyFilter'
    export default {
        // 声明价格格式过滤器
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        // 接收父组件传来的数据
        props:['goodsImage','goodsName','goodsPrice'],
        //props:['goodsImage','goodsName','goodsPrice','goodsId'],
        methods:{
            goGoodsPage(){
                //this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
                this.$router.push({name:'Goods'})
            },
        }
        
    }
</script>

<style scoped>
    .goods-name{
       padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>