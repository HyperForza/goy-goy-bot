const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path")
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

client.queue = new Map()


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

//OTOROL BAŞLANGIÇ

client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
let arole = otorole[member.guild.id].sayi
let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8")); 
let embed = new Discord.RichEmbed()
.setTitle('Otorol Sistemi')
.setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Başarılıyla Verilmiştir. `)
.setColor("GREEN")
.setFooter("ForumGrand", client.user.avatarURL);

if (!giriscikis[member.guild.id].kanal) {
return;
}

try {
let giriscikiskanalID = giriscikis[member.guild.id].kanal;
let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
giriscikiskanali.send(`::loudspeaker: :white_check_mark: :rose: Hoşgeldin **${member.user.tag}** Rolün Başarılı Bir Şekilde Verildimiştir. :rose: :white_check_mark: :loudspeaker:`);
} catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
return console.log(e)
}

});

client.on("guildMemberAdd", async (member) => {
let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
let role = autorole[member.guild.id].sayi

member.addRole(role)

});

//OTOROL BİTİŞ

//REKLAM ENGEL BAŞLANGIÇ

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`);
  let salvo = message.member;
  if (reklamkick == "kapali") return;
  if (reklamkick == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); 
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam Koruma", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> Reklam Koruma Sistemine Yaklandın Lütfen Reklam Yapma (1/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam Koruma", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> Reklam Koruma Sistemine Yaklandın Lütfen Reklam Yapma (2/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await salvo.kick({
            reason: `Reklam kick sistemi`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam Koruma", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> 3 Kez Reklam Uyarısı Aldığı Tespit Edildi ve Sunucudan Atıldı (3/3)`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await salvo.ban({
            reason: `Goy Goy Bot | Reklam Koruma Sistemi`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter("Reklam Koruma", client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı için Banlandı`
            )
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

//REKLAM ENGEL SON



client.login(ayarlar.token);
