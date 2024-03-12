const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(ctx) {
        console.log(`Ready! Logged in as ${ctx.user.tag}`)
    }
}