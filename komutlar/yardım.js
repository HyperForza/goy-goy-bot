const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '!'
let müzik = new Discord.RichEmbed()  
.setAuthor(message.author.username, message.author.avatarURL)
.setColor('RANDOM')
.addField('Goy Goy Bot | Yardım Komutları',`
**.müzik-yardım** : Müzik Komutlarını Gösterir
**.yönetim-yardım** : Yönetim Komutlarını Gösterir
**.mod-yardım** : Moderatör Komutları Gösterir`)
.setFooter('Goy Goy Bot')
 message.channel.send(müzik) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["yardım","help"], 
  permLevel: 0
};
exports.help = {
  name: 'yardım'
};
  
