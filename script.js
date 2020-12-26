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
        for (var i = 0; i < result.cuisines.length; i++) {
            var cuisine = result.cuisines[i];
            var squareEl = $("<div>");
            squareEl.text(cuisine.cuisine.cuisine_name);
            squareEl.attr("class", "col-lg-3 box " + cuisine.cuisine.cuisine_name);
            if(i < 3) {
                $(".contain-items1").append(squareEl)
            } else if(i > 2 && i < 6) {
                $(".contain-items2").append(squareEl)
            }  else if(i > 5 && i < 9) {
                $(".contain-items3").append(squareEl)
            } else {
                $(".contain-items4").append(squareEl)
            }
            
        }
    })


    })
})