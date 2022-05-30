let http=require("http");
let fs=require("fs");

function fileName(str){
    let pos=str.indexOf("filename")+7+3;
    let ans="";
    while(str[pos]!=="\""){
        ans+=str[pos];
        pos++;
    }
    return ans;
}
function getFile(str){
    return str;
}

http.createServer(function(req,res){
    res.writeHead(200,{
        "Content-Type": "text/plain;charset=utf-8"
    });
    if(req.method==="POST"){
        let data=[];
        let buffer=Buffer.alloc(0);
        req.on("data",function(chunk){
            data.push(chunk);
        });
        req.on("end",function(){
            buffer=Buffer.concat(data);
            /*console.log(buffer.toString("utf8"));
            res.end();*/
            //console.log(buffer);
            let filename=fileName(buffer.toString("utf8"));
            buffer=getFile(buffer);
            console.log(buffer);
            fs.readFile("/home/jzq/home/load_file/"+filename,function(err,data){
                if(err){
                    fs.writeFile("/home/jzq/home/load_file/"+filename,buffer,function(err){
                        if(!err){
                            res.end("成功");
                        }
                        else{
                            res.end(err);
                        }
                    });
                }
                else{
                    res.end("该文件已存在，请更换文件名称");
                }
            });
        });
    }
}).listen(2000);

console.log("Accepted, listen at 2000");
