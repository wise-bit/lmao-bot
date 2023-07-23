require("dotenv").config(); //initialize dotenv

const discord = require("discord.js"); //import discord.js

// 2147551296

// intents = discord.Intents.default();
// intents.members = True;

// client = discord.Client((intents = intents));

const client = new discord.Client({
  intents: [
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.GuildMessageReactions,
    discord.GatewayIntentBits.MessageContent,
    discord.GatewayIntentBits.DirectMessageReactions,
    discord.GatewayIntentBits.DirectMessages,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.content.toLowerCase().includes("lmao")) {
    msg
      .react(`😂`)
      .then(() => console.log("Reaction added!"))
      .catch(console.error);
  }
});

client.login(process.env.CLIENT_TOKEN);
