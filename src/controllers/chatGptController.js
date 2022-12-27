getChatGpt = async (messages) => {
  console.log(messages)

  let getChatGpt = await fetch(
    "https://chat.openai.com/backend-api/conversation",
    {
      headers: {
        authority: "chat.openai.com",
        accept: " text/event-stream",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization:
          process.env.OPENAI_AUTHORIZATION_KEY,
        "content-type": "application/json",
        cookie:
        process.env.OPENAI_COOKIE,
        origin: "https://chat.openai.com",
        referer: "https://chat.openai.com/chat",
        "sec-ch-ua": `"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"`,
        "sec-ch-ua-mobile": `?0`,
        "sec-ch-ua-platform": "Linux",
        "sec-fetch-dest": `empty`,
        "sec-fetch-mode": `cors`,
        "sec-fetch-site": `same-origin`,
        "user-agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`,
        "x-openai-assistant-app-id": "",
      },
      body: JSON.stringify({
        action: "next",
        messages: [
          {
            id: "859b75be-c1aa-46f2-9df1-5effa292fa6e",
            role: "user",
            content: { content_type: "text", parts: [`${messages}`] },
          },
        ],
        parent_message_id: "7dcee102-324a-4720-9038-a905027c5201",
        model: "text-davinci-002-render",
      }),
      method: "POST",
    }
    );
    if (getChatGpt.status === 200) {
      let results = await getChatGpt.text();
      let parseResults = await parseGpt(results)
      return parseResults
    };
  }


function parseGpt(results) {
  let a  = results.split("data:");
  let b  = a[a.length - 2].trim();
  let c = JSON.parse(b);
  return c.message.content.parts[0];
}

module.exports = { getChatGpt }
