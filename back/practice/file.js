// const fs=require('fs');

//-----------------------------------------------------------------File System----------------------------------------------->>//

// fs.writeFile("name.txt","My name is Sunny saini ",function(err){
//     if(err){
//         console.error(err);
//     }else{
//         console.log("Done");
//     }
// })

// fs.appendFile("name.txt"," and now i append some more data of me i am from Narnaul,Haryana",function(err){
//     if(err){
//         console.error(err);
//     }else{
//         console.log("Done");
//     }
// })

// fs.rename("name.txt","rename.txt",function(err){
//     if(err){
//         console.error(err);
//     }else{
//         console.log("Done");
//     }
// })

// fs.copyFile("rename.txt","./copy1.txt",function(err){
//     if(err)console.error(err.message);
//     else console.log("Done");
// });

// fs.unlink("copy1.txt",function(err){
//     if(err) console.error(err.message);
//     else console.log("Delete Successfully");
// })

// fs.rmdir("./copy",{recursive:true},function(err){
//     if(err)console.error(err.message)
//         else console.log("Remove folder successfully");
// })  
// fs.readFile("copy.txt","utf8",function(err,data){
//     if(err)console.error(err);
//     else console.log("you can read data of this file",data);
// })

//---------------------------------user login information in server requests------------------------->>

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer(function (req, res) {
//     const log = `${Date.now()}: ${req.url} New req Received\n`;
//     fs.appendFile("info.txt", log, function (err, data) {
//         switch(req.url){
//             case"/":
//             res.end("Welcome to Home page");
//             break;
//             case"/about":
//             res.end("About us");
//             break;
//             case"/contact":
//             res.end("My contact is: ");
//             break;
//             default:
//             res.end("Error 404 Not found");
//         }
//     });
// });

// server.listen(3000, () => {
//     console.log("Server is running on port 3000:");
// });





