var getFamilyMemberList = new webix.DataCollection({
    url:"/mygroup/myFamilyList/"+Date.now()
});
//webix.proxy("rest", "/mygroup/myFamilyList/"+Date.now());
var buttonForDailyReading = {
view:"toolbar", elements:[{},
    { 
        view:"button", 
        value:translate("Add reading"), width:translate("Add reading").length*10,align:"center", 
        click:function(){

                var id = $$('dailyReadingList').getSelectedId();
                if (id)
                    $$('dailyReadingList').unselect(id);
                $$('dailyReadingFormWindow').show();

        } 
        
    },{}
]
};


var dailyReadingForm = {
    view:"form",
    id:'dailyReadingForm',
    scroll:"auto",
    autoheight:true,
    autowidth:true,
    minheight:500, 
    elements:[

        {view:"select",required:true,labelWidth:100,label:translate("Member"),name:"member", placeholder:"Member",editor:"select", options:getFamilyMemberList},
        {view:"fieldset", label:translate("Enter regular symptoms"), body:{
                rows:[

                    {
                        view:"segmented",labelPosition:"top", 
                        name:"temp",
                        required:true,
                        label:translate("Fever (oral temperature)"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"Fatigue",
                        required:true,
                        label:translate("Fatigue"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"MuscleJoinPain",
                        required:true,
                        label:translate("Muscle pain or joint pain"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"Low", "value":"Low"}, 
                            {"id":"Very low", "value":"Very low"}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"SoreThroat",
                        required:true,
                        label:translate("Sore Throat"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"Headache",
                        required:true,
                        label:translate("Headache"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"Chills",
                        required:true,
                        label:translate("Chills"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"NauseaVomitting",
                        required:true,
                        label:translate("Nausea or Vomitting"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"NasalCongestion",
                        required:true,
                        label:translate("Nasal Congestion"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"Diarrhoea",
                        required:true,
                        label:translate("Diarrhoea"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"BloodinPhlegum",
                        required:true,
                        label:translate("Blood in Phlegum"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"Rednessineyes",
                        required:true,
                        label:translate("Redness in eyes"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"Sneezing",
                        required:true,
                        label:translate("Sneezing"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    },
                    {
                        view:"segmented",labelPosition:"top", 
                        name:"Sputumproduction",
                        required:true,
                        label:translate("Sputum production"), 
                        labelWidth:150,
                        options:[
                            {"id":"ABSENT", "value":translate("ABSENT")}, 
                            {"id":"MILD", "value":translate("MILD")}, 
                            {"id":"MODERATE", "value":translate("MODERATE")}, 
                            {"id":"HIGH", "value":translate("HIGH")}
                        ]
                    }
                    ]
                    }
            },
            {cols:[{},
            {view:"button", width:80,align:"center",value:translate("Cancel"),
                click:function(){ 
                    $$('dailyReadingFormWindow').hide();
                    setTimeout(function(){
                        var id = $$('dailyReadingList').getSelectedId();
                        if (id)
                            $$('dailyReadingList').unselect(id);
                        $$('dailyReadingFormWindow').hide();

                    },500);

                }
                
            },
            { view:"button", width:translate("Submit").length*12,align:"center",value:translate("Submit"), 
                click:function(){ 
                    if($$("dailyReadingForm").validate()){
                        try{
                            setTimeout(function(){
                                var id = $$('dailyReadingList').getSelectedId();
                                if (id)
                                    $$('dailyReadingList').unselect(id);
                                $$('dailyReadingFormWindow').hide();
                                $$('dailyReadingList').clearAll()
                                $$('dailyReadingList').load("/mygroup/dailyReadingInfo/"+Date.now());
                            },500);
                            $$("dailyReadingForm").save();
                        }catch(e){
                            setTimeout(function(){
                                window.location.href="/mygroup/fightCorona"
                            },2000);  

                            webix.send("/mygroup/dailyReadingInfo",$$("dailyReadingForm").getValues(),"POST");
                            
                        }
                        $$('dailyReadingFormWindow').hide();

                    }
                    else
                        alert("Please fill all mandatory inputs");
                }
                
            },{}
            ]},
            
    ], 
        onContext:{}

};
            
var  dailyReadingList={
    view:"list",
 				autowidth:true,
				scroll:"xy",
				minheight:350,
				maxheight:500,
                id:"dailyReadingList",
				template:"#name#, #date#:#hour#Hrs<div style='padding-left:18px'> Temp:#temp#, Chills:#Chills#, Nasal Congestion:#NasalCongestion#, Diarrhoea:#Diarrhoea#  </div><div style='padding-left:18px'> Vomit:#vomit#, Digestion:#digestion#, Hunger:#hunger#, Nose:#runningNose#  </div>",
				type:{
					height:100
				},
				select:true,

				url:"/mygroup/dailyReadingInfo/"+Date.now(),

                    save: {
                        updateFromResponse:true,
                        url:"rest->/mygroup/dailyReadingInfo/"
                    },
                on:{
					onAfterAdd:function(id, index){                  
						this.select(
                                id,2
                            ); 
                        this.clearAll()
                        this.load("/mygroup/dailyReadingInfo/"+Date.now());
                    },
                    onSelectChange: function(){
                        $$('dailyReadingForm').bind('dailyReadingList') 
                        $$("dailyReadingFormWindow").show();
                        setTimeout(function(){
                            $$("dailyReadingForm").validate();
                            $$("dailyReadingForm").refresh();
                        },500);
                        
                    }
				}
}


webix.ui({
    view:"window",id:"dailyReadingFormWindow", 
    move:true,
    fullscreen:true, width:300, height:300,
        resize: true,
        head:{
                    view:"toolbar",  cols:[
                        {view:"label", label: translate("Add/Update Family info") , align:"center"},
                        { view:"icon", icon:"mdi mdi-close", css:"alter", click: function(){
                                $$('dailyReadingFormWindow').hide();
                                setTimeout(function(){
                                    var id = $$('dailyReadingList').getSelectedId();
                                    if (id)
                                        $$('dailyReadingList').unselect(id);
                                    $$('dailyReadingFormWindow').hide();

                                },500);
                            }, align:"right"
                        }
                    ]
                }, left:0, top:0,
    body:{
        rows:[
            dailyReadingForm
        ]
    }
});        

