function getLocation() {

    if (navigator.geolocation) {
        console.log("Seeking location");
        navigator.geolocation.watchPosition(showPosition);
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert( "Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {

 // showCurrentLocation(position);
}
       var myInfoForm={
					 view:"form",
						id:'myInfoForm',
						scroll:"auto",
						autoheight:true,
						autowidth:true,
						elements:[
							{view:"text",labelWidth:100,name:"firstname",required:true,label:"First Name", placeholder:"First Name"},
							{view:"text",labelWidth:100,name:"lastname",required:true,label:"Last Name", placeholder:"Last Name"},
							{cols:[
								{view:"text",labelWidth:100,name:"mobile",required:true,label:"Mobile", placeholder:"Mobile"},
								{view:"text",labelWidth:100,labelWidth:100,name:"othermobile",label:"Other Mobile", placeholder:"Other Mobile"}
							]},
							{view:"text",labelWidth:100,name:"society",label:"Society", placeholder:"Society"},
							{cols:[
								{view:"text",labelWidth:50,name:"flat",label:"Flat", placeholder:"Flat No"},
								{view:"text",labelWidth:50,name:"building",label:"Bldg", placeholder:"Building No"},
								{view:"text",labelWidth:50,name:"floor",label:"Floor", placeholder:"Floor No"}
							]},
							{view:"text",labelWidth:100,name:"address1",required:true,label:"Address 1", placeholder:"Address 1"},
							{view:"text",labelWidth:100,name:"address2",label:"Address 2", placeholder:"Address 2"},
							{view:"text",labelWidth:100,name:"address3",label:"Address 3", placeholder:"Address 3"},
								{view:"text",labelWidth:100,name:"city",required:true,label:"City", placeholder:"City"},
								{view:"text",labelWidth:100,name:"state",required:true,label:"State", placeholder:"State"},
								{view:"text",labelWidth:100,name:"pincode",required:true,label:"Pincode", placeholder:"Pincode"},
							{cols:[{},
								{ view:"button", width:80,align:"center", value:"Submit", click:function(){ 
											if($$("myInfoForm").validate())
												webix.send("/mygroup/myInfo",$$("myInfoForm").getValues(),"POST");
											else
												alert("Please fill all mandatory inputs");
								}},{}
							]}
						],rules:{
							firstname: webix.rules.isNotEmpty,
							lastname: webix.rules.isNotEmpty,
							mobile: webix.rules.isNumber, 
							address1: webix.rules.isNotEmpty,
							city: webix.rules.isNotEmpty,
							state: webix.rules.isNotEmpty,
							pincode: webix.rules.isNumber
						  },onContext:{}
                        
                          
			} 
let url="/mygroup/myInfo/"+Date.now();
webix.ajax(url).then(function(data){
    $$("myInfoForm").setValues(data.json());
    if(data.json().mobile!=undefined){
        $$("tabbar1").setValue("myFamilyInfoView"); 
        setTimeout(function(){
            if($$("myFamilyList").count() >0)
                $$("tabbar1").setValue("dailyReadingView"); 
        },1000);

    }
});
