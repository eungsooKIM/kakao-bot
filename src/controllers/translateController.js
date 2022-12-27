const { translateService } = require("../services");

const getTranslateInfo = async (cmd) => {
  let text = cmd;
  let result = await translateService.getTranslateInfo(text);
  return await result;
};

module.exports = {
  getTranslateInfo,
};
