const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hz')
        .setDescription('hz'),

    async execute(ctx) {
        console.log('1')
    }

}