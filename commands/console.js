    const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('console')
        .setDescription('console'),

    async execute(ctx) {
        console.log(ctx)
        // ctx.guild.messages.cache.get('1097676518504800266').delete()
    }

}
