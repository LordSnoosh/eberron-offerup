require("./config/database");
const Pcclass = require("./models/pcclass");
const data = require("./data");

Pcclass.deleteMany({})
  .then(function (results) {
    console.log(results);
    return Pcclass.create(data.pcclass);
  })
  .then(function () {
    process.exit();
  });
