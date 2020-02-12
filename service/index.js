const Koa = require('koa')
const app = new Koa()

const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')

const Router = require('koa-router')

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
let user = require('./appAPI/user')

//引入解决跨域插件
const cors = require('koa2-cors')
app.use(cors())

//装载所有子路由
let router = new Router()
router.use('/user', user.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
    //立即执行函数
;
(async() => {
    await connect()
    initSchemas()
})()
app.use(async(ctx) => {
    ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
    console.log('[server] start at port 3000');

})