let getNumberInfo = async (number) => {
  let trivia = await fetch(`http://numbersapi.com/${number}?json`);
  let { text } = await trivia.json();

  let AA = JSON.stringify({ query: text });
  let A = JSON.stringify({ source: "en", target: "ko", text: text });
  let reqInfoApi = await fetch(`https://openapi.naver.com/v1/papago/n2mt`, {
    method: "post",
    headers: {
      "X-Naver-Client-Id": process.env.client_id,
      "X-Naver-Client-Secret": process.env.client_secret,
      "Content-Type": "application/json",
    },
    body: A,
  });
  let result = await reqInfoApi.json();

  return await result.message.result.translatedText;
};

module.exports = { getNumberInfo };
