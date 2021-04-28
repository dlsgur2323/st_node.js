var fs = require("fs");

fs.readFile("input.txt", function(err, data){
    console.log(data.toString());
})

console.log("Program has down");