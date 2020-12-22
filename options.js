function saveOptions() {
    var streamtoolsapikey = document.getElementById("streamtoolsapikey").value;
    var widgetid = document.getElementById("widgetid").value;
    var widgettype = document.getElementById("widgettype").value;

    chrome.storage.sync.set({widgetid: widgetid, widgettype: widgettype}, function() {
        chrome.storage.local.set({streamtoolsapikey: streamtoolsapikey}, function() {
            var msg = document.getElementById("message");
            msg.textContent = "Guardado con éxito";

            setTimeout(function() {
                msg.textContent = '';
            }, 2000);
        });
    });
}

function loadOptions()
{
    chrome.storage.sync.get("widgetid", function(result) {
        document.getElementById("widgetid").value = result.widgetid || '';
    });

    chrome.storage.sync.get("widgettype", function(result) {
        document.getElementById("widgettype").value = result.widgettype || '';
    });

    chrome.storage.local.get("streamtoolsapikey", function(result) {
        document.getElementById("streamtoolsapikey").value = result.streamtoolsapikey || '';
    });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);