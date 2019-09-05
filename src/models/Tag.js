export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: false,
            msg: 'El campo [Name] es requerido.',
          }
        }
      },
    }
  );

  return Tag;
}