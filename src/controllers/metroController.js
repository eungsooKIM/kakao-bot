const { metroService } = require("../services");

const getMetroInfo = async (cmd) => {
  let currentStation = cmd;
  if (currentStation.endsWith("역") == true) {
    currentStation = currentStation.replace(/역$/, "");
  }
  try {
    let result = await metroService.getMetroInfo(currentStation);
    return result;
  } catch (error) {
    throw error;
  }

};

module.exports = {
  getMetroInfo,
};
