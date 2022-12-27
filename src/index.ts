import { Server } from "@remote-kakao/core";
import LoggerPlugin from "./logger";

require("dotenv").config();
const {
  metroController,
  translateController,
  exchangeController,
  numberController,
  notionController,
  chatGptController,
} = require("./controllers");
const { chatDao } = require("./models");

const text = require("./utils/text");
const prefix = ">>";
const translate = "@@";
const exchange = "$$";
const number = "%%";
const notion = "--";
const chatGpt = "??";

const server = new Server();
server.usePlugin(LoggerPlugin);

server.on("message", async (msg) => {
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.split(" ");
  const cmd = args.shift()?.slice(prefix.length);
  await chatDao.saveChat(msg.sender.name, msg.content);
  if (cmd === "ping") {
    const timestamp = Date.now();
    await msg.reply("Pong!");
    msg.reply(`${Date.now() - timestamp}ms`);
  }
  if (cmd === "설명서") {
    await msg.reply(text.readMe);
  } else {
    let result = async () => {
      try {
        let A = await metroController.getMetroInfo(cmd);
        msg.reply(A);
      } catch {
        msg.reply("올바른 역 이름이 아닙니다");
      }
    };
    result();
  }
});

server.on("message", async (msg) => {
  if (!msg.content.startsWith(translate)) return;

  const args = msg.content.split("    "); // 공백을 많이주니 go to home을 다받을수있다(기존엔 띄어쓰면 못인식)
  const cmd2 = args.shift()?.slice(translate.length);
  await chatDao.saveChat(msg.sender.name, msg.content);

  if (cmd2 === "ping") {
    const timestamp = Date.now();
    await msg.reply("Pong!");
    msg.reply(`${Date.now() - timestamp}ms`);
  }
  if (cmd2 === "설명서") {
    await msg.reply(text.readMe);
  } else {
    let result = async () => {
      try {
        let A = await translateController.getTranslateInfo(cmd2);
        msg.reply(A);
        return "done";
      } catch {
        msg.reply("올바른 명령이 아닙니다");
      }
    };
    result();
  }
});

server.on("message", async (msg) => {
  if (!msg.content.startsWith(exchange)) return;

  const args = msg.content.split("    ");
  const cmd3 = args.shift()?.slice(exchange.length);
  await chatDao.saveChat(msg.sender.name, msg.content);

  if (cmd3 === "ping") {
    const timestamp = Date.now();
    await msg.reply("Pong!");
    msg.reply(`${Date.now() - timestamp}ms`);
  }
  if (cmd3 === "설명서") {
    await msg.reply(text.readMe);
  } else {
    let result = async () => {
      try {
        let A = await exchangeController.getExchangeInfo(cmd3);
        msg.reply(A);
      } catch {
        msg.reply("올바른 명령이 아닙니다");
      }
    };
    result();
  }
});

server.on("message", async (msg) => {
  if (!msg.content.startsWith(number)) return;

  const args = msg.content.split("    ");
  const cmd4 = args.shift()?.slice(number.length);
  await chatDao.saveChat(msg.sender.name, msg.content);

  if (cmd4 === "ping") {
    const timestamp = Date.now();
    await msg.reply("Pong!");
    msg.reply(`${Date.now() - timestamp}ms`);
  }
  if (cmd4 === "설명서") {
    await msg.reply(text.readMe);
  } else {
    let result = async () => {
      try {
        let A = await numberController.getNumberInfo(cmd4);
        msg.reply(A);
      } catch {
        msg.reply("올바른 명령이 아닙니다");
      }
    };
    result();
  }
});

server.on("message", async (msg) => {
  if (!msg.content.startsWith(notion)) return;

  const args = msg.content.split("    ");
  const cmd5 = args.shift()?.slice(notion.length);
  await chatDao.saveChat(msg.sender.name, msg.content);

  if (cmd5 === "ping") {
    const timestamp = Date.now();
    await msg.reply("Pong!");
    msg.reply(`${Date.now() - timestamp}ms`);
  }
  if (cmd5 === "설명서") {
    await msg.reply(text.readMe);
  } else {
    let result = async () => {
      try {
        let A = await notionController.getDatabase(cmd5);
        msg.reply(A);
      } catch {
        msg.reply("올바른 명령이 아닙니다");
      }
    };
    result();
  }
});

server.on("message", async (msg) => {
  if (!msg.content.startsWith(chatGpt)) return;

  const args = msg.content.split("    ");
  const cmd6 = args.shift()?.slice(chatGpt.length);
  await chatDao.saveChat(msg.sender.name, msg.content);

  if (cmd6 === "ping") {
    const timestamp = Date.now();
    await msg.reply("Pong!");
    msg.reply(`${Date.now() - timestamp}ms`);
  }
  if (cmd6 === "설명서") {
    await msg.reply(text.readMe);
  } else {
    let result = async () => {
      try {
        let A = await chatGptController.getChatGpt(cmd6);
        msg.reply(A);
        await chatDao.saveChat("chatGpt", A);
      } catch {
        msg.reply("올바른 명령이 아닙니다");
      }
    };
    result();
  }
});

server.start(3000);
