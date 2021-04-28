var http = require("http");
var fs = require("fs");
var url = require("url");

// 서버 생성
http.createServer( function(request, response) {

    // URL 뒤에 있는 디렉토리/파일이름 파싱
    var pathName = url.parse(request.url).pathname;
    console.log("Request for" + pathName);

    // 파일 이름이 비어있다면 index.html로 설정
    if(pathName == "/"){
        pathName = "/index.html";
    }

    // pathName에 해당하는 파일 읽기
    fs.readFile(pathName.substr(1), function (err,data){
        if(err){
            console.log(err);
            // 페이지를 찾을 수 없음
            // HTTP Status : 404 : NOT FOUND
            // Content Type : text/plain
            response.writeHead(404, {'Content-Type':'text/html'});
        } else {
            // 페이지가 있음
            // HTTP Status : 200 : OK
            // Content Type : text/plain
            response.writeHead(200, {'Content-Type':'text/html'});

            // 읽어들인 파일 data를 responseBody에 작성
            response.write(data.toString());
            // html 문서의 내용을 전부 보내는 것이니 html을 보내는 것과 같음
        }
        // response 전송(응답)
        response.end();

    });

}).listen(8081);
// 서버 작성 끝

console.log('Server running at http:/127.0.0.1:8081/');