const db = require("../models");
const AddressBook = db.addressbook;
const company = db.company;
const company_structure = db.company_structure;
const Op = db.Sequelize.Op;
const uploadFile = require("../middleware/upload");
const fs = require("fs");
const rimraf = require("rimraf");

exports.create = async(req, res) => {
  try {
    let dir = _basedir + "/media/image/";
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir);

      console.log("Folder Created Successfully!");
    }
    await uploadFile(req, res);
    const person = {
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      company_id: req.body.company_id !== "" ? req.body.company_id : null,
      company_str_id: req.body.company_str_id !== "" ? req.body.company_str_id : null,
      position: req.body.position,
      address: req.body.address,
      mobile_phone: req.body.mobile_phone,
      work_phone: req.body.work_phone,
      fax: req.body.fax,
      email: req.body.email,
      email2: req.body.email2,
      homepage: req.body.homepage,
      birth_date: req.body.birth_date,
      uid: req.body.uid,
      img: typeof req.file !== "undefined" ? req.file.filename : "",
    };
    AddressBook.create(person)
      .then(() => {
        AddressBook.findAll({
          order: [["first_name", "ASC"]],
          include: [
            {
              model: company,
            },
            {
              model: company_structure,
            },
          ],
        })
          .then(data => {
            res.send({ message: "Entry was created successfully!", data: data });
          });
      })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occured while crating the Entry.",
          });
        });
  }
  catch(err) {
    res.json({ message: err.message });
  };
};

exports.findAll = (req, res) => {
  AddressBook.findAll({
    order: [["first_name", "ASC"]],
    include: [
      {
        model: company,
      },
      {
        model: company_structure,
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error ccured while retrieving Entries",
        });
      });
};

exports.findAllByCompany = (req, res) => {
	const id = req.params.id;

	AddressBook.findAll({
		where: { company_id: id },
		order: [["first_name", "ASC"]],
		include: [
			{
				model: company,
			},
			{
				model: company_structure,
			},
		],
	})
		.then(data => {
			res.send(data);
		})
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving entries.",
        });
      });
};

exports.findAllbyCompanyStr = (req, res) => {
	const id = req.params.id;
	const com_id = req.body.company_id;

	AddressBook.findAll({
		where: { company_str_id: id, company_id: com_id },
		order: [["first_name", "ASC"]],
		include: [
			{
				model: company,
			},
			{
				model: company_structure,
			},
		],
	})
		.then(data => {
			res.send(data);
		})
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving entries.",
        });
      });
};

exports.findOne = (req, res) => {
	// const id = req.params.id;
	// Addressbook.findByPk(id)
	// 	.then(data => {
	// 		res.send([data]);
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({ message: "Error retrieving Entry with id=" + id });
	// 	});
};

exports.update = async(req, res) => {
  const id = req.params.id;

  await uploadFile(req, res);

  const person = {
    first_name: req.body.first_name,
		middle_name: req.body.middle_name,
		last_name: req.body.last_name,
		company_id: req.body.company_id !== "" ? req.body.company_id : null,
		company_str_id:	req.body.company_str_id !== "" ? req.body.company_str_id : null,
		position: req.body.position,
		address: req.body.address,
		mobile_phone: req.body.mobile_phone,
		work_phone: req.body.work_phone,
		fax: req.body.fax,
		email: req.body.email,
		email2: req.body.email2,
		homepage: req.body.homepage,
		birth_date: req.body.birth_date !== "" ? req.body.birth_date : null,
		uid: req.body.uid,
		img: typeof req.file !== "undefined" ? req.file.filename : "",
  };

  AddressBook.findByPk(id)
    .then(data => {
      let dir = __basedir + "/media/image/" + data.uid;

      const exists = fs.existsSync(dir);

      if (exists) {
        console.log("Folder is exsist");
        rimraf(dir, function () {
          console.log("Folder is deleted");
        });
      }
      AddressBook.update(person, {
        where: { id: id },
      })
        .then(num => {
          if (num == 1) {
            AddressBook.findAll({
              order: [["first_name", "ASC"]],
              include: [
                {
                  model: company,
                },
                {
                  model: company_structure,
                },
              ],
            })
              .then(data => {
                res.send({ message: "Entry was updated successfully.", data });
              });
          } 
          else {
            res.send({
              message: `Cannot update Entry with id=${id}. Maybe Entry was not found or req.body is empty!`,
            });
          }
        })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Error updating Entry with id=" + id });
          });
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Entry with id=" + id });
    });
};

exports.delete = (req, res) => {
	const id = req.params.id;
	AddressBook.findByPk(id)
		.then(data => {
			let dir = __basedir + "/media/image/" + data.uid;

			const exists = fs.existsSync(dir);

			if (exists) {
				rimraf(dir, function () {
					console.log("Folder is deleted");
				});
			}
			AddressBook.destroy({ where: { id: id } })
				.then(num => {
					if (num == 1) {
						AddressBook.findAll({
							order: [["first_name", "ASC"]],
							include: [
								{
									model: company,
								},
								{
									model: company_structure,
								},
							],
						})
							.then(data => {
								res.send({ message: "Entry was deleted successfully!", data });
							})
                .catch(err => {
                  res.status(500).send({
                    message:
                      err.message || "Some error ccured while retrieving Entries",
                  });
                });
					}
          else {
						res.send({
							message: `Cannot delete Entry with id=${id} from Database. Maybe Entry was not found!`,
						});
					}
				})
          .catch(err => {
            res
              .status(500)
              .send({ message: "Could not delete  Entry with id=" + id });
          });
		})
      .catch(err => {
        res.status(500).send({ message: "Error retrieving Entry with id=" + id });
      });
};

exports.deleteAll = (req, res) => {
	AddressBook.destroy({
		where: {},
		truncate: false,
	})
		.then(nums => {
			let dir = __basedir + "/media/image/";
			fs.rmdir(dir, { recursive: true }, err => {
				if (err) {
					throw err;
				}
				console.log(`${dir} is deleted!`);
			});
			res.send({ message: `${nums} Entries were deleted successfully!` });
		})
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all entries.",
        });
      });
};