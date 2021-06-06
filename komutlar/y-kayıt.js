const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.find(r => r.id === "KAYITLI ROL ID"); 
  const kayıtsız = message.guild.roles.find(r => r.id === "KAYITSIZ ROL ID");
  if(!message.member.roles.get("KAYIT SORUMLUSU ROL ID") && !message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Yetersiz Yetki` , `Yeterli Yetkiniz Olmadığı için Bu Komutu Kullanamazsınız`).setColor("RANDOM").setTimestamp()).then(m => m.delete(5000));
  else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').addField("Hatalı Kullanım",`Lütfen Bir Kullanıcı Etiketleyiniz`).setFooter(message.author.username, message.author.avatarURL)).then(m => m.delete(10000));
    const kullanıcı = message.guild.member(member)
    const isim = args[1];
    const yas = args[2];
      if(!isim) 
        return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').addField("Hatalı Kullanım",`Lütfen Bir İsim Yazınız`).setFooter(message.author.username, message.author.avatarURL)).then(m => m.delete(10000));
      if(!yas) 
        return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').addField("Hatalı Kullanım",`Lütfen Bir Yaş Yazınız`).setFooter(message.author.username, message.author.avatarURL)).then(m => m.delete(10000));
    kullanıcı.addRole(kayıtlı)
    kullanıcı.removeRole(kayıtsız)
    kullanıcı.setNickname(`${isim} | ${yas}`)
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField("Kayıt Başarılı", `<@!${kullanıcı.user.id}> Kullanıcısına ${kayıtlı} Rolünü Verdim ve Adını \`${isim} | ${yas}\` Olarak Düzenledim`)
    .setFooter('Apo Multi Bot')
    message.channel.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt"],
  permLevel: 0
};
exports.help = {
  name: "kayıt",
  description: "Kullanıcıyı Kayıt Eder",
  usage: "kayıt"
};
