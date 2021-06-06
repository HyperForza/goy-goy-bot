const Discord = require('discord.js');
const ms = require("ms");

module.exports.run = (client, message, args) => {
  
   if (!message.member.roles.has('791363645942267904,789050208100548638,389127383921197057,758427699236175893') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Yetersiz Yetki` , `Bu Yetkiyi Kullanmak için Yeterli Yetkiye Sahip Değilsin`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());

  let kullanici = message.mentions.members.first() || message.guild.members.get(args[0])
  let guild = message.guild
  if (!kullanici) return message.channel.send(new Discord.RichEmbed().addField(`Hatalı Kullanım` , `Lütfen Susturulacak Kullanıcıyı Etiketleyin`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp()).then(m => m.delete(10000)).catch(console.error);
  if(kullanici.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed().addField(`Hata` , `Benden Daha Yetkili Birini Susturamam`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp()).then(m => m.delete(10000)).catch(console.error);
  if (kullanici.id === message.author.id) return message.channel.send(new Discord.RichEmbed().addField(`Hatalı Kullanım` , `Kendini Susturamazsın`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp()).then(m => m.delete(10000)).catch(console.error);
  let modlog = guild.channels.find('name', '〖🎤〗modlog');
  if (!modlog) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hata` , `**"modlog"** Kanalını Sunucuda Bulamadım Lütfen **"modlog"** İsimli Bir Metin Kanalı Oluşturun`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp()).then(m => m.delete(20000));;
  let süre = args[1]
  if(!süre) return message.channel.send(new Discord.RichEmbed().addField(`Hatalı Kullanım` , `Lütfen Susturma Süresini Yazınız`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp()).then(m => m.delete(10000)).catch(console.error);
  let sebep = args[2]
  if (!sebep) return message.channel.send(new Discord.RichEmbed().addField(`Hatalı Kullanım` , `Lütfen Susturma Sebebini Yazınız`).setColor("RANDOM").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp()).then(m => m.delete(10000)).catch(console.error);
              let embed =  new Discord.RichEmbed()
              .setTitle('Ses Mutesi Atıldı')
              .setDescription(`${kullanici} Ses Odasında Bir Yetkili Tarafından Susturuldu`)
              .addField("Ses Mute Bilgileri",`**Susturulan Kullanıcı:** ${kullanici} \n**Susturan Yetkili:** <@!${message.author.id}>\n**Ceza Süresi:** ${süre} \n**Ceza Sebebi:** ${sebep}`)
              .setFooter('Mute Sistemi')
              .setColor("RANDOM");
kullanici.setMute(true, `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre} ms`)
              .then(() => guild.channels.get(modlog.id).sendEmbed(embed)).catch(console.error);
              setTimeout(() => {
kullanici.setMute(false,`Süresi dolduğu için susturması kaldırıldı.`)
              let sembed =  new Discord.RichEmbed()
              .setTitle('Ses Mutesi Kaldırıldı')
              .setDescription(`${kullanici} Ses Mute Ceza Süresi Bitti ve Susturulması Kaldırıldı`)
              .setFooter('Mute Sistemi')
              .setColor("RANDOM");
              guild.channels.get(modlog.id).sendEmbed(sembed);

    }, ms(süre))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sescezası", "sesli-sustur","sustur"],
    permLevel: 0
};

exports.help = {
    name: 'seslisustur',
    description: 'seslide sustur',
    usage: "seslisustur"
};