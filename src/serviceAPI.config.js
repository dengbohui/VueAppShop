// 配置基本路径
const BASEURL = "http://yapi.demo.qunar.com/mock/78038/"
const LOCALURL = "http://localhost:3000/"
const URL = {
        getShoppingMallInfo: BASEURL + 'index',
        getGoodsInfoInfo: BASEURL + 'getGoodsInfo',
        registerUser: LOCALURL + 'user/register',
        login: LOCALURL + 'user/login',
        //获取商品详情
        goods: BASEURL + 'goods',
        //获取商品大分类列表
        category: BASEURL + 'category',
        // 获取商品小分类列表
        categorySub: BASEURL + 'categorySub1',
    }
    // 将路径暴露出去
module.exports = URL