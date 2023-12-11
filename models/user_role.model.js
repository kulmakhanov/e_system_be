module.exports = (sequelize, Sequelize) => {
	const User_role = sequelize.define("user_roles", {
		userId: {
			type: Sequelize.INTEGER,
		},
		roleId: {
			type: Sequelize.INTEGER,
		},
	});

	User_role.associate = models => {
		User_role.belongsTo(models.user, { foreignKey: "userId", as: "user" });
		User_role.belongsTo(models.role, { foreignKey: "roleId", as: "role" });
	};
	return User_role;
};