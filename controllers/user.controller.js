const db = require("../models");
const User = db.user;
const Role = db.role;
const company = db.company;

exports.getAll = (req, res) => {
  User.findAll({
    include: [
      {
        model: Role,
        attributes: ["name"],
        through: { attributes: [], },
      },
      {
        model: company,
        attributes: ["name"],
      },
    ],
  })
    .then(user => {
      res.send(user);
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occured while retrieving entries.",
        });
      });
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  User.update(
    { username: req.body.username, email: req.body.email },
    { where: { id: id }, }
  )
    .then(num => {
      // if (num == 1) {
			// 	User_role.update(
			// 		{ roleId: req.body.roleId },
			// 		{
			// 			where: { userId: id },
			// 		}
			// 	);
			// 	User.findAll({
			// 		include: [
			// 			{
			// 				model: Role,
			// 				attributes: ["name"],
			// 				through: {
			// 					attributes: [],
			// 				},
			// 			},
			// 		],
			// 	})
			// 		.then(data => {
			// 			res.send({
			// 				message: "Entry was updated successfully.",
			// 				data: data,
			// 			});
			// 		})
			// 		.catch(err => {
			// 			res.status(500).send({
			// 				message:
			// 					err.message || "Some error occurred while retrieving entries.",
			// 			});
			// 		});
			// } else {
			// 	res.send({
			// 		message: `Cannot update Entry with id=${id}. Maybe entry was not found or req.body is empty!`,
			// 	});
			// }
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error updating Entry with id = " + id,
        });
      });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id: id } })
    .then(num => {
      if(num == 1) {
        User.findAll({
          include: [
            {
              model: Role,
              attributes: ["name"],
              through: { attributes: [], },
            },
            {
              model: company,
              attributes: ["name"],
            },
          ],
        })
          .then(data => {
            res.send({
              message: "Entry was deleted successfully!",
              data: data,
            });
          })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Some error occured while retrieving entries.",
              });
            });
      }
        else {
          res.send({
            message: `Cannot delete User with id = ${ id }. Maybe User was not found`,
          });
        }
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occured  while removing all entries",
        });
      });
};

exports.getRole = (req, res) => {
  Role.findAll()
    .then(roles => {
      res.send(roles);
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving entries.",
        });
      });
};

