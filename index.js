// let arr=[1,2,3,"SAINI",function saini(){console.log(2)}];
// arr.forEach(function(val){
//     console.log(val);
// });

// let arr1=[1,2,'Saini','1',"223",function saini(){console.log("I am a function")}];
// arr1.map((val)=>{
//     console.log(val);
// })

// let ans=arr1.map((val)=>{
//     return 12;          //it make a copy of arr1 with all values 12
// });
// console.log(ans);


const fs=require('fs');
fs.writeFile("abc.txt","I have cretae a file ane as abc.txt",function(err){
    if(err) console.error(err);
    else console.log("Done or creating file");
})
