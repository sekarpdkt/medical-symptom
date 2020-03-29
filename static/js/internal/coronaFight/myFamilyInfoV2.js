var nextID=100;
webix.ui.fullScreen();


	          

var familyDtlButtons = {
view:"toolbar", elements:[{},
    { 
        view:"button", 
        value:translate("Add member"), width:translate("Add member").length*10,align:"center", 
        label:translate("Add member"),
        click:function(){
            window.location.href="/mygroup/addMember?showTab=profile&action=newContact"
        } 
        
    },{}
]
};

            
var myFamilyList={
    view:"list",
 				autowidth:true,
				scroll:"xy",
				minheight:350,
				maxheight:500,
                id:"myFamilyList",
				template:"#name#, #relationship#, #mobile#<div style='padding-left:18px'>#address# </div><div style='padding-left:18px'>#city#,#state#,#pincode# </div>",
				type:{
					height:92
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
                        var id = $$('myFamilyList').getSelectedId();
                        if (id){
                            var record = $$('myFamilyList').getItem(id);
                            window.location.href=`/mygroup/myInfo?showTab=profile&contact=${record.name} - ${record.relationship}`
                        }
                        
                    }
				}
}

        
         
