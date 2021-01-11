async function launchAPI(widgettype, widgetid)
{
   var local_apikey = await getLocalStorageValue("streamtoolsapikey");

   if (local_apikey.streamtoolsapikey && widgettype && widgetid) {
        var list = '';
        if (widgettype == 'randomnamepicker') {
            list = $("textarea#list").val();
        }
       var url = apiURL+widgettype+"/"+widgetid+"/";
       var options = {
           "method": 'POST',
           "headers": {
               "X-API-KEY": local_apikey.streamtoolsapikey,
               "content-type": "application/json"
           },
           "body": JSON.stringify({"action": "start", "list": list})
       };

       const response = callAPI(url, options)
       .then(function(json) {
           console.log(json);
           var msg = document.getElementById("message");
           msg.textContent = json.id+" "+json.action+"!";
           msg.classList.remove("d-none");
   
           setTimeout(function() {
               msg.textContent = '';
               msg.classList.add("d-none");
           }, 2000);
       }).catch(function(error) {
           console.log(error);
       });
   }
}

async function fetchData(widgettype)
{
    var local_apikey = await getLocalStorageValue("streamtoolsapikey");
   
   if (local_apikey.streamtoolsapikey && widgettype) {
       var url = apiURL+widgettype+"/";
       var options = {
           "method": 'GET',
           "headers": {
               "X-API-KEY": local_apikey.streamtoolsapikey,
               "content-type": "application/json"
           }
       };

       const response = callAPI(url, options)
       .then(function(json) {
           var list = $((".list-"+widgettype));
           list.empty();
           for (var i = 0; i < json.length; i++) {
               var widget = json[i];
               if (widget.slug) {
                    var newElement = $(document.createElement('a'));
                    newElement.attr("href", "#");
                    newElement.addClass("list-group-item list-group-item-action");
                    newElement.text(widget.slug+" - "+widget.title);
                    newElement.data("slug", widget.slug);
               } else {
                    var newElement = $(document.createElement('p'));
                    newElement.text("You do not have any tool created.");
               }
               newElement.appendTo(list);
           }

           $('.list-group-item').on('click', function(e) {
            e.preventDefault();
            var widgetid = $(this).data("slug");
            var widgettype = $(this).parent().parent().attr("id");
            launchAPI(widgettype, widgetid);
           });

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

const apiURL = "https://app.streamtools.com/webhook/";
$('#pills-tab a').on('click', function(e) {
    e.preventDefault();
    var link = $(this).attr('href');
    var widgettype = link.replace("#", '');
    fetchData(widgettype);
    $(this).tab('show');
});
$('#timer-tab').click();