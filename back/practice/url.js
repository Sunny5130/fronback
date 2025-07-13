
// const fs=require('fs');
// const http=require('http');

// const server=http.createServer((req,res)=>{
//     const log=`${Date.now()}: ${req.url} new request accept\n`;
//     fs.appendFile('userinfo.txt',log,(err,data)=>{
//         if(err)console.error(err.message)
//             else{
//     switch(req.url){
//         case"/":
//         res.end("Welcome to the Home Page");
//         break;
//         case"/about":
//         res.end("About Me: My name is Saini");
//         break;
//         case"/address":
//         res.end("Address: Narnaul");
//         break;
//         case"/contactus":
//         res.end("You want to contact me");
//         break;
//         default:
//             res.end("Error 404 not found");
//     }
// }
// });
// });
// server.listen(3000,()=>{
//     console.log("Server Running in port number 3000");

// })






const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
const log = `${Date.now()}: ${req.url} new request accept\n`;

  const myurl = url.parse(req.url, true); 
  console.log(myurl);

  fs.appendFile('userinfo.txt', log, (err) => {
    if (err) console.error(err.message);
    else {
      switch (myurl.pathname) { 
        case "/":
          res.end("Welcome to the Home Page");
          break;

        case "/about":
          const username = myurl.query.myname; // example: /about?myname=Sunny
          res.end(`Hi ${username}`);
          break;

        case "/address":
          res.end("Address: Narnaul");
          break;

        case "/contactus":
          res.end("You want to contact me");
          break;

        default:
          res.end("Error 404 not found");
      }
    }
  });
});

server.listen(3000, () => {
  console.log("Server Running in port number 3000");
});
