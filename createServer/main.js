var http = require("http");

http.createServer(function(request,response){
    /*
        HTTP 헤더 전송
     */
    response.writeHead(200,{'Content-Type':'text/plain'});

    /*
        Response Body를 "Hello World"로 설정
     */

    response.end("Hello World\n");

}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");
