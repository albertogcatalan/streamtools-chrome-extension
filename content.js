console.log("Hola mundo desde la injection");

var image = new Image();
image.className = "mi-clase";
image.src = "https://i.picsum.photos/id/724/200/300.jpg?hmac=MwcEnqDDOgKg6U3WYPytBPH_jurNEK2_2kcknpgP6wg";

var container = document.getElementById("main-content");
container.appendChild(image);