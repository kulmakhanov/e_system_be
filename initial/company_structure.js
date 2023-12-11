const db = require("../models");
const company_structure = db.company_structure;

module.exports = () => {
	company_structure.create({
		str_name: "Руководство",
	}),
		company_structure.create({
			str_name: "Бухгалтерия",
		}),
		company_structure.create({
			str_name: "Отдел кадров",
		}),
		company_structure.create({
			str_name: "Юридический отдел",
		});
	company_structure.create({
		str_name: "Производственно-технический персонал",
	});
	company_structure.create({
		str_name: "Отдел промышленной безопасности, охраны труды и экологии",
	});
	company_structure.create({
		str_name: "Отдел ІТ",
	});
	company_structure.create({
		str_name: "Участок перевозочного процесса",
	});
	company_structure.create({
		str_name: "Станционный технологический центр",
	});
	company_structure.create({
		str_name: "Участок локомотивного хозяйства",
	});
	company_structure.create({
		str_name: "Участок вагонного хозяйства",
	});
	company_structure.create({
		str_name: "Участок путевого хозяйства",
	});
	company_structure.create({
		str_name: "Участок СЦБ, связи и электроснабжения",
	});
	company_structure.create({
		str_name: "Отдел внутренней безопасности",
	});
	company_structure.create({
		str_name: "Административно-хозяйственный отдел",
	});
	company_structure.create({
		str_name: "Группа технического надзора",
	});
	company_structure.create({
		str_name: "Сметная группа",
	});
	company_structure.create({
		str_name: "СМК",
	});
	company_structure.create({
		str_name: "Экономический отдел",
	});
	company_structure.create({
		str_name: "Отдел закупок",
	});
	company_structure.create({
		str_name: "Медпункт",
	});
	company_structure.create({
		str_name: "СТЦ",
	});
	company_structure.create({
		str_name: "Группа технического отдела",
	});
	company_structure.create({
		str_name: "Отдел по инфраструктурным проектам",
	});
	company_structure.create({
		str_name: "Отдел по эксплуатации вагонного парка",
	});
};