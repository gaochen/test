const Koa = require('koa')

const app = new Koa()

// app.use(async (ctx, next) => {
//     console.log(`${ctx.request.method} ${ctx.request.url}`)
//     await next()
// })

// app.use(async (ctx, next) => {
//     const start = new Date().getTime()
//     await next()
//     const ms = new Date().getTime() - start
//     console.log(`Time: ${ms}ms`)
// })

// app.use(async (ctx, next) => {
//     await next()
//     ctx.response.type = 'text/html'
//     ctx.response.body = '<h1>hello, koa2</h1>'
// })

// 对不同的url做出不同的处理
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.body = 'index pages'
    } else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.request.path === '/test') {
        ctx.response.body = 'TEST page'
    } else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.request.path === '/error') {
        ctx.response.body = 'ERROR page'
    } else {
        await next()
    }
})


app.listen(3000)

console.log('app started at port 3000')

