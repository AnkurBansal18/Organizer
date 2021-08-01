function helpFn() {
    //in js we cant create multiple line strings, so we can use template literals for doin this.
    console.log(`
    List of all commands:
    
get tree "directoryPath"
get organize "directoryPath"
get main.js help`);
}

//function gets exported by getting wrapped into object.
module.exports = {
    helpKey : helpFn
}
