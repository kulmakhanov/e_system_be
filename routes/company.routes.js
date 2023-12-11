module.exports = app => {
  const company = require("../controllers/company.controller");

  var router = require("express").Router();

  router.post("/", company.create);

  router.post("/strcom", company.createStrCom);

  router.get("/", company.findAll);

  router.get("/:id", company.findOne);

  router.put("/:id", company.update);

  router.delete("/:id", company.deleteStrCom);

  router.delete("/all-str-com/:id", company.deleteAllStrCom);

  router.delete("/", company.deleteAll);

  app.use("/api/company", router);
};