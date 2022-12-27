let getExchangeInfo = async (money,which) => {

  let reqInfoApi = await fetch(
    `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD`,
    {
      method: "get",
    }
  );
  let result = await reqInfoApi.json();

  let wonDollar = result[0].basePrice
  let dollarWon = 1 / wonDollar
  console.log(money)


  if(which == "won"){
    let calcurate = (money * dollarWon).toFixed(1);
    let res = `== 원화 -> 달러로 환전 ==
현재 환율${wonDollar}원/달러로 계산 시
${calcurate}달러 입니다.`
    return res;
  }

  if(which == "dollar"){
    let calcurate = (money * wonDollar).toFixed(1);
    let res = `== 달러 -> 원화로 환전 
현재 환율${wonDollar}원/달러로 계산 시
${calcurate}원 입니다.`
    return res;
  }



};

module.exports = { getExchangeInfo };
