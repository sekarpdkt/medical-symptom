var nextID=100;
webix.ui.fullScreen();


	          

var buttons = {
view:"toolbar", elements:[{},
    { 
        view:"button", 
        value:"Add member", width:120,align:"center", 
        click:function(){

                var id = $$('myFamilyList').getSelectedId();
                if (id)
                    $$('myFamilyList').unselect(id);
                $$('familyDtlFormWindow').show();

        } 
        
    },{}
]
};

		var familyDtlform = {
							        view:"form",
                                    id:'familyDtl',
									scroll:"auto",
									autoheight:true,
									autowidth:true,
									minheight:500, 
									elements:[

                                        {view:"text",required:true,labelWidth:100,label:"Name",name:"name", placeholder:"Name"},
										{view:"text",required:true,labelWidth:100,label:"Relationship",name:"relationship", placeholder:"Relationship"},
										{view:"text",required:true,labelWidth:100,label:"Age",name:"age", placeholder:"Age"},
                                        {
                                            view:"radio", 
                                            name:"gender",
                                            required:true,
                                            label:"Gender", 
                                            labelWidth:100,
                                            options:[
                                                {"id":"Female", "value":"Female"}, // the initially selected item
                                                {"id":"Male", "value":"Male"}
                                            ]
                                        },
                                        { view:"fieldset", label:"Does member have any of these ailments?", body:{
                                            rows:[

                                                {
                                                    view:"radio", 
                                                    name:"ishypertension",
                                                    required:true,
                                                    label:"Hypertension (BP)", 
                                                    labelWidth:150,
                                                    options:[
                                                        {"id":"Yes", "value":"Yes"}, // the initially selected item
                                                        {"id":"No", "value":"No"}
                                                    ]
                                                },
                                                {
                                                    view:"radio", 
                                                    name:"isDiabetes",
                                                    required:true,
                                                    label:"Diabetes", 
                                                    labelWidth:150,
                                                    options:[
                                                        {"id":"Yes", "value":"Yes"}, // the initially selected item
                                                        {"id":"No", "value":"No"}
                                                    ]
                                                },
                                                {
                                                    view:"radio",  
                                                    name:"isHeartAilments",
                                                    required:true,
                                                    label:"Heart ailments", 
                                                    labelWidth:150,
                                                    options:[
                                                        {"id":"Yes", "value":"Yes"}, // the initially selected item
                                                        {"id":"No", "value":"No"}
                                                    ]
                                                }, 
                                                {
                                                    view:"radio", 
                                                    name:"isKidneyAilments",
                                                    required:true,
                                                    label:"Kidney ailments", 
                                                    labelWidth:150,
                                                    options:[
                                                        {"id":"Yes", "value":"Yes"}, // the initially selected item
                                                        {"id":"No", "value":"No"}
                                                    ]
                                                }
                                                ]
                                                }
                                        },
            
										{ 
                                            view:"textarea",label:"Describe Other Medical Issues:",labelWidth:150,labelPosition:"top", 
                                            name:"other_medical_issue", height:100 ,placeholder:"Describe Other Medical Issues"
                                            
                                        },
                                        {cols:[{},
                                            {view:"button", width:80,align:"center",value:"Close",
                                                click:function(){ 
                                                    $$('familyDtlFormWindow').hide();
                                                            setTimeout(function(){
                                                                var id = $$('myFamilyList').getSelectedId();
                                                                if (id)
                                                                    $$('myFamilyList').unselect(id);
                                                                $$('familyDtlFormWindow').hide();

                                                            },500);
                                                    
                                                }
                                                
                                            },
											{ view:"button", width:80,align:"center",value:"Submit", 
                                                click:function(){ 
                                                    if($$("familyDtl").validate()){
                                                        try{
                                                            setTimeout(function(){
                                                                var id = $$('myFamilyList').getSelectedId();
                                                                if (id)
                                                                    $$('myFamilyList').unselect(id);
                                                                $$('familyDtlFormWindow').hide();

                                                            },500);
                                                            $$("familyDtl").save();
                                                        }catch(e){
                                                            setTimeout(function(){
                                                                window.location.href="/mygroup/fightCorona"
                                                            },2000);  

                                                            webix.send("/mygroup/myfamilyV2",$$("familyDtl").getValues(),"POST");

                                                          
                                                        }
                                                        $$('familyDtlFormWindow').hide();

                                                    }
                                                    else
                                                        alert("Please fill all mandatory inputs");
                                                }
                                                
                                            },
                                            {view:"button", width:80,align:"center",value:"Delete",
                                                click:function(){ 
                                                    var id = $$('myFamilyList').getSelectedId();
                                                    if (id)
                                                        $$('myFamilyList').remove(id);
                                                    $$('familyDtlFormWindow').hide();
                                                    
                                                }
                                                
                                            },{}
                                            ]},
											
                                    ], rules:{
										name: webix.rules.isNotEmpty,
										age: webix.rules.isNumber,
										relationship: webix.rules.isNotEmpty  
									  },
									  onContext:{}
				
			};
            
var myFamilyList={
    view:"list",
 				autowidth:true,
				scroll:"xy",
				minheight:350,
				maxheight:500,
                id:"myFamilyList",
				template:"#name#, #relationship#, #gender#<div style='padding-left:18px'> Age:#age#, BP:#ishypertension#, Sugar:#isDiabetes# </div>",
				type:{
					height:62
				},
				select:true,

				url:"/mygroup/myfamily/"+Date.now(),

                    save: {
                        updateFromResponse:true,
                        url:"rest->/mygroup/myfamily/"
                    },
                on:{
					onAfterAdd:function(id, index){                  
						this.select(
                                id,2
                            ); 
                        this.clearAll()
                        this.load("/mygroup/myfamily/"+Date.now());
                    },
                    onSelectChange: function(){
                        $$('familyDtl').bind('myFamilyList') 
                        $$("familyDtlFormWindow").show();
                        var id = $$('myFamilyList').getSelectedId();
                        if (id){
                            var record = $$('myFamilyList').getItem(id);
                            setTimeout(function(){
                                $$("familyDtl").validate();
                                $$("familyDtl").refresh();
                                $$("familyDtl").setValues(
                                    record
                                );
                                    
                            },500);                           
                        }
                        
                    }
				}
}
        webix.ui({
            view:"window",id:"familyDtlFormWindow", 
            move:true,
            fullscreen:true, width:300, height:300,
                resize: true,
                head:{
                            view:"toolbar",  cols:[
                                {view:"label", label: "Add/Update Family info" , align:"center"},
                                
                                { view:"icon", icon:"mdi mdi-close", css:"alter", click: function(){
                                    $$('familyDtlFormWindow').hide();
                                    setTimeout(function(){
                                        var id = $$('myFamilyList').getSelectedId();
                                        if (id)
                                            $$('myFamilyList').unselect(id);
                                        $$('familyDtlFormWindow').hide();

                                    },500);
                                    
                                    }, align:"right"
                                }
                            ]
                        }, left:0, top:0,
            body:{
                rows:[
                    familyDtlform
                ]
            }
        });        
        
        
         

        
	function getId() {
		return nextID++;
	}
