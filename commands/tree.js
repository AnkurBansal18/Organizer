//The process.cwd() method is an inbuilt application programming interface of the process module which is used to get the current working directory of the node.js process.
let fs = require("fs");
let path = require("path");

function treeFn(dirPath){
    //  let destPath;
       if(dirPath == undefined){
           treeHelper(process.cwd(), "");
           return;
       }
      
       else{
           let doesExist = fs.existsSync(dirPath);
           if(doesExist){
                  
                 treeHelper(dirPath, "");
               
              }
            
           else{
              console.log("please provide a valid path");
              return;
           }
       }
  }

    function treeHelper(dirPath,indent){
       
      let isFile =  fs.lstatSync(dirPath).isFile();
      if(isFile==true){
          let fileName = path.basename(dirPath);
          console.log(indent + "├──" + fileName);
      }
      else{
          let dirName = path.basename(dirPath);
          console.log(indent + "└──" + dirName);
          let children = fs.readdirSync(dirPath);
          
          for(let i=0; i<children.length; i++){
              let childPath = path.join(dirPath,children[i]);
              treeHelper(childPath, indent + "\t");
          }
      }
    }

module.exports = {
    treeKey : treeFn
}
