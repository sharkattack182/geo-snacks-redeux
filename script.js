$( document ).ready(function() {
    console.log( "ready!" );

    $.get("https://ipapi.co/json").then(function (response) {
        console.log(response);

        // setting lat and long for the search query
        var lat = response.latitude;
        var lon = response.longitude;

        // calling zomato api based only off the latitude and longitude at the moment
        $.ajax({
            headers: {
            "user-key": "8717f09646df7022f6022fc3d15f3584"
        },
        method: "GET",
        url: "https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lon
    }).then(function(result) {
        console.log(result)
    })


    })
})