let http=require("http");
let fs=require("fs");

function Server(req,res){
    //设置返回网络请求header
    res.writeHead(200,{
        "Content-Type": "application/json;charset=utf-8",//内容类型，json格式
        "Access-Control-Allow-Methods": "*",//允许请求方式，所有方式（*）
        "Access-Control-Allow-Origin": "*",//允许请求来源，所有来源（*）
    });
    //获取文件
    
    //返回
    res.end("{}");
}

//创建服务
http.createServer(Server).listen(2000);

console.log("Accepted,listen at port 2000");
