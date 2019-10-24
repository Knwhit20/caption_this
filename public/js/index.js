$(document).on("click", ".card", function(event) {
  $(".modalImg").attr("src", $(this).find("img").attr('src'));
  $(".modal").css("display", "block");

  $(".textarea").attr('imageId', $(this).find("img").attr('data-id'));
});

$(".delete").click(function () {
  $(".modal").css("display", "none");
});

$("#cancel").click(function(){
  $(".modal").css("display", "none");
})

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// create cards with image url using images
function createCard(/** @type {Array} */ images) {
  for (var i = 0; i < images.length; i++) {

    var currentImage = images[i];
    console.log(currentImage);
    var randomInt = getRandomIntInclusive(0, currentImage.Comments.length - 1);
    var comment = currentImage.Comments[randomInt];
    console.log(comment)
   
   
    if (comment) {
      comment = comment.title;
    } else {
      comment = 'No comments yet!';
    }

    var card = $(`
    <div class="column is-one-third">
        <div class="card is-centered" id="card">
            <div class="card-image">
                <figure class=image is-3by2>
                    <img data-id="${currentImage.id}" class="cardImg" src="` + currentImage.url + `" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <p class="cardText">${comment}</p>
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


$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and category select
  var commentInput = $(".textarea");

  // Adding an event listener for when the form is submitted
  $("#save").click(function handleFormSubmit(event) {
    // Constructing a newComment object to hand to the database
    var newComment = {
      title: commentInput.val().trim(),
      ImageId: commentInput.attr('imageid'),
    };
    submitComment(newComment);
    console.log(newComment);

    console.log($(this).children());

    //does not work yet
    $(this).find(".cardText").text(newComment.title);

    //currently works, updates all the cards,
    $(".cardText").text(newComment.title);

    $(".modal").css("display", "none");
    

    //posts comment to the database
    function submitComment(data) {
      $.post("/api/insertComment", newComment, function() {
        console.log(data);
        window.location.reload();
      });
    }
  });
  
});
