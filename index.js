require("dotenv").config(); //initialize dotenv

const discord = require("discord.js"); //import discord.js

// 2147551296

// intents = discord.Intents.default();
// intents.members = True;

// client = discord.Client((intents = intents));

function findMostLooolOccurrences(str) {
  const regex = /l[o]+l/g;
  const matches = str.match(regex);

  if (!matches || matches.length === 0) {
    return null; // If no matches found, return null
  }

  let mostOccurrences = matches[0];
  for (let i = 1; i < matches.length; i++) {
    if (matches[i].length > mostOccurrences.length) {
      mostOccurrences = matches[i];
    }
  }

  return mostOccurrences;
}

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
  if (!msg.content.startsWith("<:c_s")) {
    console.log("> " + msg.author.username + " (" + msg.guild.name + ")" + ": " + msg.content);
  }

  const content = msg.content.toLowerCase();
  let reaction = "";

  if (findMostLooolOccurrences(content)) {
    const lolCount = findMostLooolOccurrences(content).match(/o/g).length;

    if (lolCount == 1) {
      reaction = `🙂`;
    } else if (lolCount < 5) {
      reaction = `😂`;
    } else {
      reaction = `🤣`;
    }
  } else if (["lmao"].some((item) => content.includes(item))) {
    reaction = `😂`;
  } else if (["lmfao"].some((item) => content.includes(item))) {
    reaction = `🤣`;
  }

  if (reaction) {
    msg
      .react(reaction)
      // .then(() => console.log("Reaction added!"))
      .catch(console.error);
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  // console.log(interaction);

  if (interaction.commandName === "lmao") {
    interaction.reply("lmao");
  }
});

client.login(process.env.CLIENT_TOKEN);
