const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {



    if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS"))return message.channel.send('Yeterli Yetkiniz Yok');



    let user = message.mentions.users.first();
    let reason = args.slice(1).join(' ');

    if (message.mentions.user.size < 1  ) return message.reply('Banlamak İstediğiniz Kişiyi Etiketleyin');
    if (reason.leght < 1) return message.reply('Sebep Belirtin');
    if (user.id === message.author.id) return message.reply("Kendini Banlayamazsın");



    message.guild.ban(user, 2);
    
   
    const goygoybot = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Başarıyla Banlandı`)
    .setAuthor(`${message.author.tag} Tarafindan Banlandı`, message.authot.avatarURL)
    .setTimestamp()
    .setFooter(`${client.user.username}`, client.user.avatarURL);
      message.channel.send(goygoybot)


};

exports.conf = {
  enable: true,
  guildOnly: true,
  aliases: ["ban"],
  permLevel: 3,
    
};

exports.help = {
    name: "ban",
    description: "kullanıcıyı yasaklar",
    usage: "ban @kullanıcı"

};
