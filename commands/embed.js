const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('embed'),

    async execute(ctx) {
        const newEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .addFields(
                    { name: 'Hz', value: 'Hz' },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Hz', value: 'Some value here', inline: true },
                    { name: 'Hz', value: 'Some value here', inline: true })


        await ctx.reply({embeds: [newEmbed]})
    }

}
