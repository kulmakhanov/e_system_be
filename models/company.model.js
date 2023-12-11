module.exports = (sequelize, Sequelize) => {
	const Company = sequelize.define("company", {
		name: { type: Sequelize.STRING },
		company_sort_id: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		},
		short_unique_id: {
			type: Sequelize.STRING,
		},
	});

	Company.associate = models => {
		Company.belongsToMany(models.company_structure, {
			foreignKey: "company_id",
			through: "add_cstrs",
			as: "cstr",
		});
	};

	return Company;
};