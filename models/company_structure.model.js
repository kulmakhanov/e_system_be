module.exports = (sequelize, Sequelize) => {
	const Company_Structure = sequelize.define("company_structure", {
		str_name: {
			type: Sequelize.STRING,
		},
	});

	Company_Structure.associate = models => {
		Company_Structure.belongsToMany(models.company, {
			foreignKey: "company_str_id",
			through: "add_cstrs",
			as: "company",
		});
	};

	return Company_Structure;
};