const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('fsdjklfsdjlkfsd'),

    async execute(ctx) {

        const button1 = new ButtonBuilder()
            .setCustomId('button1')
            .setLabel('Accept')
            .setStyle(ButtonStyle.Success)

        const button2 = new ButtonBuilder()
            .setCustomId('button2')
            .setLabel('Next')
            .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(button1)

        const row2 = new ActionRowBuilder()
            .addComponents(button2)

        const msg = await ctx.reply({content: 'hz', components: [row]})

        const collectorFilter = i => i.user.id === ctx.user.id;

        const collector = ctx.channel.createMessageComponentCollector({filter: collectorFilter, time: 60000})

        collector.on('collect', async i => {
            if (i.customId === 'button1') {
                await msg.edit({ content: 'на кнопку нажали', components: [row2] })

            }
        })
    }
}