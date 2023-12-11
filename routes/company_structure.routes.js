module.exports = app => {
  const company_structure = require("../controllers/company_structure.controller");

  var router = require("express").Router();

  router.post("/", company_structure.create);

  router.get("/", company_structure.findAll);

  router.get("/:id", company_structure.findOne);

  router.put("/:id", company_structure.update);

  router.delete("/:id", company_structure.delete);

  router.delete("/", company_structure.deleteAll);

  app.use("/api/company_structure", router);
};