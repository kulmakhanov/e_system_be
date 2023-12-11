module.exports = (sequelize, Sequelize) => {
  const AddressBook = sequelize.define("address_book", {
    first_name: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    middle_name: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    last_name: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    company_id: {
			type: Sequelize.INTEGER,
			defaultValue: "1",
		},
    company_str_id: {
			type: Sequelize.INTEGER,
			defaultValue: "1",
		},
    position: {
			type: Sequelize.STRING,
			defaultValue: "",
		},
    address: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    mobile_phone: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    work_phone: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    fax: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    email: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    email2: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    img: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    homepage: {
			type: Sequelize.TEXT,
			defaultValue: "",
		},
    birth_date: {
			type: Sequelize.DATEONLY,
			defaultValue: Sequelize.NOW,
		},
    uid: {
			type: Sequelize.STRING,
			defaultValue: "",
		},
  });

  AddressBook.associate = models => {
    AddressBook.belongsTo(models.company, {
      foreignKey: "company_id",
    });
    AddressBook.belongsTo(models.company_structure, {
      foreignKey: "company_str_id",
    });
  };

  return AddressBook;
};