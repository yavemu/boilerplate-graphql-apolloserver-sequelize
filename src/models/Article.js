export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: 'El campo [Title] es requerido.',
          }
        }
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: 'El campo [Body] es requerido.',
          }
        }
      },
      image: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
    }
  );

  Article.associate = models => {
    Article.hasMany(models.Tag, {
      foreignKey: {
        name: 'articleId',
        field: 'article_id'
      },
      as:'tags',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    Article.belongsTo(models.User, {
      foreignKey: {
        name: 'authorId',
        field: 'author_id'
      },
      as: 'author'
    })
  }

  return Article;
}