var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/insertimage", function(req, res) {
    db.Image.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // TESTING PURPOSES
  app.get("/api/images", function(req, res) {
    db.Image.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/insertComment", function(req, res) {
    db.Comment.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
