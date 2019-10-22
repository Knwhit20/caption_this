// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// $("#card").click(function () {
//   $(".modal").css("display", "block");
// });

$(document).on("click", function(event) {
  var clicked = event;
  console.log($(this));
});

$(".delete").click(function () {
  $(".modal").css("display", "none");
});

// create cards with image url using imageData
function createCard(imageData) {
  for (var i = 0; i < imageData.length; i++) {
    var card = $(`
    <div class="column">
        <div class="card is-centered" id="card">
            <div class="card-image">
                <figure class=image is-3by2>
                    <img width="25" src="` + imageData[i].url + `" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
        </div>
    </div>
    `);
    $(".cardDiv").append(card);
  }
}

function getImages() {
  $.ajax({
    url: "/api/images",
    method: "GET"
  }).then(createCard);
}

getImages();
// $("#save").click(function(e) {
//   $(".textarea")
// });

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
// $("#save").click(function(){
//   console.log('clicked');
// })

$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and category select
  var commentInput = $(".textarea");

  // Adding an event listener for when the form is submitted
  $("#save").click(function handleFormSubmit(event) {
    event.preventDefault();
    // Constructing a newComment object to hand to the database
    var newComment = {
      title: commentInput.val().trim()
    };

    console.log(newComment);

    function submitComment(data) {
      $.post("/api/insertComment", newComment, function() {
        console.log(data);
      });
    }
    submitComment();
  });
});
