module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    url: DataTypes.STRING
  });
  return Image;
};
