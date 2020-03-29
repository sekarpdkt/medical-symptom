const unzipper=require('unzipper');
const config = require("./config");
const jsonDBFunctions = require('./jsonDBFunctions')
const fs=require("fs")
let handleFileUpload={}

/*
 * Param file in fomidable file object
 */
handleFileUpload.parseReceivedFile= async (file,user) => {
    console.log(file.path)
    try{
        fs.createReadStream(file.path)
        .pipe(unzipper.Parse())
        .on('entry', function (entry) {
            const fileName = entry.path;
            const type = entry.type; // 'Directory' or 'File'
            const size = entry.vars.uncompressedSize; // There is also compressedSize;
            entry.pipe(fs.createWriteStream('./temp/'+fileName))
                .on('finish',function() { jsonDBFunctions.loadCSVtoTinyDB('./temp/'+fileName,user)});
        });
    }
    catch(e) { console.log(e)}
}


module.exports =handleFileUpload;
