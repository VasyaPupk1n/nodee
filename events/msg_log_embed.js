const { Events, EmbedBuilder } = require('discord.js')


module.exports = {
    name: Events.MessageDelete,
    once: false,
    async execute(message) {
        const log_channel = '1065018325379321977'
        const attachments = message.attachments;
        let attachments_embed = ''

        let options_data = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        const log_attachments_embed = () => {

            attachments.forEach( (value) => {
                attachments_embed = `${attachments_embed} ${value.url} \n`
            } );
            if (attachments_embed === '') { attachments_embed = 'Отсутствуют' }
            return attachments_embed
        }
        if (message.author.bot) {  return  }
        else {
            const logEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({name: 'log by Bobik', iconURL: 'https://i.imgur.com/Qd8iSOQ.png'})
                .setTitle(`${message.author.tag}`)
                .setDescription(`${(message.content === '') ? ' ' : message.content}`)
                // .addFields( {name: 'Ссылка на изображение'})
                .setFields({ name: `Ссылки на изображения`, value: `${log_attachments_embed()}`, inline: true },
                           { name: 'Время отправки', value: `${new Date(message.createdTimestamp).toLocaleString('ru', options_data)}`})
                .setTimestamp()
            message.guild.channels.cache.get(log_channel).send({embeds: [logEmbed]})
        }



    }
}