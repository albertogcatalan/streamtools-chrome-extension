function showAlert()
{
    chrome.storage.sync.get(['message'], function(result) {
        chrome.notifications.create(
            {
                title: "Mi notificación",
                message: result.message,
                type: 'basic',
                iconUrl: "../images/get_started128.png"
            }
        );
    });
}

document.getElementById('helloWorldButton').addEventListener('click', showAlert);