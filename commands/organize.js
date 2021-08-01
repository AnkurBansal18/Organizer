const utility = require('../utility');
let fs = require("fs");
let path = require("path");
let types = utility.types;

function organizeFn(dirPath){

// console.log("implemented for dirpat", dirPath);
// input -> direcotry path given 

 let destPath;
      if(dirPath == undefined){
          destPath = process.cwd();
          return;
      }
     
      
          let doesExist = fs.existsSync(dirPath);
          if(doesExist){
             // create-> organized files->direcotry 
              destPath = path.join(dirPath , "organized_files");
             //if we try to run mkdir 2nd time without applying the below check, it will throw an error that file already exists,
             if(fs.existsSync(destPath)==false){
                 fs.mkdirSync(destPath);
             }
             
          }
          else{
             console.log("please provide a valid path");
             return;
          }
          organizeHelper(dirPath,destPath);
      }
 
 
 function organizeHelper(src,dest){

    //  identify categorries of all the file present in that input direcotry.

     let childNames = fs.readdirSync(src);
    for(let i=0; i<childNames.length; i++){
       let childAddress =  path.join(src,childNames[i]);
       let isFile = fs.lstatSync(childAddress).isFile();
       if(isFile){
           
           let category = getCategory(childNames[i]);
           console.log(childNames[i], "belongs to -->", category);
           sendFiles(childAddress,dest,category);
       }
    }
 }
 
 function sendFiles(srcFilePath, dest, category){
     let categoryPath = path.join(dest,category);
     if(fs.existsSync(categoryPath)==false){
         fs.mkdirSync(categoryPath);
     }
     let fileName = path.basename(srcFilePath);
     let destFilePath = path.join(categoryPath, fileName);
     fs.copyFileSync(srcFilePath,destFilePath);    //content gets copy and not files.
     fs.unlinkSync(srcFilePath);    
     console.log(fileName,"copied to ", category);
 
 }
 function getCategory(name){
     let ext = path.extname(name);
     //console.log(ext);
     ext = ext.slice(1);
     for(let type in types){
         let currTypeArray = types[type];
         for(let i=0; i<currTypeArray.length; i++){
             if(ext==currTypeArray[i]){
                 return type;
             }
 
         }
     }
     return "others";
 }

 module.exports = {
    organizeKey : organizeFn
}
