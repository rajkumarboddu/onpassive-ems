const {
  ADMIN_EMAIL,
  ADMIN_PWD,
  DB_DUMP_DATA,
  DB_DUMP_MAX_RECORDS,
} = require("../utils/constants");
const md5 = require("md5");
const Employee = require("./models/Employee");
const User = require("./models/User");

// check if default admin user exists
const createAdminUser = async () => {
  const admin = await User.findOne({ email: ADMIN_EMAIL });

  if (!admin) {
    console.log("Admin user does not exist... Creating one...");
    const adminUser = new User({
      name: "EMS Admin",
      email: ADMIN_EMAIL,
      pwd: md5(ADMIN_PWD),
    });
    await adminUser.save();
  } else {
    console.log("Admin user already exists");
  }
};

createAdminUser();

// insert fake employee data
(async () => {
  const employeeCount = await Employee.countDocuments({});

  if (DB_DUMP_DATA && employeeCount === 0) {
    console.log("Inserting fake employee data...");

    const faker = require("faker");

    const employeeList = [];
    for (let i = 0; i < DB_DUMP_MAX_RECORDS; i++) {
      employeeList.push({
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        Department: faker.name.jobArea(),
        location: faker.address.city(),
        age: 20 + faker.datatype.number(40),
        salary: 100000 + faker.datatype.number(100000),
      });
    }

    await Employee.insertMany(employeeList);
  }
})();
