const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('plus')
        .setDescription('Плюсует 2 числа')
        .setDefaultMemberPermissions(8)
        .addStringOption(option =>
        option.setName('one')
            .setDescription('Числа')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('two')
                .setDescription('Числа')
                .setRequired(true)),
        async execute(ctx) {
            let value = 0
            for (i in a = ctx.options._hoistedOptions) {
                    value += Number(a[i].value)
                    if (isNaN(Number(a[i].value))) {
                        value = 'ошибка.'
                        break
                    }
            }
            await ctx.reply(`Будет ${value}`)
        }
}