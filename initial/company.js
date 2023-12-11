const db = require("../models");

const company = db.company;

module.exports = () => {
	company.create({
		name: "Forus Data",
	});
	company.create({
		name: "KKY",
	});
	company.create({
		name: "RTI",
	});
	company.create({
		name: "Ertys Service",
	});
	company.create({
		name: "Batys Petroleum",
	});
	company.create({
		name: "PTC Holding",
	});
	company.create({
		name: "POT",
	});
};