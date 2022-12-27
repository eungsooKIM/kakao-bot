const { numberService } = require("../services");

const getNumberInfo = async (cmd) => {
  let number = cmd;
  if (number <0 && number>100){
    throw err;
  } 
  let result = await numberService.getNumberInfo(number);
  return await result;
};

module.exports = {
  getNumberInfo,
};
