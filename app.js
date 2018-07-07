console.log("This page is linked");

//array of strings
var topics = ["Surfing", "Swimming", "Fishing", "Diving", "Water Polo", "Running", "Yoga",
    "Pilates", "Cycling", "Water Skiing"];

function renderButtons() {

    $("#topics-view").empty();

    //loop through an array 
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");

        a.addClass("topic");

        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#topics-view").append(a);
    }
}

// Event listener for topic-button
$("#topics-view").on("click", ".topic", function () {

    console.log($(this));

    console.log($(this)[0].dataset.name)

    console.log($(this).data("name"));

    var searchItem = $(this)[0].dataset.name;

    //giphy api key
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=36UJ6KdRrSW69UaN9zhxeyDN5N3SmUeh&limit=10";

    //perform AJAX request for queryURL

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        console.log(response);

        var gifArray = response.data;

        for(var i = 0; i < gifArray.length; i++){
            var gifImg = $("<img>")

            gifImg.attr({
                "class": "gifImage",
                "data-still": gifArray[i].images.fixed_height_still.url,
                "data-animate": gifArray[i].images.fixed_height.url,
                "data-state": "still",
                "src": gifArray[i].images.fixed_height_still.url
            });

            $("#gifHolder").append(gifImg);
        }

    });
   
});


$(document).on("click", ".gifImage", function(){
    console.log($(this));

// the same: 
    // $(this)[0].dataset.state

    var currentState = $(this).data("state");

    console.log(currentState);

    if(currentState === "still"){

        console.log("if ran");
        // $(this).attr({
        //     "src": $(this).data('animate'),
        //     "data-state": "animate"
        // })

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

        console.log($(this).data("state"))
    } else {

        console.log("else ran")
        //  $(this).attr({
        //     "src": $(this).data('still'),
        //     "data-state": "still"
        // }) 

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    //to do: unable to find solution to stop animate
  
});

$("#add-topic").on("click", function (event) {

    event.preventDefault();

    var topic = $("#sport-input").val().trim();

    console.log(topic);

    topics.push(topic);

    $("#sport-input").val("");

    renderButtons();

});

renderButtons();



