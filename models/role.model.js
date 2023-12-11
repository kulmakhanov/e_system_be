module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define("roles", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
		},
	});

	Role.associate = models => {
		Role.belongsToMany(models.user, {
			through: "user_roles",
			foreignKey: "roleId",
		});
	};

	return Role;
};