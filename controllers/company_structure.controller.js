const db = require("../models");
const company_structure = db.company_structure;

exports.create = (req, res) => {
  try {
    company_structure.create(req.body)
      .then(data => {
        res.send({
          message: "Entry was created successfully.",
          data: data,
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
  }
};

exports.findAll = (req, res) => {
  company_structure.findAll()
    .then(data => {
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error ccured while retrieving Entries",
        });
      });
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	company_structure.findPk(id)
		.then(data => {
			res.send(data);
		})
      .catch(err => {
        res.status(500).send({ message: "Error retrieving Entry with id = " + id });
      });
}

exports.update = (req, res) => {
  const id = req.params.id;
  company_structure.update(req.body, { where: { id: id }, })
    .then(num => {
      if(num === 1) {
        company_structure.findAll()
          .then(data => {
            res.send({
              data: data,
              message: "Entry was updated successfully."
            });
          })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Some error ccured while retrieving Entries",
              });
            });
      }
      else {
        res.send({
          message: `Cannot update Entry with id = ${id}. Maybe Company was not found or request body is empty!`
        });
      }
    })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Entry with id = " + id,
        });
      });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  company_structure.destroy({ where: { id: id } })
    .then(num => {
      if(num === 1) {
        company_structure.findAll()
          .then(data => {
            res.send({
              data: data,
              message: "Entry was deleted successfully!"
            });
          })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Some error ccured while retrieving Entries",
              });
            });
      }
      else {
        res.send({
          message: `Cannot delete Entry with id = ${id}. Maybe Entry was not found!`,
        });
      }
    })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete  Entry with id = " + id,
        });
      });
};

exports.deleteAll = (req, res) => {
	company_structure.destroy({
			where: {},
			truncate: false,
		})
      .then(nums => {
        res.send({ message: `${nums} Entries were deleted successfully!` });
      })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all entries.",
          });
		    });
};