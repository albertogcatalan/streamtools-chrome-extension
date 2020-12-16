chrome.runtime.onInstalled.addListener(function() {
    let value = "Hola mundo";
    chrome.storage.sync.set({message: value}, function() {
        console.log('Nuestra variable es ' + value);
    });
});