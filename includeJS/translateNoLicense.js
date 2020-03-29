// Imports the Google Cloud client library


var translateGoogle = require('translation-google');
const jsonDBFunctions = require('../includeJS/jsonDBFunctions')

var translate={}

translate.translate= async (text,lng) => {

    trTxt=await jsonDBFunctions.getTranslatedText(text,lng);
    if(trTxt!=undefined) {
        console.log(text+">>>"+trTxt)
        return trTxt
    }
    try{
        translateGoogle(text, {from:"en",to: lng}).then(res => {
            console.log(text+">>>"+res.text)
            jsonDBFunctions.updateTranslatedText(text,lng,res.text);
            console.log(text+">>>"+res.text)
            return res.text
        }).catch(err => {
            console.error(err);
        });
    }catch(err ){
            console.log(err);
        }
    
    return text;
}

translate.translate("Gender","hi").then((trTxt)=>{
    console.log(trTxt)
}); 
module.exports = translate;



module.exports = translate;
