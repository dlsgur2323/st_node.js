var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var boardDir = "./board";
var server = http.createServer(function(req,res){

    var reqUrl = req.url;

    var page = url.parse(reqUrl, true).query.page;
    var path = url.parse(reqUrl,true).pathname;
    console.log("Requested url : " + path + "param : " + page);
    if(path == '/'){
        if(!page){
            fs.readdir(boardDir, function(err,fileList){
                var list = boardList(fileList);
                res.writeHead(200);
                var html = "";
                html = homeTemplate(list);
                res.end(html);
            });
        } else {
            var fileName = boardDir + "/" + page;
            fs.readFile(fileName, function(err,data){
                res.writeHead(200);
                var html = "";
                var body = `
                    <a href="/">목록</a><br>
                    <p>
                    &nbsp;&nbsp;제목 : ${page}
                    <br>
                    &nbsp;&nbsp;내용 : ${data.toString()}
                    </p>
                `
                html = homeTemplate(body);
                res.end(html)
            });
        }


    } else if(path == "/writePage") {
        res.writeHead(200);
        var html = writeTemplate();
        res.end(html);
    } else if(path == "/insertBoard"){
        console.log("hi");
        var params = "";
        req.on("data", function(data){
            params += data;
        });
        req.on("end", function(){
            params = qs.parse(params);
            var title = params.title;
            var content = params.content;

            fs.writeFile(boardDir + "/" +title, content, 'utf8', function(err){
                res.writeHead(302, {Location: `/?page=${title}`});
                res.end();
            });

        });
    }


}).listen(80);
console.log("Server has started");

function homeTemplate(body){
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Board</title>
    </head>
    <body>
        <h1>Welcome My Board</h1>
        ${body}
    </body>
    </html>
    `;
}

function boardList(fileList){
    var list = "<a href=\"/writePage\">글쓰기</a><br><ul>";
    fileList.forEach(function(file){
        list += `
            <li>
                <a href="/?page=${file}">${file}</a>
            </li>
        `
    });
    list += "</ul>";

    return list;
}

function writeTemplate(){
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Board</title>
    </head>
    <body>
        <h1>Write Page</h1>
        <a href="/">목록</a><br>
        <form action="http://localhost/insertBoard" method="post">
            <input type="text" placeholder="title" name="title"><br>
            <textarea name="content" placeholder="content" ></textarea><br>
            <input type="submit" value="저장">
        </form>
    </body>
    </html>
    `;
}