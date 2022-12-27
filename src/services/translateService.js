let getTranslateInfo = async (text) => {
  let AA = JSON.stringify({ query: text });
  let getLangInfo = await fetch(
    `https://openapi.naver.com/v1/papago/detectLangs`,
    {
      method: "post",
      headers: {
        "X-Naver-Client-Id": process.env.client_id,
        "X-Naver-Client-Secret": process.env.client_secret,
        "Content-Type": "application/json",
      },
      body: AA,
    }
  );
  let langResult = await getLangInfo.json();
  let lang = langResult.langCode;
  if (lang !== "ko") {
    lang = "en";
  }
  if (lang == "en") {
    target = "ko";
  } else if (lang == "ko") {
    target = "en";
  }

  let A = JSON.stringify({ source: lang, target: target, text: text });
  let reqInfoApi = await fetch(`https://openapi.naver.com/v1/papago/n2mt`, {
    method: "post",
    headers: {
      "X-Naver-Client-Id": process.env.client_id,
      "X-Naver-Client-Secret": process.env.client_secret,
      "Content-Type": "application/json",
    },
    body: A,
  });
  let C = await reqInfoApi.json();
  let D = C.message.result;
  if (D.srcLangType == "ko") {
    D.srcLangType = "한국어";
  }
  if (D.srcLangType == "en") {
    D.srcLangType = "영어";
  }
  if (D.tarLangType == "ko") {
    D.tarLangType = "한국어";
  }
  if (D.tarLangType == "en") {
    D.tarLangType = "영어";
  }
  let result = `==${D.srcLangType}를 ${D.tarLangType}로 변환==
${D.translatedText}`;

  return result;
};

module.exports = { getTranslateInfo };
