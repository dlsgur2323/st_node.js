var dir = "./views";
var fs = require("fs");

fs.readdir(dir, function(err,list){
    console.log(list);
});