module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Comment.associate = function(models) {
    // We're saying that a comment should belong to an image
    Comment.belongsTo(models.Image, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Comment;
};
