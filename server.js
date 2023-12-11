require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const initial = require("./initial");

app.use(cors());

app.use(express.json());
app.use(express.static("media"));
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// Изменение с удалением
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and Resync Db");
// 	initial();
// });

//Изменение без удаления
// db.sequelize.sync({ alter: true }).then(() => {
// 	console.log("Soft change and Resync Db");
// });

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
	res.json({ message: `Server is working on port ${PORT}.` });
});

require("./routes/address_book.routes.js")(app);
require("./routes/auth.routes.js")(app);
require("./routes/company.routes.js")(app);
require("./routes/company_structure.routes.js")(app);
require("./routes/user.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// const start = a sync() => {
//   try {
//     await db.sequelize.authenticate()
//     await db.sequelize.sync()
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${ PORT }.`);
//     });
//   }
//   catch (e) {
//     console.log(e)
//   }
// }

// start();
