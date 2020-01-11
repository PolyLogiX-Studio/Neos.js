const fetch = require('node-fetch');
var bus //Event Bus Def

var CloudX = {Shared:{}}
var AccountType = {
    Normal:0,
    AgentSmith:1,
    BladeRunner:2,
    Gunter:3,
    Neuromancer:4,
    Architect:5,
    Curator:6,
    Level144:7,
    Level250:8,
    Anorak:9,
    END:10,
  }
class AssetMetadataRequest {
    constructor(){
        this.MAX_BATCH_SIZE = 32
    }
}
class AssetEntry{
    constructor(){
        
    }
}
class CloudXInterface {
    constructor() {
        this.SESSION_EXTEND_INTERVAL = 3600;
        this.CLOUDX_PRODUCTION_NEOS_API = "https://cloudx.azurewebsites.net/";
        this.CLOUDX_STAGING_NEOS_API = "https://cloudx-staging.azurewebsites.net/";
        this.CLOUDX_NEOS_BLOB = "https://cloudxstorage.blob.core.windows.net/";
        this.CLOUDX_NEOS_CDN = "https://cloudx.azureedge.net/";
        this.LOCAL_NEOS_API = "http://localhost:60612";
        this.LOCAL_NEOS_BLOB = "http://127.0.0.1:10000/devstoreaccount1/";
        this._currentUser;
        this._currentSession;
        this._currentAuthenticationHeader;
        this._lastSessionUpdate;
        this.CLOUD_ENDPOINT = 'Production'
    }
    get NEOS_API() {
        switch (this.CLOUD_ENDPOINT) {
            case 'Production':
                return this.CLOUDX_PRODUCTION_NEOS_API
            case 'Staging':
                return this.CLOUDX_STAGING_NEOS_API
            case 'Local':
                return this.LOCAL_NEOS_API
            default:
                console.error("Invalid Endpoint: " + this.CLOUD_ENDPOINT);
        }
    }
    get NEOS_BLOB() {
        switch (this.CLOUD_ENDPOINT) {
            case 'Production':
            case 'Staging':
                return this.CLOUDX_NEOS_BLOB
            case 'Local':
                return this.LOCAL_NEOS_BLOB
            default:
                console.error("Invalid Endpoint: " + this.CLOUD_ENDPOINT);
        }
    }
    get NEOS_ASSETS() { return this.NEOS_BLOB + 'assets/' }

}
module.exports = function () {
    return {
        CloudXInterface
    }
}