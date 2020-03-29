const HttpsProxyAgent = require('https-proxy-agent')
const tunnel= require('tunnel');
const uuidv4=require('uuid').v4;


var instanceConfig = require('config');

var config = {};

/**********************************************************************************************************
Standard configuration starts from here.
Unblock based on requirement.
While starting docker, set NODE_ENV=<name>

 -e NODE_ENV=devInstance 
 
Config module will read from <name>.json
***********************************************************************************************************/



if (!instanceConfig.has("redisInfo.CLUSTER_DETAILS")) {
    // We are running locally; fix up the location of the config directory and re-intialize config
    process.env.NODE_CONFIG_DIR = "./config";
    delete require.cache[require.resolve('config')];
    instanceConfig = require('config');
}
config.googleAPIInfo={}
config.argon2={}
config.googleAPIInfo=(Object.assign(config.googleAPIInfo,instanceConfig.get("googleAPIInfo")))
config.argon2=(Object.assign(config.argon2,instanceConfig.get("argon2")))
config.downloadDirName="files";
config=(Object.assign(config,instanceConfig.get("stdCnnfig")))
config.axiosProxyOption={}


/*
 * If Proxy is configured, we will set it here.
 */
if (instanceConfig.has("HttpsProxyAgent")) {
    let proxyHost=instanceConfig.get("HttpsProxyAgent.proxyHost")
    let proxyPort=instanceConfig.get("HttpsProxyAgent.proxyPort")
    config.agent = tunnel.httpsOverHttp({
        proxy: {
                host: proxyHost,
                        port: proxyPort,
                            },
                            });
    config.axiosProxyOption.httpsAgent=config.agent
    config.axiosProxyOption.proxy=false
}


module.exports = config;
