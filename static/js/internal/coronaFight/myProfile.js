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
var img = `<img src='/static/icons/marker-icon.png' />`;

/*
 							{cols:[
								{},			
								{height:50,
								  data: {title: "Image One",src: "/static/photos/dogs1.jpg" },
								  template: function (obj) {
									// obj is a data record object
									return '<img src="'+obj.src+'"/>'
								  }			
								},{}
							]},
 **/
var myProfileForm={
            view:"form",
            id:'myProfileForm',
            scroll:"auto",
            autoheight:true,
            autowidth:true,
            elements:[
                {height:50,
                    data: {title: "Image One",src: "/static/photos/dogs1.jpg" ,width:"100%",align:"center"},
                    template: function (obj) {
                    // obj is a data record object
                    return '<img src="'+obj.src+'" width="100%", height="50"/>'
                    }			
                },
                {id:"myProfileFormName",view:"text",labelWidth:60,required:true,name:"name",label:translate("Name"), placeholder:"Name"},
                {id:"myProfileFormRelationship", view:"richselect",labelWidth:60,name:"relationship",required:true, label:translate("Relationship"), options:["Self","Parent","Sibling","Child","Grand parent","Grandchild","Spouse","Other"]},
                {view:"counter", name: "age",labelWidth:60,required:true,label:translate("Age")},
                {
                    view:"radio", 
                    name:"sex",
                    required:true,
                    label:translate("Sex"), 
                    labelWidth:100,
                    options:[
                        {"id":"Male", "value":translate("Male")},
                        {"id":"Female", "value":translate("Female")}
                    ]
                },

                {view:"counter", name: "height",labelWidth:150,required:true,label:translate("Height (cm)"),value:10},
                {view:"counter", name: "weight",labelWidth:150,required:true,label:translate("Weight (Kg)"),value:10},
                {view:"text",labelWidth:60,name:"bmi",label:translate("BMI"), placeholder:"BMI"},
                {view:"textarea",labelWidth:60,height:100,name:"address",required:true,label:translate("Address"), placeholder:"Address"},
                {view:"text",labelWidth:60,name:"city",required:true,label:translate("City"), placeholder:"City"},
                
                    { view:"richselect",labelWidth:60,name:"state",required:true, label:translate("State"), options:["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha (Orissa)","Punjab","Rajasthan","Sikkim","Telangana","Tamil Nadu","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]},
                    {view:"text",labelWidth:60,name:"pincode",required:true,label:translate("Pin"), placeholder:"Pincode"},
                {view:"text",labelWidth:60,name:"adharNumber",label:translate("Aadhar"), placeholder:"Aadhar Number"},
                {view:"text",labelWidth:60,name:"email",required:true,label:translate("Email"), placeholder:"Email"},
                {view:"text",labelWidth:60,name:"mobile",required:true,label:translate("Mob."), placeholder:"Mobile"},
                {view:"text",labelWidth:60,name:"telephone",label:translate("Tel."), placeholder:"Telephone"},
                {cols:[{},
                    { view:"button", width:120,align:"center", value:translate("Continue"), click:function(){ 
                                if($$("myProfileForm").validate()){
                                    let profileInfo=$$("myProfileForm").getValues()
                                    let contact=`${profileInfo.name} - ${profileInfo.relationship}`;
                                    let additionalParam="&contact="+contact
                                    webix.send("/mygroup/myInfo?showTab=socialExposure"+additionalParam,$$("myProfileForm").getValues(),"POST");
                                }
                                else
                                    webix.alert("Please fill all mandatory inputs");
                    }},{}
                ]}
            ],rules:{
                name: webix.rules.isNotEmpty,
                age: webix.rules.isNumber,
                sex: webix.rules.isNotEmpty,
                email: webix.rules.isEmail,
                height: webix.rules.isNumber,
                weight: webix.rules.isNumber,
                address: webix.rules.isNotEmpty, 
                city: webix.rules.isNotEmpty,
                state: webix.rules.isNotEmpty,
                pincode: webix.rules.isNumber,
                mobile: webix.rules.isNumber							
                }
            
                
} 




let profileUrl="/mygroup/myInfo/";
if(contact!=undefined)
    profileUrl=profileUrl+contact+"/"
webix.ajax(profileUrl+Date.now()).then(function(data){
    if(data.json().name!=undefined){
        $$("myProfileForm").setValues(data.json());
        if(action != undefined) {
            $$("myProfileFormName").setValue("");
            $$("myProfileFormRelationship").setValue("");
        };
        if(data.json().selfProfile!=undefined && action == undefined && contact == undefined){
            window.location.href="/mygroup/regularOption"
        }
}
    
});
       
        
        
        
        
        
        
        
        
