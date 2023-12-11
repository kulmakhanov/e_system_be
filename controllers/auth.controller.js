const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const company = db.company;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  console.log(req.body);

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    company_id: req.body.company_id,
  })
    .then(user => {
      Role.findAll({
        where: {
          id: req.body.role_id,
        },
      })
        .then(roles => {
          user.setRoles(roles).then(() => {
            User.findAll({
              include: [
                {
                  model: Role,
                  attributes: ["name"],
                  through: {
                    attributes: [],
                  },
                },
                {
                  model: company,
                  attributes: ["name"],
                },
              ],
            })
              .then(user => {
                res.send({
                  message: "User was reqistered successfully!",
                  data: user,
                });
              });
          });
        });
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if(!user) {
        return res.status(404).send({ message: "User not found" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if(!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for(let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name.toUpperCase());
        }
        user.getCompany().then(company => {
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            company: { id: company.id, name: company.name },
            roles: authorities,
            accessToken: token,
          });
        });
      });
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};