const multer = require("multer");
const upload = multer();

module.exports = app => {
  const address_book = require("../controllers/address_book.controller");

  var router = require("express").Router();

  router.post("/", address_book.create);

  router.get("/", address_book.findAll);

  router.get("/company/:id", address_book.findAllByCompany);

  router.post("/company_str/:id", address_book.findAllbyCompanyStr);

  router.get("/:id", address_book.findOne);

  router.put("/:id", address_book.update);

  router.delete("/:id", address_book.delete);

  router.delete("/", address_book.deleteAll);

  app.use("/api/address_book", router);
};