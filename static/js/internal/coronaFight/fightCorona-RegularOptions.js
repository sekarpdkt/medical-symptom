           				

webix.ui({
    container: "fightCorona",
    padding:8,
    rows:[
        {
            rows:[
                {
                    view:"segmented", id:'tabbar1', value: 'multiListView', multiview:true,   align:"center", padding: 5, options: [
                        { value: '<span class="fas fa-users"></span> '+translate("Family"), icon:"fas fa-users", id: 'myFamilyInfoView',width:translate("Family").length*12},
                        { value: '<span class="fas fa-tasks"></span> '+translate("Daily symptoms"), id: 'dailyReadingView',width:translate("Daily symptoms").length*12}
                    ]
                },
                {height: 5},
                {   id:"mymulti",
                    cells:[                        {       id:"myFamilyInfoView",
                                rows:[familyDtlButtons,myFamilyList]
                            
                        },  
                        {id:"dailyReadingView",
                                rows:[buttonForDailyReading,dailyReadingList]
                            
                        }
                        
                    ]
                }
            ]
        }
    ]
}).show();

