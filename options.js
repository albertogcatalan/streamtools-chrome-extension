function saveOptions() {
    var streamtoolsapikey = document.getElementById("streamtoolsapikey").value;
    chrome.storage.local.set({streamtoolsapikey: streamtoolsapikey}, function() {
        var msg = document.getElementById("message");
        msg.textContent = "Success!";
        msg.classList.remove("d-none");

        setTimeout(function() {
            msg.textContent = '';
            msg.classList.add("d-none");
        }, 2000);
    });
}

function loadOptions()
{
    chrome.storage.local.get("streamtoolsapikey", function(result) {
        document.getElementById("streamtoolsapikey").value = result.streamtoolsapikey || '';
    });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);