var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

var mongoose = require('mongoose')

//连接mongodb
mongoose.connect("mongodb://localhost:27017")

var db = mongoose.connection

db.on('error', function (error) {
    console.log('数据库连接失败：' + error)
})

db.on('open', function () {
    console.log('数据库连接成功')
})

// 建表
var userSchema = new mongoose.Schema({
    'username': String,
    'password': String
})

var userModal = db.model('user1', userSchema)

// var gaochen = new userModal({
//     'username': 'gaochen',
//     'password': '123456'
// })

// gaochen.save(function(error, doc) {
//     if (error) {
//         console.log('error：' + error)
//     } else {
//         console.log('doc：' + doc)
//     }
// })

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:9080')
    next()
}

app.use(allowCrossDomain)

// app.get("/random/:min/:max", function(req, res) {
//     // var min = parseInt(req.params.min)
//     // var max = parseInt(req.params.max)

//     // if (isNaN(min) || isNaN(max)) {
//     //     res.status(400)
//     //     res.json({error: 'Bad request.'})
//     //     return
//     // }

//     // var result = Math.round((Math.random() * (max - min)) + min)
//     // res.json({result: result})

//     // 获取用户信息
//     var promise = userModal.find({'username': 'gaochen'}, function(error, result) {
//         if (error) {
//             console.log('error:' + error)
//         } else {
//             console.log(result)
//         }
//     })
//     // console.log(userInfo)
//     promise.then(function(result) {
//         // result是查询结果
//         res.json({result: result[0].password})
//     })
// })

// login
app.post("/login", function (req, res) {
    let params = req.body
    let result = {}

    if (!params) {
        result = {
            status: 'failed',
            data: null,
            message: '参数不能为空'
        }
    } else {
        if (!params.username) {
            result = {
                status: 'failed',
                data: null,
                message: '用户名不能为空'
            }
        } else if (!params.password) {
            result = {
                status: 'failed',
                data: null,
                message: '用户密码不能为空'
            }
        } else {
            result = {
                status: 'success',
                data: null,
                message: null
            }
        }
    }

    res.status(200).json({
        result: result
    })
})

app.listen(3000, function () {
    console.log('app start')
})

module.exports = app