
var medicalHistoryForm={
    view:"form",
    id:'medicalHistoryForm',
    scroll:"auto",
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
		    {cols:[	
				{ view: "switch", onLabel: translate("Diabetes"), name:"Diabetes", offLabel:translate("Diabetes"), value: 0 }, 	
				{ view: "switch", onLabel: translate("High BP"), name:"HighBP", offLabel:translate("High BP"), value: 0 } 			
				  ]},
         {cols:[	
				 { view: "switch", onLabel: translate("Stroke"), name:"Stroke", offLabel:translate("Stroke"), value: 0 }, 	
				   { view: "switch", onLabel: translate("Heart disease"), name:"Heartdisease", offLabel:translate("Heart disease"), value: 0 } 			
				]},
         {cols:[	
				 { view: "switch", onLabel: translate("Asthma"), name:"Asthma", offLabel:translate("Asthma"), value: 0 }, 	
				   { view: "switch", onLabel: translate("Tuberculosis"), name:"Tuberculosis", offLabel:translate("Tuberculosis"), value: 0 } 			
			]},
         {cols:[	
				 { view: "switch", onLabel: translate("Lung diseases"), name:"Lungdiseases", offLabel:translate("Lung diseases"), value: 0 }, 	
				   { view: "switch", onLabel: translate("Steroids therapy"), name:"Steroidstherapy", offLabel:translate("Steroids therapy"), value: 0 }
			]},
         {cols:[	
				 { view: "switch", onLabel: translate("Kidney tranplant"), name:"Kidneytranplant", offLabel:translate("Kidney tranplant"), value: 0 }, 	
				 { view: "switch", onLabel: translate("On dialysis"), name:"dialysis", offLabel:translate("On dialysis"), value: 0 }, 	
     	    ]},
         {cols:[	
				   { view: "switch", onLabel: translate("Cancer treatment"), name:"Cancer", offLabel:translate("Cancer treatment"), value: 0 } ,			
				   { view: "switch", onLabel: translate("Liver diseases"), name:"Liverdiseases", offLabel:translate("Liver diseases"), value: 0 } 			
     	    ]},
         {cols:[	
                    { view: "switch", onLabel: translate("HIV"), offLabel:translate("HIV"), name:"HIV", value: 0 }, 	
                    { view: "switch", onLabel: translate("Paralysis"), offLabel:translate("Paralysis"), name:"Paralysis", value: 0 }, 	
         	]},

        { view: "switch", onLabel: translate("Living in nursing home"), name:"inNursingHome", offLabel:translate("Living in nursing home"), value: 0 }, 			
        { view: "switch", onLabel: translate("Loose motions for more than 15 days"), name:"weightLoss", offLabel:translate("Loose motions for more than 15 days"), value: 0 }, 			
            { view: "switch", onLabel: translate("Bone marrow transplant"), name:"BoneMarrow", offLabel:translate("Bone marrow transplant"), value: 0 }, 			
        { view: "switch", onLabel: translate("Uncontrolled loss of weight"), name:"LossOfWeight", offLabel:translate("Uncontrolled loss of weight"), value: 0 }, 	
        { view: "switch", onLabel: translate("Getting Renal failure"), name:"GettingRenalfailure", offLabel:translate("Getting Renal failure"), value: 0 }, 	
        { view: "switch", onLabel: translate("None of the above"), name:"None", offLabel:translate("None of the above"), value: 0 }, 			
        
        {cols:[{},
            { view:"button",width:80,align:"center", value:translate("Complete"), click:function(){ 
                        if($$("medicalHistoryForm").validate())
                            if($$("myProfileForm").getValues().saved!=undefined && $$("myProfileForm").getValues().saved=="Yes"){
                                let info=$$("medicalHistoryForm").getValues();
                                let profileInfo=$$("myProfileForm").getValues()
                                info.contact=`${profileInfo.name} - ${profileInfo.relationship}`;
                                info.relationship=`${profileInfo.relationship}`;
                                let contact=`${profileInfo.name} - ${profileInfo.relationship}`;
                                webix.send("/mygroup/medicalHistory",info,"POST");
                            }
                            else
                                webix.alert("Please fill profile form");
                        else
                            alert("Please fill all mandatory inputs");
                        }
            }
        ,{}
        ]}
    ]
                
                    
} 



if(action!=undefined || action==null){
    let socialURL="/mygroup/medicalHistory/";
    if(contact!=undefined)
        socialURL=socialURL+contact+"/"
    webix.ajax(socialURL+Date.now()).then(function(data){
        if(data.json().None!=undefined){
            $$("medicalHistoryForm").setValues(data.json());
        }
        
    });
}
