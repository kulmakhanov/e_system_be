const dbConfig = require("../config/db.config");
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.addressbook = require("./address_book.model.js")(sequelize, Sequelize);
db.company_structure = require("./company_structure.model")(sequelize, Sequelize);
db.company = require("./company.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.add_cstr = require("./add_cstr.model")(sequelize, Sequelize);
db.user_role = require("./user_role.model")(sequelize, Sequelize);

db.ROLES = ["admin", "moderator"];

Object.keys(db).forEach(model => {
  if(db[model].associate) {
    db[model].associate(db);
  }
});

module.exports = db;
