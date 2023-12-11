const db = require("../models");
const company = db.company;
const company_structure = db.company_structure;
const add_cstr = db.add_cstr;
const { Sequelize, DATE } = require("sequelize");

exports.create = (req, res) => {
  company.create({
    name: req.body.name,
    company_sort_id: req.body.sort_id,
    short_unique_id: req.body.uid,
  })
    .then(() => {
      company.findAll({
        attributes: [
          "id",
          "name",
          "company_sort_id",
          "short_unique_id",
          [
            Sequelize.col("cstr->add_cstrs.structure_sort_id"),
            "cstr_structure_sort_id",
          ],
        ],
        include: [
          {
            model: company_structure,
            as: "cstr",
            required: false,
            through: {
              attributes: [],
            },
            include: [
              {
                model: add_cstr,
                as: "add_cstrs",
                attributes: [
                  "structure_sort_id",
                  "structure_unique_id",
                ],
              },
            ],
          },
        ],
        order: [
          [Sequelize.col("company_sort_id"), "ASC"],
          [Sequelize.col("cstr->add_cstrs.structure_sort_id"), "ASC"],
        ],
      })
        .then(data => {
          res.send({
            data: data,
            message: "Company was added successfully!",
          });
        })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Some error ccured while retrieving Entries",
            });
          });
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Entries.",
        });
      });
};

exports.createStrCom = (req, res) => {
  try {
    add_cstr.create({
      company_id: req.body.id_com,
      company_str_id: req.body.id_str,
      structure_unique_id: req.body.uid,
      structure_sort_id: 0,
    })
      .then(() => {
        company.findAll({
          attributes: [
            "id",
            "name",
            "company_sort_id",
            "short_unique_id",
            [
              Sequelize.col("cstr->add_cstrs.structure_sort_id"),
              "cstr.structure_sort_id",
            ],
          ],
          include: [
            {
              model: company_structure,
              as: "cstr",
              required: false,
              through: { attributes: [], },
              include: [
                {
                  model: add_cstr,
                  as: "add_cstrs",
                  attributes: [
                    "structure_sort_id",
                    "structure_unique_id"
                  ],
                },
              ],
            },
          ],
          order: [
            [Sequelize.col("company_sort_id"), "ASC"],
            [Sequelize.col("cstr->add_cstrs.structure_sort_uid"), "ASC"],
          ],
        })
          .then(data => {
            res.send({
              data: data,
              message: "Entry was successfuly added!",
            });
          })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Some error ccured while retrieving Entries",
              });
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
  company.findAll({
    attributes: [
      "id",
      "name",
      "company_sort_id",
      "short_unique_id",
      [
        Sequelize.col("cstr->add_cstrs.structure_sort_id"),
        "cstr.structure_sort_id",
      ],
      [
        Sequelize.col("cstr->add_cstrs.structure_unique_id"),
        "cstr.structure_unique_id",
      ],
    ],
    include: [
      {
        model: company_structure,
        as: "cstr",
        required: false,
        through: { attributes: [] },
        include: [
          {
            model: add_cstr,
            as: "add_cstrs",
            attributes: [
              "structure_sort_id",
              "structure_unique_id",
            ],
          },
        ],
      },
    ],
    order: [
      [Sequelize.col("company_sort_id"), "ASC"],
      [Sequelize.col("cstr->add_cstrs.structure_sort_id"), "ASC"],
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

exports.findOne = (req, res) => {
  const id = req.params.id;
  company.findOne({
    where: { id: id },
    include: [
      {
        model: company_structure,
        as: "cstr",
        attributes: ["id", "str_name"],
        through: { attributes: [] },
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error retrieving Entry with id = " + id,
        });
      });
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body.items;

    if(!Array.isArray(data) || data.length === 0) {
      return res.status(400).send({
        message: "Invalid or empty data array.",
      });
    }
    const promises = [];

    if(parseInt(id) === 0) {
      for(let i = 0; i < data.length; i++) {
        const updatePromise = company.update(
          { company_sort_id: parseInt(data[i].company_sort_id) },
          { where: { id: data[i].id } },
        );
        promises.push(updatePromise);
      }
    }
    else {
      console.log(id);
      console.log(data);
      console.log("OK");
      for(let i = 0; i < data.length; i++) {
        const updatePromise = add_cstr.update(
          { structure_sort_id: parseFloat(data[i].structure_sort_id) },
          { where: { company_id: id, company_str_id: data[i].id } },
        );
        promises.push(updatePromise);
      }
    }
    Promise.all(promises).then(results => {
      if(results.length > 0) {
        company.findAll({
          attributes: [
            "id",
            "name",
            "company_sort_id",
            "short_unique_id",
            [
              Sequelize.col("cstr->add_cstrs.structure_sort_id"),
              "cstr.structure_sort_id",
            ],
          ],
          include: [
            {
              model: company_structure,
              as: "cstr",
              required: false,
              through: { attributes: [], },
              include: [
                {
                  model: add_cstr,
                  as: "add_cstrs",
                  attributes: ["structure_sort_id"],
                },
              ],
            },
          ],
          order: [
            [Sequelize.col("company_sort_id"), "ASC"],
            [Sequelize.col("cstr->add_cstrs.structure_sort_id"), "ASC"],
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
      }
      else {
        res.send({
          message: "No entries were updated. Maybe data is empty or no matching records found.",
        });
      }
    });
  }
  catch(err) {
    res.status(500).send({
      message: err.message || "Error retrieving Entry with id = " + id,
    });
  }
};

exports.deleteStrCom = (req, res) => {
  const id_com = req.params.id;
  const id_str = req.body.ids;
  add_cstr.destroy({
    where: { company_id: id_com, company_str_id: id_str }
  })
    .then(num => {
      if(num === 1) {
        company.findAll({
          attributes: [
            "id",
            "name",
            "company_sort_id",
            "short_unique_id",
            [
              Sequelize.col("cstr->add_cstrs.structure_sort_id"),
              "cstr.structure_sort_id",
            ],
          ],
          include: [
            {
              model: company_structure,
              as: "cstr",
              required: false,
              through: { attributes: [] },
              include: [
                {
                  model: add_cstr,
                  as: "add_cstrs",
                  attributes: ["structure_sort_id"],
                },
              ],
            },
          ],
          order: [
            [Sequelize.col("company_sort_id"), "ASC"],
            [Sequelize.col("cstr->add_cstrs.structure_sort_id"), "ASC"],
          ],
        })
          .then(data => {
            res.send({
              data: data,
              message: "Entry was deleted!",
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
          message: `Cannot delete Entry with id = ${id_str}. Maybe Entry was not found!`,
        });
      }
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Could not delete  Entry with id = " + id,
        });
      });
};

exports.deleteAllStrCom = (req, res) => {
  const id_com = req.params.id;
  add_cstr.destroy({
    where: { company_id: id_com },
  })
    .then(num => {
      console.log(num);
      if(num >= 1) {
        company.findAll({
          attributes: [
            "id",
            "name",
            "company_sort_id",
            "short_unique_id",
            [
              Sequelize.col("cstr->add_cstrs.structure_sort_id"),
              "cstr.structure_sort_id",
            ],
          ],
          include: [
            {
              model: company_structure,
              as: "cstr",
              required: false,
              through: { attributes: [], },
              include: [
                {
                  model: add_cstr,
                  as: "add_cstrs",
                  attributes: ["structure_sort_id"],
                },
              ],
            },
          ],
          order: [
            [Sequelize.col("company_sort_id"), "ASC"],
            [Sequelize.col("cstr->add_cstrs.structure_sort_id"), "ASC"],
          ],
        })
          .then(data => {
            res.send({
              data: data,
              message: "All structure was deleted!",
            });
          })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Some error ccured while retrieving Entries"
              });
            });
      }
      else {
        res.send({
          message: `Cannot delete Entry with id = ${id_com}. Maybe Entry was not found!`,
        });
      }
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all entries.",
        });
      });
};

exports.deleteAll = (req, res) => {
  company.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.send({ message: `${nums} Entries were deleted successfully!` })
    })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all entries.",
        });
      });
};