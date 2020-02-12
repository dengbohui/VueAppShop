<template>
    <div>
        <!-- 楼层区 -->
        <div class="floor">
            <div class="floor-title">
                {{floorTitle}}
            </div>
            <div class="floor-anormaly">
                <div class="floor-one">
                    <img :src="floorData0.image" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floorData1.image" width="100%">
                    </div><div class="floor-three">
                        <img :src="floorData2.image" width="100%">
                    </div>

                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        // 接收父组件传过来的组件
        props:['floorData','floorTitle'],
        watch:{
            floorData:function(val){
                console.log(this.floorData);
                this.floorData0 = this.floorData[0]
                this.floorData1 = this.floorData[1]
                this.floorData2 = this.floorData[2]
                
            }
        }
    }
</script>

<style scoped>
    .floor-title{
        height: 2.2rem;
        line-height: 2.2rem;
        font-size: .8rem;
        color: #e5017d;
        background-color: #fff;
        border-bottom: 1px solid #eee;
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
</style>