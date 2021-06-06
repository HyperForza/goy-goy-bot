const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args, emoji) => {
const prefix = await data.fetch(`prefix.${message.guild.id}`) || client.ayarlar.prefix;
if(!message.member.hasPermission('ADMINISTRATOR')) return;
  
if(args[0] === 'ayarla') {
const kanalbelirle = await data.fetch(`kanal.${message.guild.id}`)
if(kanalbelirle) return message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`${client.safeemoji.red} Mesajı göndereceğim kanal zaten ayarlı: ${prefix}ticket-kanal sıfırla`))
let kanal = message.mentions.channels.first()
if(!args[1]) return message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`${client.safeemoji.red} Bir kanalı etiketlemelisin.`))
if(!kanal) return message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`${client.safeemoji.red} Etiketlediğin kanalı bulamıyorum.`))
data.set(`kanal.${message.guild.id}`, kanal.id)
message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`${client.safeemoji.tik} Mesajın kanalı başarıyla ayarlandı: ${prefix}ticket gönder`))
}
if(args[0] === 'sıfırla') {
const kanalbelirle = await data.fetch(`kanal.${message.guild.id}`)
if(!kanalbelirle) return message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`${client.safeemoji.red} Mesajı göndereceğim kanal zaten ayarlı değil: ${prefix}ticket-kanal sıfırla`))
data.delete(`kanal.${message.guild.id}`)
message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`${client.safeemoji.tik} Mesajın kanalı başarıyla sıfırlandı: ${prefix}ticket-kanal ayarla #channel`))
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bilet-kanal'],
  permLevel: 0
}

exports.help = {
  name: 'ticket-kanal'
};
