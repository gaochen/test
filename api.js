var app = require('app.js')

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
