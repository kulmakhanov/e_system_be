module.exports = (sequelize, Sequelize) => {
  const Add_cstr = sequelize.define("add_cstrs", {
		company_str_id: {
			type: Sequelize.INTEGER,
		},
		company_id: {
			type: Sequelize.INTEGER,
		},
		structure_sort_id: {
			type: Sequelize.FLOAT,
		},
		structure_unique_id: {
			type: Sequelize.STRING,
		},
	});

	Add_cstr.associate = models => {
		Add_cstr.belongsTo(models.company_structure, {
			foreignKey: "company_str_id",
			as: "company",
		});
		Add_cstr.belongsTo(models.company, {
			foreignKey: "company_id",
			as: "cstr",
		});
	};

	return Add_cstr;
};