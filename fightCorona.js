const path = require('path')
const fs = require('fs')
const express = require("express");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const bodyParser = require('body-parser');
const uuidv4=require('uuid').v4;



const { signIn, authCallBack,validateSession } = require('./includeJS/googleOAuth2')

const app = express();
const https = require('https')

const http = require('http').Server(app);
//let server;
const formidable = require('formidable')
var logger = require('morgan');

const config = require('./includeJS/config')
const jsonDBFunctions = require('./includeJS/jsonDBFunctions')
const translate = require('./includeJS/translateNoLicense')
const handleFileUpload = require('./includeJS/handleFileUpload')
// Deciding which port to use
var port = process.env.PORT || 8088;




if (app.get('env') === 'production') {
    //session.cookie.secure = true; // serve secure cookies, requires https
    /*
    * Configure SSL. 
    */
    /**/
    try{
        const tlsOptions = {
            key: fs.readFileSync('./certificates/privkey.pem'),
            cert: fs.readFileSync('./certificates/fullchain.pem'),
        };


        //Create HTTPS server
        https.createServer(tlsOptions, app).listen(port, function() {
            console.log(`HTTPS started listening on port ${port}`);
        })
    }
    catch(e){
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
            message: err.message,
            error: err
            });
        });
        require('http').Server(app).listen(port, function() {
                console.log(`listening on *:${port}`);
        });

    }
    /**/
    
}

// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
  
  require('http').Server(app).listen(port, function() {
        console.log(`listening on *:${port}`);
    });

  
}
app.use(logger('[:date[iso]] :method :url :status :res[content-length] - :response-time ms'));

app.use(cookieParser());

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '2mb', extended: true}))
/*
 * Plese ensure while posting content type is set in header as Content-Type:application/json 
 */
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

});

/*
 * Where are we keeping our static files??? Standard express configuration
 */
app.use('/static', express.static("static"))

const uploadFilePath = path.join(config.uploadDirectory)




app.get('/favicon.ico', function(req, res) {
  res.sendFile((__dirname+"/static/icons/smargt.png"));
});


app.get('/', function (req, res, next) {
  res.redirect('/login');
});

app.get('/login', signIn);
app.get('/auth/google', signIn);
app.get('/auth/google/callback', authCallBack);


app.get('/mygroup/languageDB/:lang/:date',validateSession, function(req, res) {
    jsonDBFunctions.getlanguageDB(req.params.lang).then( function(data) {
        res.send(JSON.stringify(data)); 
    })

});

app.get('/mygroup/translate/:from/:to/:date',validateSession, function(req, res) {

    translate.translate(req.query.text,req.params.to).then((trTxt)=>{
        res.send((trTxt)); 
    }); 
});


app.get('/mygroup/myInfo',validateSession, function(req, res) {
  res.sendFile((__dirname+"/static/html/registration.html"));
});


app.get('/mygroup/addMember',validateSession, function(req, res) {
  res.sendFile((__dirname+"/static/html/registration.html"));
});

app.get('/mygroup/regularOption',validateSession, function(req, res) {
  res.sendFile((__dirname+"/static/html/fightCorona.html"));
});


app.get('/mygroup/myInfo/:date',validateSession, function(req, res) {
    jsonDBFunctions.getUserAddressInfo(req.user.user_id).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
});
app.get('/mygroup/myInfo/:contact/:date',validateSession, function(req, res) {
    jsonDBFunctions.getUserContactProfileInfo(req.user.user_id,req.params.contact).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
});
app.post('/mygroup/myInfo',validateSession, function(req, res) {

    jsonDBFunctions.updateUserAddressInfo(req.user.user_id,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/registration.html"));
    })          
          
});

app.get('/mygroup/languageOptionAsJavaScript/:file',validateSession, function(req, res) {
    jsonDBFunctions.getUserLanguagePrefTranslateDB(req.user.user_id).then( function(data) {
        res.send(data); 
    })
});


app.get('/mygroup/languageOption/:date',validateSession, function(req, res) {
    jsonDBFunctions.getUserLanguagePref(req.user.user_id).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
});
app.post('/mygroup/languageOption',validateSession, function(req, res) {

    jsonDBFunctions.updateUserLanguagePref(req.user.user_id,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/registration.html"));
    })          
          
});

app.get('/mygroup/socialExposure/:date',validateSession, function(req, res) {
    jsonDBFunctions.getUserSocialExposure(req.user.user_id).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
});
app.get('/mygroup/socialExposure/:contact/:date',validateSession, function(req, res) {
    jsonDBFunctions.getContactSocialExposure(req.user.user_id,req.params.contact).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
});
app.post('/mygroup/socialExposure',validateSession, function(req, res) {
    jsonDBFunctions.updateUserSocialExposure(req.user.user_id,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/registration.html"));
    })          

});

app.get('/mygroup/medicalHistory/:date',validateSession, function(req, res) {
    jsonDBFunctions.getUserMedicalHistory(req.user.user_id).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
});
app.get('/mygroup/medicalHistory/:contact/:date',validateSession, function(req, res) {
    jsonDBFunctions.getContactMedicalHistory(req.user.user_id,req.params.contact).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
});

app.post('/mygroup/medicalHistory',validateSession, function(req, res) {

    jsonDBFunctions.updateUserMedicalHistory(req.user.user_id,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/fightCorona.html"));
    })          

});


app.get('/mygroup/myfamily/:date',validateSession, function(req, res) {
    jsonDBFunctions.getUserFamilyInfo(req.user.user_id).then( function(data) {
        res.send(JSON.stringify(data)); 
    })
 
});

app.get('/mygroup/myFamilyList/:date',validateSession, function(req, res) {
    jsonDBFunctions.getUserFamilyInfo(req.user.user_id).then( function(data) {
        let myResp=[]
        try{
            if(data!=undefined)
                data.forEach((value, index, array) => {
                    myResp.push({
                        "id":data[index].name+"-"+data[index].relationship,
                        "value":data[index].name+"-"+data[index].relationship
                    })
                });
        }
        catch(e){}
                console.log(myResp)

        res.send(JSON.stringify(myResp)); 
    })
 
});
app.put('/mygroup/myfamily/:date',validateSession, function(req, res) {
    const uuid=uuidv4();
    jsonDBFunctions.updateUserFamilyInfo(req.user.user_id,uuid,req.body).then( function(data) {
        //res.sendFile((__dirname+"/static/html/familyDtl.html"));
        res.send();
    })          

});
app.delete('/mygroup/myfamily/:date',validateSession, function(req, res) {
    const uuid=uuidv4();
    jsonDBFunctions.deleteUserFamilyInfo(req.user.user_id,uuid,req.body).then( function(data) {
        //res.sendFile((__dirname+"/static/html/familyDtl.html"));
        res.send();
    })          

});

app.post('/mygroup/myfamily/',validateSession, function(req, res) {

    const uuid=uuidv4();
    jsonDBFunctions.updateUserFamilyInfo(req.user.user_id,uuid,req.body).then( function(data) {
        //res.sendFile((__dirname+"/static/html/familyDtl.html"));
        res.send();
    })          

});
app.post('/mygroup/myfamilyV2/',validateSession, function(req, res) {

    const uuid=uuidv4();
    jsonDBFunctions.updateUserFamilyInfo(req.user.user_id,uuid,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/registration.html"));
        //res.send();
    })          

});

app.put('/mygroup/dailyReadingInfo/:date',validateSession, function(req, res) {

    jsonDBFunctions.updateDailyReadingInfo(req.user.user_id,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/registration.html"));
        //res.send();
    })          

});
app.post('/mygroup/dailyReadingInfo/',validateSession, function(req, res) {
    console.log(req.body)
    jsonDBFunctions.updateDailyReadingInfo(req.user.user_id,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/registration.html"));
        //res.send();
    })          

});



app.get('/mygroup/dailyReadingInfo/:date',validateSession, function(req, res) {
    jsonDBFunctions.getDailyReadingInfo(req.user.user_id).then( function(data) {
        res.send(JSON.stringify(data)); 
    })

});

app.post('/mygroup/dailyReadingInfo/:date',validateSession, function(req, res) {
    jsonDBFunctions.updateDailyReadingInfo(req.user.user_id,req.body).then( function(data) {
        res.sendFile((__dirname+"/static/html/registration.html"));
    })   
});

app.get('/mygroup/myFamilyInfo',validateSession, function(req, res) {
  res.sendFile((__dirname+"/static/html/familyDtl.html"));
});
app.get('/mygroup/myFamilyInfoV2',validateSession, function(req, res) {
  res.sendFile((__dirname+"/static/html/familyDtlV2.html"));
});
app.get('/mygroup/fightCorona',validateSession, function(req, res) {
  res.sendFile((__dirname+"/static/html/registration.html"));
});
app.get('/mygroup/myfamilyV2',validateSession, function(req, res) {
  res.sendFile((__dirname+"/static/html/registration.html"));
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
