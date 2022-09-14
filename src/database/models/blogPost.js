module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
      },
    },
    {
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts',
    }
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    // BlogPost.belongsToMany(models.Category, {
    //   through: 'PostCategory',
    //   foreignKey: 'postId',
    // })
  };

  return BlogPost;
};