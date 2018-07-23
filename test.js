var http = require('http')
var url = require('url')
var querystring = require('querystring')

var server = http.createServer(function(serverReq, serverRes) {
    
    // 获取url参数
    console.log(serverReq.url)
    var urlObj = url.parse(serverReq.url)
    console.log(urlObj)
    var query = urlObj.query
    console.log(query)
    var queryObj = querystring.parse(query)
    console.log(JSON.stringify(queryObj))

    serverRes.writeHead(200, {
        'content-type': 'text/html;charset="utf-8"'
    })
    serverRes.end('ok')  
})
server.listen(3000)