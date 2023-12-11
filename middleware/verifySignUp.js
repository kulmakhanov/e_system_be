const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

exports.checkDuplicateUserNameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if(user) {
        res.status(400).send({
          message: "Failed! Username is already in use!",
        });
        return;
      }
      User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then(user => {
          if(user) {
            res.status(400).send({
              message: "Failed! Email is already in use!",
            });
            return;
          }
          next();
        });
    });
};

exports.checkRolesExisted = (req, res, next) => {
  console.log(req.body);

  if(req.body.roles) {
    for(let i = 0; i < req.body.roles.length; i++) {
      if(!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist (" + req.body.roles[i] + ")",
        });
        return;
      }
    }
  }
  next();
};