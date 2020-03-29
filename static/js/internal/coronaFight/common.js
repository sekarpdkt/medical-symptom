
var urlInfo = new URL(window.location.href);
var contact = urlInfo.searchParams.get("contact");
var action = urlInfo.searchParams.get("action");
var showTab = urlInfo.searchParams.get("showTab");


function translate(text){
    if(userLanguagePref=="en" || userLanguagePref==undefined || userLanguagePref=="NotSet")
        return text
    else{
        trTxt=text;
        text=text.replace(/\//g, ' or ');
        try{
            if(translateDB[text]==undefined){
                webix.ajax().get(`/mygroup/translate/en/${userLanguagePref}/${Date.now()}`, { text : text }).then(function(data){
                    trTxt=data.text().replace(/"/g, '');
                    return trTxt;
                })
            }
            else{
                if(translateDB[text] == text){
                    webix.ajax().get(`/mygroup/translate/en/${userLanguagePref}/${Date.now()}`, { text : text }).then(function(data){
                        trTxt=data.text().replace(/"/g, '');
                        return trTxt;
                    })                    
                }
                return translateDB[text]
            }
        }
        catch(e){
            console.log(e)
        }
        return  trTxt;
    }
} 



