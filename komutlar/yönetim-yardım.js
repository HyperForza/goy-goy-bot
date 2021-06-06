const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let müzik = new Discord.RichEmbed()  
.setAuthor(message.author.username, message.author.avatarURL)
.setColor('RANDOM')
.addField('Goy Goy Bot | Mod Komutları',`
**.otorol** : Sunucuya Otorol Ayarlar`)

.setFooter('Goy Goy Bot')
 message.channel.send(müzik) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["yönetim","yönetim-yardım","yönetim-help"], 
  permLevel: 0
};
exports.help = {
  name: 'yönetim-yardım'
};
 
