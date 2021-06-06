const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {
const prefix = await data.fetch(`prefix.${message.guild.id}`) || client.ayarlar.prefix;
const ad = await data.fetch(`numara.${message.channel.id}`)
if(message.channel.name === `ticket-${ad}` || message.channel.name === `closed-${ad}`) {
const ann = await data.fetch(`asd.${message.guild.id}.${message.channel.id}.${message.author.id}`)
if(!ann) return message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`Bu Bilet Başkasına Ait.`))
message.delete()

message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`Bilet 10 Saniye Sonra Silinecek.`))
setTimeout(async () => {
message.channel.delete()
data.delete(`asd.${message.guild.id}.${message.channel.id}.${message.author.id}`)
}, 10000)

} else { return message.channel.send(new Discord.RichEmbed()
.setColor(0x7997ff)
.setFooter(`© Safe Code 2021`)
.setDescription(`Bu Komutu Bir Bilet Kanalında Kullanın.`)) }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'bilet-sil'
};
