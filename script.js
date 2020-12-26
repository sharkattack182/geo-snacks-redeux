$( document ).ready(function() {
    console.log( "ready!" );

    $.get("https://ipapi.co/json").then(function (response) {
        console.log(response);
    })
})