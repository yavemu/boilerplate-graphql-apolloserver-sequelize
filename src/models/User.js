export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: 'El campo [Username] es requerido.',
          },
          isAlphanumeric: {
            args: true,
            msg: "El campo [Username] tiene solo permite letras o numeros."
          },
          len: {
            args: [6, 15],
            msg: "El campo [Username] debe tener entre 6 y 15 caracteres"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: false,
            msg: 'El campo [Email] es requerido.',
          },
          isEmail: {
            args: true,
            msg: 'El campo [Email] es requerido.',
          },
          isUnique(email, done) {
            User.findOne({ where: { email } }).then((user) => {
              if (user) {
                done(new Error('El campo [Email] ya existe.'));
              } else {
                done();
              }
            });
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: 'El campo [Password] es requerido.',
          }
        }
      },
    }
  );

  User.associate = models => {
    User.hasMany(models.Article,{
      foreignKey:{
        name:'authorId',
        field:'author_id'
      },
      as:'articles'
    })
  }

  return User;
}