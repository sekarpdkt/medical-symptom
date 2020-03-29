function change_rad(){
	if ($$("haveTravel").getValue()=="Yes")
	{
		$$("tbar").show();		
		
	}else {
		$$("tbar").hide();

	}
}


var socialExposureForm={
view:"form",
id:'socialExposureForm',
scroll:"auto",
padding:10,
autoheight:true,
autowidth:true,
elements:[
        
		{height:50,
			data: {title: "Image One",src: "/static/photos/road.jpeg" ,width:"100%",align:"center"},
			template: function (obj) {
			// obj is a data record object
			return '<img src="'+obj.src+'" width="100%", height="50"/>'
			}			
		},
		{view: "label",label:translate("Have you travelled in last 14 days?")},
		 {
					view:"radio", 
					name:"haveTravel",
					id:"haveTravel",
					click:change_rad,									
					required:true,
					options:[
						{"id":"Yes", "value":translate("Yes")}, // the initially selected item
						{"id":"No", "value":translate("No")}
					]
		 },
		{
			view:"fieldset",  
			id:"tbar",
			hidden:true,
            body:{
					rows:[{view: "label",id:"travelPlace", label:translate("Select places if you have travelled to")},
					{
					cols: [
							{ view: "switch", onLabel: translate("China"), offLabel:translate("China"), name:"China", value: 0 },
							{ view: "switch", onLabel: translate("S Korea"), offLabel:translate("S Korea"), name:"SKorea", value: 0 },
							{ view: "switch", onLabel: translate("Japan"), offLabel:translate("Japan"), name:"Japan", value: 0 }
						]
					},
					{
					cols: [
							{ view: "switch", onLabel: translate("Italy"), offLabel:translate("Italy"), name:"Italy", value: 0 },
							{ view: "switch", onLabel: translate("Spain"), offLabel:translate("Spain"), name:"Spain", value: 0 },
							{ view: "switch", onLabel: translate("UK"), offLabel:translate("UK"), name:"UK", value: 0 }
						]
					},
					{view: "label",label:translate("Mention any other Place/City/State/Country")},
					{view:"textarea",labelWidth:120,height:100,name:"travelPlace",placeholder:"Mention any other Place/City/State/Country"}
					]
			}

		},
        {view: "label",label:translate("Past 14 days social exposure")},
        {	
            view:"fieldset", 
            label:translate("Have you had any contact with person?"), 
            body:{rows:
                    [
                    {view: "label",label:translate("With symptoms (dry cough and fever)")},
                    {
                        view:"radio", 
                        name:"isSymptoms",
                        required:true,
                        labelWidth:150,
                        options:[
                            {"id":"Yes", "value":translate("Yes")}, // the initially selected item
                            {"id":"No", "value":translate("No")}
                        ]
                    },
                    {view: "label",label:translate("With confirmed COVID 19 diagnosis")},
                    {
                        view:"radio", 
                        name:"isCOVID19",
                        required:true,
                        labelWidth:150,
                        options:[
                            {"id":"Yes", "value":translate("Yes")}, // the initially selected item
                            {"id":"No", "value":translate("No")}
                        ]
                    },
                    {view: "label",label:translate("Attended any marriage or conference or functions")},
                    {
                        view:"radio", 
                        name:"isSocialGatering",
                        required:true,
                        labelWidth:150,
                        options:[
                            {"id":"Yes", "value":translate("Yes")}, // the initially selected item
                            {"id":"No", "value":translate("No")}
                        ]
                    },
                    {view: "label",label:translate("Travel history (severly affected area or country)")},
                    {
                        view:"radio", 
                        name:"metTravelHistoryContact",
                        required:true,
                        labelWidth:150,
                        options:[
                            {"id":"Yes", "value":translate("Yes")}, // the initially selected item
                            {"id":"No", "value":translate("No")}
                        ]
                    }
                        
                    ]
                }
        },
        {cols:[{},
            { view:"button", width:80,align:"center", value:translate("Continue"), click:function(){ 
                        if($$("socialExposureForm").validate()){
                            if($$("myProfileForm").getValues().saved!=undefined && $$("myProfileForm").getValues().saved=="Yes"){
                                let info=$$("socialExposureForm").getValues();
                                let profileInfo=$$("myProfileForm").getValues()
                                info.contact=`${profileInfo.name} - ${profileInfo.relationship}`;
                                info.relationship=`${profileInfo.relationship}`;
                                let contact=`${profileInfo.name} - ${profileInfo.relationship}`;
                                let additionalParam="&contact="+contact
                                webix.send("/mygroup/socialExposure?showTab=medicalHistory"+additionalParam,info,"POST");
                            }
                            else
                                webix.alert("Please fill profile form");
                                
                        }
                        else
                            webix.alert("Please fill all mandatory inputs");
            }},{}
        ]}
    ],rules:{
        haveTravel: webix.rules.isNotEmpty,
        isSymptoms: webix.rules.isNotEmpty,
        isCOVID19: webix.rules.isNotEmpty						
        },onContext:{}
    
        
} 

if(action!=undefined || action==null){
    let socialURL="/mygroup/socialExposure/";
    if(contact!=undefined)
        socialURL=socialURL+contact+"/"
    webix.ajax(socialURL+Date.now()).then(function(data){
        if(data.json().haveTravel!=undefined){
            $$("socialExposureForm").setValues(data.json());
        }
        
    });
}

