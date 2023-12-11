const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  })

  app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.getAll);

  app.get("/api/admin-get-role", [authJwt.verifyToken, authJwt.isAdmin], controller.getRole);

  // app.get("/api/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.getById);

  app.put("/api/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  app.delete("/api/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
}