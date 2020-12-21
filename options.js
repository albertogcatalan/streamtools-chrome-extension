function guardar() {
    var color = document.getElementById("variableListado").value;
    var checkbox = document.getElementById("variableCheckbox").checked;

    chrome.storage.sync.set({color: color, checkbox: checkbox}, function() {
        var mensaje = document.getElementById("mensaje");
        mensaje.textContent = "Guardado con éxito";

        setTimeout(function() {
            mensaje.textContent = '';
        }, 2000);
    });
}

function cargar()
{
    chrome.storage.sync.get("color", function(result) {
        document.getElementById("variableListado").value = result.color;
    });

    chrome.storage.sync.get("checkbox", function(result) {
        document.getElementById("variableCheckbox").checked = result.checkbox;
    });
}

document.addEventListener('DOMContentLoaded', cargar);
document.getElementById('guardar').addEventListener('click', guardar);