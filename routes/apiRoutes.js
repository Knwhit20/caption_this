var db = require("../models");

module.exports = function(app) {
  // Adds image to the database
  app.post("/api/insertimage", function(req, res) {
    db.Image.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // TESTING PURPOSES
  app.get("/api/images", function(req, res) {
    db.Image.findAll({
      /**
       * The `include` clause below will make sure that each image in `imageArray`
       * contains a field called `Comments`. This will include each comment in the
       * database associated with that image.
       * @todo Make the `Comments` field lowercase to match the other fields.
       * This might be possible using the `as` key within the `include` configuration.
       */
      include: {
        model: db.Comment
      }
    }).then(function(imageArray) {
      res.json(imageArray);
    });
  });

  app.post("/api/insertComment", function(req, res) {
    db.Comment.create(req.body).then(function(data) {
      res.json(data);
    });
  });
};
