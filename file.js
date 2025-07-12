const fs=require('fs');
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
fs.copyFile("rename.txt","./copy1.txt",function(err){
    if(err)console.error(err.message);
    else console.log("Done");
});