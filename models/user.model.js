module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("users", {
		username: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		company_id: {
			type: Sequelize.INTEGER,
		},
	});

	User.associate = models => {
		User.belongsTo(models.company, {
			foreignKey: "company_id",
		});
		User.belongsToMany(models.role, {
			through: "user_roles",
			foreignKey: "userId",
		});
	};

	return User;
};