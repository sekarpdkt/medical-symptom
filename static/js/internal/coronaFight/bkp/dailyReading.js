var getFamilyMemberList = new webix.DataCollection({
    url:"/mygroup/myFamilyList/"+Date.now()
});
//webix.proxy("rest", "/mygroup/myFamilyList/"+Date.now());
var buttonForDailyReading = {
view:"toolbar", elements:[{},
    { 
        view:"button", 
        value:"Add reading", width:120,align:"center", 
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
        {view:"text",labelWidth:100,label:"Id",name:"id", placeholder:"id",disabled:true},
        {view:"text",labelWidth:100,label:"uuid",name:"uuid", placeholder:"uuid",disabled:true},
        {view:"select",required:true,labelWidth:100,label:"Member",name:"member", placeholder:"Member",editor:"select", options:getFamilyMemberList},
        {view:"fieldset", label:"Enter regular symptoms", body:{
                rows:[

                    {
                        view:"select", 
                        name:"temp",
                        required:true,
                        label:"Body temperature", 
                        labelWidth:150,
                        options:[
                            {"id":"Normal", "value":"Normal"}, // the initially selected item
                            {"id":"Mild", "value":"Mild"}, // the initially selected item
                            {"id":"Medium", "value":"Medium"}, // the initially selected item
                            {"id":"High", "value":"High"}, // the initially selected item
                            {"id":"Very high", "value":"Very high"}
                        ]
                    },
                    {
                        view:"select", 
                        name:"cough",
                        required:true,
                        label:"Cough", 
                        labelWidth:150,
                        options:[
                            {"id":"No", "value":"No"}, // the initially selected item
                            {"id":"Occasional", "value":"Occasional"}, // the initially selected item
                            {"id":"Frequent", "value":"Frequent"}, // the initially selected item
                            {"id":"Continuous", "value":"Continuous"}
                        ]
                    },
                    {
                        view:"select", 
                        name:"bp",
                        required:true,
                        label:"Blood pressure", 
                        labelWidth:150,
                        options:[
                            {"id":"Normal", "value":"Normal"}, // the initially selected item
                            {"id":"Low", "value":"Low"}, // the initially selected item
                            {"id":"Very low", "value":"Very low"}, // the initially selected item
                            {"id":"High", "value":"High"}, // the initially selected item
                            {"id":"Very high", "value":"Very high"}
                        ]
                    },
                    {
                        view:"select", 
                        name:"vomit",
                        required:true,
                        label:"Vomitting", 
                        labelWidth:150,
                        options:[
                            {"id":"No", "value":"No"}, // the initially selected item
                                {"id":"Occasional", "value":"Occasional"}, // the initially selected item
                            {"id":"Frequent", "value":"Frequent"}, // the initially selected item
                            {"id":"Continuous", "value":"Continuous"}
                        ]
                    },
                    {
                        view:"select", 
                        name:"digestion",
                        required:true,
                        label:"Digestion", 
                        labelWidth:150,
                        options:[
                            {"id":"Normal", "value":"Normal"}, // the initially selected item
                            {"id":"Loose motion", "value":"Loose motion"}, // the initially selected item
                            {"id":"No motion", "value":"No motion"}
                        ]
                    },
                    {
                        view:"select", 
                        name:"hunger",
                        required:true,
                        label:"Hungry", 
                        labelWidth:150,
                        options:[
                            {"id":"Normal", "value":"Normal"}, // the initially selected item
                            {"id":"Not feeling hungry", "value":"Not feeling hungry"}
                        ]
                    },
                    {
                        view:"select", 
                        name:"runningNose",
                        required:true,
                        label:"Running nose", 
                        labelWidth:150,
                        options:[
                            {"id":"No", "value":"No"}, // the initially selected item
                            {"id":"Yes", "value":"Yes"}
                        ]
                    },
                    {
                        view:"select", 
                        name:"breathing",
                        required:true,
                        label:"Breathing", 
                        labelWidth:150,
                        options:[
                            {"id":"Normal", "value":"Normal"}, 
                            {"id":"Slight difficulty", "value":"Slight difficulty"}, 
                            {"id":"Very difficult", "value":"Very difficult"}
                        ]
                    }
                    ]
                    }
            },
            {cols:[{},
            {view:"button", width:80,align:"center",value:"Close",
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
            { view:"button", width:80,align:"center",value:"Submit", 
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
                
            },
            {view:"button", width:80,align:"center",value:"Delete",
                click:function(){ 
                    var id = $$('dailyReadingList').getSelectedId();
                    if (id)
                        $$('dailyReadingList').remove(id);
                    $$('dailyReadingFormWindow').hide();
                    
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
				template:"#name#, #date#:#hour#Hrs<div style='padding-left:18px'> Temp:#temp#, Cough:#cough#, BP:#bp#, breathing:#breathing#  </div><div style='padding-left:18px'> Vomit:#vomit#, Digestion:#digestion#, Hunger:#hunger#, Nose:#runningNose#  </div>",
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
                        {view:"label", label: "Add/Update Family info" , align:"center"},
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

