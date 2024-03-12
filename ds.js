const fs = require('node:fs');
const path = require('node:path');
const { Client,  Collection,  Events, GatewayIntentBits, range, IntentsBitField} = require('discord.js')
const { token } = require('./configds.json')
const multi_parse = require('./multi_parse.js')



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.commands = new Collection()

// nums = range(1, 29)
// multi_parse.multi_parse(nums)
// setInterval( () => {multi_parse.multi_parse(nums)}, 1200000)

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);``
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.login(token)