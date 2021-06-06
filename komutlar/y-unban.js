const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db')

exports.run = (client, message, args) => {
  
   if (!message.member.roles.has('850882647612981248') && !message.member.hasPermission('BAN_MEMBERS')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Yetersiz Yetki` , `Bu Yetkiyi Kullanmak için Yeterli Yetkiye Sahip Değilsin`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  if (!message.guild) {
   const ozelmesajuyari = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTimestamp() 
      .addField(`Hatalı Kullanım` , `Bu Komutu Özel Mesajlarda Kullanamazsınız Lütfen Sunucu İçerisinde Herhangi Bir Kanalı Kullanınız`)
    return message.author.sendEmbed(ozelmesajuyari);
  }
  let guild = message.guild;
    let user = args[0];
  let reason = args.slice(1).join(" ");
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let modlog = guild.channels.find("name", "〖🎤〗modlog");
     db.add(`unban.${message.author.id}.${message.guild.id}`, 1)
  if (!modlog) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hata` , `Log Kanalını Bulamıyorum`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
    if (!user)
    return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hatalı Kullanım` , `Lütfen Yasağı Kaldırılacak Kullanıcının ID Numarasını Yazınız`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp()).catch(console.error);
  if (reason.length < 1) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hatalı Kullanım` , `Lütfen Yasak Kaldırma Sebebinizi Yazınız`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());

  message.guild.unban(user);
  const embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`<@!${message.author.id}> Tarafından **${reason}** Sebebiyle Bir Yasak Kaldırıldı`)
  return guild.channels.get(modlog.id).send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unban", "banac", "banaç", "bankaldır"],
  permLevel: 0
};

exports.help = {
  name: "unban",
  description: "İstediğiniz kişinin banını kaldırır.",
  usage: "unban [user] [reason]"
};