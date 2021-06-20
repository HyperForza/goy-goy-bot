const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '!'
let müzik = new Discord.RichEmbed()  
.setAuthor(message.author.username, message.author.avatarURL)
.setColor('RANDOM')
.addField('Goy Goy Bot | Mod Komutları',`
**.ban** : Belirttiğiniz Şarkıyı Sesli Odada Söyler
**.kick** : Çalan Şarkıyı Durdurur
**.sil** : Durdurduğunuz Şarkıyı Devam Ettirir
**.sustur** : Çalan Şarkıyı Tekrarlar`)

.setFooter('Goy Goy Bot')
 message.channel.send(müzik) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["mod","mod-yardım","mod-help"], 
  permLevel: 0
};
exports.help = {
  name: 'mod-yardım'
};
  
