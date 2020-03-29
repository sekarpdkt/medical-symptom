// Imports the Google Cloud client library

/*
var translateGoogle = require('translation-google');

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

translate.translate("Sex","hi").then((trTxt)=>{
    console.log(trTxt)
}); 
module.exports = translate;
*/

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */



// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;
const jsonDBFunctions = require('../includeJS/jsonDBFunctions')

var translate={}

// Instantiates a client
const translateGoogle = new Translate({
    projectId:"sekarpdkt-6e9ff-936d7c34dfb6",
    keyFilename:"./certificates/sekarpdkt-6e9ff-936d7c34dfb6.json"
});

translate.translate= async (text,targetlng) => {

    trTxt=await jsonDBFunctions.getTranslatedText(text,targetlng);
    if(trTxt!=undefined) {
        console.log(text+">>>"+trTxt)
        return trTxt
    }

    try{
        const [translation]=await translateGoogle.translate(text, targetlng);
            console.log(text+">>>"+translation)
            jsonDBFunctions.updateTranslatedText(text,targetlng,translation);
            console.log(text+">>>"+translation)
            return translation
    }catch(err ){
            console.log(err);
        }
    
    return text;
    
    

  return translation;
}


translate.forceTranslate= async (text,targetlng) => {



    try{
        const [translation]=await translateGoogle.translate(text, targetlng);
            console.log(text+">>>"+translation)
            jsonDBFunctions.updateTranslatedText(text,targetlng,translation);
            console.log(text+">>>"+translation)
            return translation
    }catch(err ){
            console.log(err);
        }
    
    return text;
    
    

  return translation;
}
translate.translate("Add member","ta").then((trTxt)=>{
    console.log(trTxt)
}); 

/*
translate.forceTranslate("Town","hi").then((trTxt)=>{
    console.log(trTxt)
});
*/
module.exports = translate;
