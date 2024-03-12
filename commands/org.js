const { SlashCommandBuilder, range} = require('discord.js');
const fs = require('fs')
// const parsing = require('C:\\Users\\Vasya_Pupkin\\Desktop\\типо крутой\\nodee\\parser.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('org')
        .setDescription('check org')
        .addStringOption(option =>
            option.setName('org')
                .setDescription('org')
                .setRequired(true)
                .addChoices(
                    {name: 'lspd', value: '1'},
                    {name: 'rcsd', value: '2'},
                    {name: 'fbi', value: '3'},
                    {name: 'sfpd', value: '4'},
                    {name: 'lsmc', value: '5'},
                    {name: 'gov', value: '6'},
                    {name: 'тср', value: '7'},
                    {name: 'sfmc', value: '8'},
                    {name: 'lc', value: '9'},
                    {name: 'lsfm', value: '10'},
                    {name: 'lsa', value: '20'},
                    {name: 'cb', value: '21'},
                    {name: 'lvmc', value: '22'},
                    {name: 'lvpd', value: '23'},
                    {name: 'lvfm', value: '24'},
                    {name: 'sffm', value: '26'},
                    {name: 'sfa', value: '27'},
                    {name: 'стк', value: '29'},
                    {name:'all', value: 'alls' }
                ))
        .addStringOption(option =>
        option.setName('nick')
            .setDescription('Ники')
            .setRequired(true)),

    async execute(ctx) {

        const result = fs.readFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\типо крутой\\nodee\\result.json', 'utf-8')
        const data = JSON.parse(result)
        // let hz1 = parsing.parse1(ctx.options._hoistedOptions[0].value).then( (value) => {
        //     return value
        // })

        // let parse_promise = new Promise(function (resolve, reject) {
        //     resolve(parsing.parse1(ctx.options._hoistedOptions[0].value))
        //     reject('--')
        // } )
        const all_orgs = fs.readFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\типо крутой\\nodee\\all_orgs.json')
        const all_orgs_text = JSON.parse(all_orgs)
        function check () {

            let hz = ctx.options._hoistedOptions[1].value
            let nicks = hz.split(' ')
            // let nicks1 = nicks
            let check_nicks = ''
            let results1 = ctx.options._hoistedOptions[0].value
            // let sost = []
            if (results1 === 'alls') { results1 = [1,2,3,4,5,6,7,8,9,10,20,21,22,23,24,26,27,29] }
            for (j in results1) {
                for (i in nicks) {
                    if (nicks[i].match('_')) {
                        if (data[results1[j]].match(nicks[i])) {
                            check_nicks += `${nicks[i]} - состоит в ${all_orgs_text[`${results1[j]}`]}\n`
                            delete nicks[i]

                        }
                    }
                    else {
                        if (nicks[i] !== '' && nicks[i] !== ' ') {
                            check_nicks = check_nicks + `${nicks[i]} - такого ника не существует \n`
                            delete nicks[i]
                        }
                        else { delete nicks[i]}
                    }
                }
            }
            for (a in nicks) {
                check_nicks = check_nicks + `${nicks[a]} - не состоящий в организации.`
            }
            // for (j in results1) {
            //         for (i in nicks) {
            //             if (nicks[i].match('_')) {
            //                 if (data[results1[j]].match(nicks[i])) {
            //                     check_nicks += `${nicks[i]} - состоит в ${all_orgs_text[`${results1[j]}`]}\n`
            //                     nicks[i] = 'alreadychecked'
            //                     sost.push(nicks[i])
            //
            //                 }
            //             }
            //             else {
            //                 if (nicks[i] === 'alreadychecked') {
            //                     continue
            //                 }
            //                 else {
            //                     if (nicks[i] !== '' && nicks[i] !== ' ') {
            //                         check_nicks = check_nicks + `${nicks[i]} - такого ника не существует \n`
            //                         nicks[i] = 'alreadychecked'
            //                     }
            //                 }
            //             }
            //         }
            // }
            // for (a in nicks1) {
            //     for (b in sost) {
            //         if (nicks1[a] === sost[b]) {
            //             delete nicks1[a]
            //         }
            //     }
            // }
            // let ne_sost = ''
            // for (c in nicks1) { if (nicks1[c] !== 'alreadychecked') { ne_sost += `${nicks1[c]} - не состоит \n` } }
            // return {check_nicks, ne_sost}
            return check_nicks
        }
        let check1 = check()
        return ctx.reply(check())
        // await ctx.followUp(check1.ne_sost)

        // if (Date.now() > data.date + 60000) {
        //     parse_promise.then(() => {
        //         console.log('обновил')
        //     })
        //     setTimeout( () => {
        //         if (Date.now() < data.date + 60000) {
        //         ctx.reply(check())
        //         }
        //     }, 5000)
        // }
        // else { ctx.reply(check()) }
    }
}