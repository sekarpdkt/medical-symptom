const csv=require('csvtojson');
const fs=require("fs")
const JsonDB=require('node-json-db').JsonDB;
const config = require("./config");
const jsonDBDirectory=config.jsonDBDirectory;
const JsonDBConfig=require('node-json-db/dist/lib/JsonDBConfig').Config;

var jsonDBFunctions={}
var latestDateFile="";
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
jsonDBFunctions.user_db = new JsonDB(new JsonDBConfig(jsonDBDirectory+"user", true, false, '/'));
jsonDBFunctions.userInfo_db = new JsonDB(new JsonDBConfig(jsonDBDirectory+"userInfo", true, false, '/'));
jsonDBFunctions.translate_db = new JsonDB(new JsonDBConfig(jsonDBDirectory+"../config/translate_db", true, false, '/'));




jsonDBFunctions.getUserLanguagePrefTranslateDB= async (user) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        let lang
        try{
            lang=userProfileDb.getData(`/userLanguagePref`);
        }catch(e){
            let myInfo=`
                let userLanguagePref
                let translateDB={}
            `
            return myInfo;            
        }
        let data=await jsonDBFunctions.getlanguageDB(lang)
        let myInfo=`
            var userLanguagePref="${lang}"
            let translateDB=${JSON.stringify(data)}
        `
        console.log(myInfo)
        return myInfo;
    }
    catch(e){
        console.log(e)
    }
    
}



jsonDBFunctions.getlanguageDB= async (lng) => {
    if(lng=="NotSet") return {}
    if(lng=="en") return {}
    
    try{
        data=jsonDBFunctions.translate_db.getData(`/${lng}`);
        return data;
    }
    catch(e){
        console.log("Language error")
    }
    return {}
}

jsonDBFunctions.getTranslatedText= async (text,lng) => {
    
    try{
        trTxt= await jsonDBFunctions.translate_db.getData(`/${lng}/${text}`);
        return trTxt
    }catch{
        return undefined;
    }
    
}
jsonDBFunctions.updateTranslatedText= async (text,lng,trTxt) => {
    try{
        jsonDBFunctions.translate_db.push(`/${lng}/${text}`,trTxt);
        jsonDBFunctions.translate_db.save();
    }catch{
        return undefined;
    }
    
}



jsonDBFunctions.getUserAddressInfo= async (user) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        let selfProfile;
        try{
            selfProfile=userProfileDb.getData("/selfProfile");
        }
        catch(e){}
        
        let data=userProfileDb.getData("/address");
        if(selfProfile!=undefined)
            data.selfProfile=selfProfile;
        console.log(data)
        return data;
    }
    catch(e){}
}


jsonDBFunctions.getUserContactProfileInfo= async (user,contact) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        data=userProfileDb.getData("/contactInfo/"+contact);
        return data;
    }
    catch(e){}
}

    
jsonDBFunctions.updateUserAddressInfo= async (user,info) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        info.saved="Yes";
        userProfileDb.push(`/contactInfo/${info.name} - ${info.relationship}`, info);
        if(info.relationship=="Self"){
            userProfileDb.push(`/address`, info);
            
        }
        userProfileDb.save();
    }
    catch(e){
        console.log(e)
    }
    
    /*
     * Create required directory to store user gpsData
     * So basically, we will create a directory with userID as well as userID/gpdData
     */

    ensureExists(`${jsonDBDirectory}${user}`, 0744, function(err) {
        });
    ensureExists(`${jsonDBDirectory}${user}/gpsData`, 0744, function(err) {
        });
    ensureExists(`${jsonDBDirectory}${user}/readings`, 0744, function(err) {
        });
    return info
}



jsonDBFunctions.getUserSocialExposure= async (user) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        data=userProfileDb.getData("/socialExposure");
        return data;
    }
    catch(e){}
}

jsonDBFunctions.getContactSocialExposure= async (user,contact) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        data=userProfileDb.getData("/contactSocialExposure/"+contact);
        return data;
    }
    catch(e){}
}

jsonDBFunctions.updateUserSocialExposure= async (user,info) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        userProfileDb.push(`/contactSocialExposure/${info.contact}`, info);
        if(info.relationship=="Self"){
            userProfileDb.push(`/socialExposure`, info);
        }
        userProfileDb.save();
    }
    catch(e){
        console.log(e)
    }
    
    return info
}


jsonDBFunctions.getUserMedicalHistory= async (user) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        data=userProfileDb.getData("/medicalHistory");
        return data;
    }
    catch(e){}
}

jsonDBFunctions.getContactMedicalHistory= async (user,contact) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        data=userProfileDb.getData("/contactInfoMedicalHistory/"+contact);
        return data;
    }
    catch(e){}
}


jsonDBFunctions.updateUserMedicalHistory= async (user,info) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        userProfileDb.push(`/contactInfoMedicalHistory/${info.contact}`, info);
        if(info.relationship=="Self"){
            userProfileDb.push(`/selfProfile`, "Completed");
            userProfileDb.push(`/medicalHistory`, info);
        }
        userProfileDb.save();
    }
    catch(e){
        console.log(e)
    }
    
    return info
}

jsonDBFunctions.getUserLanguagePref= async (user) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        try{
            data=userProfileDb.getData(`/userLanguagePref`);
        }catch(e){
            return "NotSet"
            
        }
        return data;
    }
    catch(e){
        console.log(e)
    }
}

jsonDBFunctions.updateUserLanguagePref= async (user,info) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        userProfileDb.push(`/userLanguagePref`, info.language);
        userProfileDb.save();
    }
    catch(e){
        console.log(e)
    }
    
    return info
}


jsonDBFunctions.updateDailyReadingInfo= async (user,info) => {

    const date2 = new Date();

    var year=date2.getFullYear();
    var month=date2.getMonth()+1;
    var date=date2.getDate();
    var hour=date2.getHours();
    var myDt=year+"-";
    if(month <10)
        myDt=myDt+"0"+month;
    else
        myDt=myDt+month;
    if(date <10)
        myDt=myDt+"-0"+date;
    else
        myDt=myDt+"-"+date;        
    if(hour <10)
        hour=hour+"0"+hour;
         
    
    var key=info.member+"#"+myDt+":"+hour;
    
    try{
        info.name=info.member
        info.date=myDt
        info.hour=hour
        info.id=key
        try{
            let dailyReadingDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/dailyReading`, true, false, '/'));
            dailyReadingDb.push(`/${key}`, info);
            dailyReadingDb.save();
        }
        catch(e){
            console.log(e)
        }
        
    }
    catch(e){
            console.log(e)
    }
    return info
}


 
jsonDBFunctions.getDailyReadingInfo= async (user) => {
    try{
        let dailyReadingDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/dailyReading`, true, false, '/'));
        data=dailyReadingDb.getData("/");
        const values = Object.values(data)
        return values;
    }
    catch(e){}
}
jsonDBFunctions.getUserFamilyInfo= async (user) => {
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        data=userProfileDb.getData("/contactInfo");
        const values = Object.values(data)
        return values;
    }
    catch(e){}
}

jsonDBFunctions.deleteUserFamilyInfo= async (user,uuid,info) => {
    if(info.name=="") return "";
    if(info.uuid=="")
        return;
    uuid=info.uuid
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        userProfileDb.push(`/familyInfo/${uuid}`, undefined);
        userProfileDb.save();
    }
    catch(e){
        console.log(e)
    }
    
    return info
}

jsonDBFunctions.updateUserFamilyInfo= async (user,uuid,info) => {
    if(info.name=="") return "";
    if(info.uuid=="")
        info.uuid=uuid
    else
        uuid=info.uuid
    try{
        let userProfileDb =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/userProfile`, true, false, '/'));
        userProfileDb.push(`/familyInfo/${uuid}`, info);
        userProfileDb.save();
    }
    catch(e){
        console.log(e)
    }
    
    return info
}


jsonDBFunctions.updateUserInfo= async (info) => {
    var userID=info.user_id.replace("|","");
    jsonDBFunctions.userInfo_db.push(`/${userID}`, info);
    jsonDBFunctions.userInfo_db.save();
    
    /*
     * Create required directory to store user gpsData
     * So basically, we will create a directory with userID as well as userID/gpdData
     */

    ensureExists(`${jsonDBDirectory}${userID}`, 0744, function(err) {
        });
    ensureExists(`${jsonDBDirectory}${userID}/gpsData`, 0744, function(err) {
        });
    ensureExists(`${jsonDBDirectory}${userID}/messages`, 0744, function(err) {
        });
}

jsonDBFunctions.loadJSONtoTinyDB= async (jsonObj,user) => {
    let data4Upload={}
    try{
        jsonObj.forEach(function (data, index) {            
            const date = new Date(data.time);
            var targetDB=date.getFullYear()+'-' ;
            if((date.getMonth()+1)>9)
                targetDB=targetDB + (date.getMonth()+1) + '-';
            else
                targetDB=targetDB +"0" +(date.getMonth()+1) + '-';

            if((date.getDate())>9)
                targetDB=targetDB + (date.getDate());
            else
                targetDB=targetDB +"0" +(date.getDate());
                
            if(data4Upload[targetDB]==undefined)
                data4Upload[targetDB]=[]
            data4Upload[targetDB].push(data)
        });


        for (var date in data4Upload){
            data4Date=data4Upload[date];
            let history_db =  new JsonDB(new JsonDBConfig(`${jsonDBDirectory}${user}/gpsData/${date}`, false, false, '/'));

            data4Date.forEach(function (data, index) {            
                history_db.push(`/${data.timestamp}`, data);
                console.log(`[${date}][${user}][setInfo] ${data.time} : ${data.lat},${data.lon},${data.provider}`);
            });
            history_db.save();
                
        }
    }
    catch(e){}
}

jsonDBFunctions.loadCSVtoTinyDB= async (csvFilePath,user) => {
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{

        
        jsonDBFunctions.loadJSONtoTinyDB(jsonObj,user);
        fs.unlink(csvFilePath, (err) => {
            if (err) {
                console.error(err)
                return
            }

            //file removed
        })        
    })
}
module.exports =jsonDBFunctions;


function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}
