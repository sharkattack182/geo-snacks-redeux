$(document).ready(function () {
  console.log("ready!");

  $.get("https://ipapi.co/json").then(function (response) {
    console.log(response);

    // setting lat and long for the search query
    var lat = response.latitude;
    var lon = response.longitude;

    // calling zomato api based only off the latitude and longitude at the moment
    $.ajax({
      headers: {
        "user-key": "8717f09646df7022f6022fc3d15f3584",
      },
      method: "GET",
      url:
        "https://developers.zomato.com/api/v2.1/cuisines?lat=" +
        lat +
        "&lon=" +
        lon,
    }).then(function (result) {
      console.log(result);
      // runs for loop over the resutls array then build and append a div for each result
      for (var i = 0; i < result.cuisines.length; i++) {
        var cuisine = result.cuisines[i];
        var squareEl = $("<button>");
        squareEl.text(cuisine.cuisine.cuisine_name);
        squareEl.attr("class", "col-lg-3 box " + cuisine.cuisine.cuisine_name);
        squareEl.data("cuisine-id", cuisine.cuisine.cuisine_id);
        if (i < 3) {
          $(".contain-items1").append(squareEl);
        } else if (i > 2 && i < 6) {
          $(".contain-items2").append(squareEl);
        } else if (i > 5 && i < 9) {
          $(".contain-items3").append(squareEl);
        } else {
          $(".contain-items4").append(squareEl);
        }
      }

      // on click function for the buttons
      $(".box").on("click", function (event) {
        console.log("you clicked a box");
        console.log($(this).data("cuisine-id"));
        var cuisineID = $(this).data("cuisine-id");
        $(".open-screen").css("display", "none");

        $.ajax({
          headers: {
            "user-key": "8717f09646df7022f6022fc3d15f3584",
          },
          method: "GET",
          url:
            "https://developers.zomato.com/api/v2.1/search?count=20&lat=" +
            lat +
            "&lon=" +
            lon +
            "&radius=40233.6&cuisines=" +
            cuisineID +
            "&sort=rating",
        }).then(function (res) {
          console.log(res);
          var newContainer = $("<div>");
          var newHeader = $("<h2>");
          newHeader.text("Here is what we found");
          newContainer.attr("class", "container results-display");
          newContainer.append(newHeader);
          $(".append-here").append(newContainer);

          // creating the needed rows to house the card-decks that will display the cards
          for (var i = 0; i < res.restaurants.length; i += 3) {
            var newRow = $("<div>");
            var newCD = $("<div>");
            var newCol = $("<div>");
            newRow.attr("class", "row row" + i);
            newCD.attr("class", "card-deck card-deck" + i);
            newCol.attr("class", "col-lg-12");
            newCol.append(newCD);
            newRow.append(newCol);
            $(".results-display").append(newRow);
          }

          for (var i = 0; i < res.restaurants.length; i++) {
            var restaurant = res.restaurants[i].restaurant;
            // creating the card
            console.log(restaurant.name);
            var newCard = $("<div>");
            newCard.attr("class", "card col-lg-3");
            // var cardImg = $("<img>");
            // cardImg.attr("src", restaurant.photos_url);
            // newCard.append(cardImg);

            // creating and appending card body
            var newCardBody = $("<div>");
            newCardBody.attr("class", "card-body");
            var newHeader = $("<h5>");
            newHeader.text(restaurant.name);
            var newDesc = $("<p>");
            newDesc.text(restaurant.location.address);
            var newTel = $("<p>");
            newTel.text(restaurant.phone_numbers);
            var newBtn = $("<button>");
            newBtn.attr("class", "btn btn-warning");
            newBtn.data("res-id", restaurant.id);
            newBtn.text("More Info");
            newCardBody.append(newHeader, newDesc, newTel, newBtn);
            newCard.append(newCardBody);

            var newCardFooter = $("<div>");
            newCardFooter.attr("class", "card-footer");
            var newFooterText = $("<small>");
            newFooterText.attr("class", "text-muted");
            newFooterText.text("updated 3 min ago");
            newCardFooter.append(newFooterText);
            newCard.append(newCardFooter);

            if (i < 3) {
              $(".card-deck0").append(newCard);
            } else if (i > 2 && i < 6) {
              $(".card-deck3").append(newCard);
            } else if (i > 5 && i < 9) {
              $(".card-deck6").append(newCard);
            } else if (i > 8 && i < 12) {
              $(".card-deck9").append(newCard);
            } else if (i > 11 && i < 15) {
              $(".card-deck12").append(newCard);
            } else if (i > 14 && i < 18) {
              $(".card-deck15").append(newCard);
            } else if (i > 17 && i < 21) {
              $(".card-deck18").append(newCard);
            } else if (i > 20 && i < 24) {
              $(".card-deck21").append(newCard);
            } else {
              $(".card-deck24").append(newCard);
            }
          }

          $(".btn").on("click", function () {
            console.log($(this).data("res-id"));
            var restaurantID = $(this).data("res-id");
            $.ajax({
              headers: {
                "user-key": "8717f09646df7022f6022fc3d15f3584",
              },
              method: "GET",
              url:
                "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
                restaurantID,
            }).then(function (r) {
              console.log(r);

                // runs an api to get reviews
                $.ajax({
                    headers: {
                      "user-key": "8717f09646df7022f6022fc3d15f3584",
                    },
                    method: "GET",
                    url:
                      "https://developers.zomato.com/api/v2.1/reviews?res_id=" +
                      restaurantID,
                  }).then(function (reviews) {
                    console.log(reviews);
                  })







              $(".results-display").css("display", "none");
              var newContainer = $("<div>");  
              newContainer.attr("class", "container restuarant-display");

              var newRow = $("<div>");
              newRow.attr("class", "row");
              var newColumn = $("<div>");
              newColumn.attr("class", "col-lg-8 white");
              var newHeader = $("<h2>");
              newHeader.text(r.name);

              var newAddress = $("<h4>");
              newAddress.text(r.location.address);
              var newPhone = $("<h4>");
              newPhone.text(r.phone_numbers);
              var newUserRating = $("<h4>");
              newUserRating.text("User Rating: ")

              newColumn.append(newHeader, newAddress, newPhone)
              newRow.append(newColumn);
              newContainer.append(newRow);
              $(".append-here").append(newContainer);
            });
          });
        });
      });
    });
  });
});
