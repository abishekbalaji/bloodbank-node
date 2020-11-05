const moment = require("moment");

const generateRequestsClean = (requests) => {
  const requestsClean = requests.map((request) => {
    let haveDisease = "";
    if (request.haveDisease) {
      haveDisease = "Yes";
    } else {
      haveDisease = "No";
    }
    const dateArray = moment(request.createdAt)
      .format("Do MMM, YYYY-hh:mm A")
      .split("-");
    return {
      id: request.id,
      name: request.name,
      age: request.age,
      weight: request.weight,
      bloodGroup: request.bloodGroup,
      haveDisease,
      phone: request.phone,
      location: request.location,
      date: dateArray[0],
      time: dateArray[1],
    };
  });
  return requestsClean;
};

module.exports = generateRequestsClean;
