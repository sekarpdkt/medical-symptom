
var myLanguageList={
  id: 'myLanguageSelection',
  view:"radio",  
  vertical:true, 
    label:"Select language:",
    labelPosition:"top",
    options:[
    { id:"en", value:"English"},
    { id:"hi", value:"Hindi"},
    { id:"bn", value:"Bengali"},
    { id:"mr", value:"Marathi"},
    { id:"te", value:"Telugu"},
    { id:"ta", value:"Tamil"},
    { id:"gu", value:"Gujarati"},
    { id:"ur", value:"Urdu"},
    { id:"kn", value:"Kannada"},
    { id:"or", value:"Odia"},
    { id:"ml", value:"Malayalam"},
    { id:"pa", value:"Punjabi"}
  ]
}           				

webix.ui({
    container: "fightCorona",
    padding:8,
    rows:[
        {
            rows:[
                {
                    view:"segmented", id:'tabbar1', value: 'multiListView', multiview:true,   align:"center",  options: [
                        { value: '<span class="fas fa-user" ></span> '+translate("Profile"), id: 'myProfileForm',width:100,height:32},
                        { value: '<span class="fas fa-globe-americas" ></span> '+translate("Travel"), id: 'socialExposureForm',width:100,height:32},
                        { value: '<span class="fas fa-stethoscope" ></span> '+translate("Medical"), id: 'medicalHistoryForm',width:100,height:32},
                        { value: '<span class="fas fa-users" ></span> '+translate("Family"), id: 'showFamily',width:100,height:32},
                        { value: '<span class="fas fa-language" ></span>', id: 'myLanguageSelection',width:48,height:32}
                    ]
                },
                {height: 5},
                {   id:"mymulti",
                    cells:[
                        myProfileForm,socialExposureForm,medicalHistoryForm,
                        {id:"showFamily",
                            template:`<div id='temp12' ></div>`},
                        myLanguageList
                    ]
                }
            ]
        }
    ]
}).show();

$$("myLanguageSelection").setValue("en");


webix.ajax().get("/mygroup/languageOption/"+Date.now(), { date : Date.now() }).then(function(data){
    userLanguagePref=data.text().replace(/"/g, '');
    $$("myLanguageSelection").setValue(userLanguagePref);
    $$("myLanguageSelection").attachEvent("onChange", function(newv, oldv){
        let additionalParam="&contact="+contact
        webix.send("/mygroup/languageOption?showTab=profile"+additionalParam,{"language":newv},"POST");
    });

    if(userLanguagePref==undefined || userLanguagePref=="NotSet" ||userLanguagePref==null || userLanguagePref=="") {
        if(showTab==undefined || showTab==null || showTab==""){
               try{
                   $$("tabbar1").setValue("myLanguageSelection");
               }catch(e){}
        }
    }
});


if(showTab=="socialExposure"){
    $$("tabbar1").setValue("socialExposureForm");
}
if(showTab=="medicalHistory"){
    $$("tabbar1").setValue("medicalHistoryForm");
}
if(showTab=="profile"){
    $$("tabbar1").setValue("myProfileForm");
}
$$("showFamily").attachEvent("onViewShow", function(){
            window.location.href="/mygroup/regularOption"
});
