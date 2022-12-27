const { exchangeService } = require("../services");

const getExchangeInfo = async (cmd) => {

    
    let inputMoney = cmd;
  if (inputMoney.endsWith("원") == true) {
    inputMoney = inputMoney.replace(/원$/, "");
  
  try {
    let result = await exchangeService.getExchangeInfo(inputMoney,"won");
    return result;
  } catch (error) {
    throw error;
  }
  }
  if (inputMoney.endsWith("달러") == true) {
    inputMoney = inputMoney.replace(/달러$/, "");
    try {
        let result = await exchangeService.getExchangeInfo(inputMoney,"dollar");
        return result;
      } catch (error) {
        throw error;
      }
      
  }
};

module.exports = {
    getExchangeInfo
};
