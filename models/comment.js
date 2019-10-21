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
  return Comment;
};
