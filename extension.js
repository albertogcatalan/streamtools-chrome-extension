async function launchAPI()
{
   var local_apikey = await getLocalStorageValue("streamtoolsapikey");
   console.log(local_apikey);
   var sync_id = await getSyncStorageValue("widgetid");
   console.log(sync_id);
   var sync_type = await getSyncStorageValue("widgettype");
   console.log(sync_type);
   
   //lanzar api
   if (local_apikey.streamtoolsapikey && sync_id.widgetid && sync_type.widgettype) {
       // funcion api con fetch
       var url = "https://app.streamtools.com/webhook/"+sync_type.widgettype+"/"+sync_id.widgetid+"/";
       var options = {
           "method": 'POST',
           "headers": {
               "X-API-KEY": local_apikey.streamtoolsapikey,
               "content-type": "application/json"
           },
           "body": JSON.stringify({"action": "start"})
       };

       const response = callAPI(url, options)
       .then(function(json) {
           console.log(json);
            var okText = document.createElement("span");
            okText.textContent = json.status;
            document.getElementById("message").appendChild(okText);
       }).catch(function(error) {
           console.log(error);
       });
   }
}

async function callAPI(url, options)
{
    let response = await fetch(url, options);
    let data = await response.json();
    
    return data;
}

async function getLocalStorageValue(key)
{
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(key, function (value) {
                resolve(value);
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function getSyncStorageValue(key)
{
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, function (value) {
                resolve(value);
            });
        } catch (error) {
            reject(error);
        }
    });
}

document.getElementById('helloWorldButton').addEventListener('click', launchAPI);