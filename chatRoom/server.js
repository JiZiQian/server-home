let http=require("http");
let fs=require("fs");

let user=new Array();
class Message{
    constructor(name,mes){
        this.user=name;
        this.message=mes;
    }
}
let message=new Array();

http.createServer(function(req,res){
    res.writeHead(200,{
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Methods": "*",//允许所有请求方式
        "Access-Control-Allow-Origin": "*",//允许所有请求来源
    });
    console.log(req.method);
    if(req.method==="ADD"){
        if(user.includes(req.userName)) res.end(JSON.stringify({ err: true }));
        user.push(req.userName);
        message.push(new Array());
        res.end("{}");
    }
    else if(req.method==="GET"){
        let pos=user.indexOf(req.userName);
        if(message[pos].length>0){
            let name=message[pos][0].user;
            let text=message[pos][0].message;
            message[pos].shift();
            res.end(JSON.stringify({ user: name, data: text }));
        }
        else{
            res.end("{}");
        }
    }
    else if(req.method==="POST"){
        for(let i=0;i<user.length;i++){
            message[i].push(Message(req.userName,req.message));
        }
        res.end("{}");
    }
    else{
        console.log("here");
        res.end("{}");
    }
}).listen(2001);

console.log("Accepted, listen at port 2001");
