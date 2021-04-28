var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
    var _url = req.url;

    // get 방식의 url 파라미터를 가져오는 방법
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    if(_url == '/'){
        _url = "/index.html";
    } else if(_url == 'favicon.ico'){
        return res.writeHead(404);
    }
    res.writeHead(200);

    var html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>
            Hello World! ${title}
        </body>
    </html>
    `
    console.log(html);

    res.end(html);
}).listen(80);