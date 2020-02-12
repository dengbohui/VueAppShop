const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async(ctx) => {
    ctx.body = "这是用户操作首页"
})

router.post('/register', async(ctx) => {
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

router.post('/login', async(ctx) => {
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password
        //引入User的model
    const User = mongoose.model('User')

    await User.findOne({ userName: userName, password: password }).exec().then(async(result) => {
        console.log(result)
        if (result) {
            ctx.body = { code: 200, message: '登陆成功' }
        } else {
            ctx.body = { code: 500, message: '用户名或者密码错误' }
        }

    }).catch(error => {
        console.log(error)
        ctx.body = { code: 500, message: error }
    })
})
module.exports = router