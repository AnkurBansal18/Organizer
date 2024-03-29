#!/usr/bin/env node      //shebang
    
let inputArr = process.argv.slice(2);

let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize");
let treeObj = require("./commands/tree");


let command = inputArr[0];

switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
      //  helpFn();
       helpObj.helpKey();
        break;
    default:
        console.log("please enter a valid command");
        break;
}
