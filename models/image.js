module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    url: DataTypes.STRING
  });

  Image.associate = function(models) {
    // Associating Image with Comments
    Image.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };

  return Image;
};
