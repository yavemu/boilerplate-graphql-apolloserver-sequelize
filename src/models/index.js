import Sequelize from 'sequelize';
import path from 'path';
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../../', 'config', 'database.json'))[env];
let sequelize= '';

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    underscored: true,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: "postgres",
    define: {
      underscored: true,
    },
  });
}

let db = {
  User: sequelize.import('./User'),
  Article: sequelize.import('./Article'),
  Tag: sequelize.import('./Tag'),
};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db