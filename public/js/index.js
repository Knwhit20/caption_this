// $("#card").click(function () {
//   $(".modal").css("display", "block");
// });

$(document).on("click", ".card", function(event) {
  $(".modalImg").attr("src", $(this).find("img").attr('src'));
  $(".modal").css("display", "block");
});

$(".delete").click(function () {
  $(".modal").css("display", "none");
});

// create cards with image url using imageData
function createCard(imageData) {
  for (var i = 0; i < imageData.length; i++) {
    var card = $(`
    <div class="column is-one-third">
        <div class="card is-centered" id="card">
            <div class="card-image">
                <figure class=image is-3by2>
                    <img class="cardImg" src="` + imageData[i].url + `" alt="Placeholder image">
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

// Get images from database and then call createCard function
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
