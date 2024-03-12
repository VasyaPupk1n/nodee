const puppeteer = require('puppeteer')
const fs = require('fs');
const {range} = require("discord.js");
const parsing = require('./parser.js')


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

module.exports =
    {
        parse1: async function (num) {
            const url = `https://apitest.arizona-rp.com/mon/fraction/10/${num}`
            const browser = await puppeteer.launch({headless: false})
            const page = await browser.newPage()

            const cookies = fs.readFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\\nodee\\cookies.json', 'utf-8')
            const string_cookies = JSON.parse(cookies)
            await page.setCookie(...string_cookies)

            await page.goto(url);
            await page.waitForSelector('td')
            sleep(500)

            let result = await page.evaluate(() => {
                let table = document
                    .querySelector('div#content')
                    .querySelector('div.container')
                    .querySelector('table.table')
                    .querySelector('tbody')
                    .innerHTML
                return table
            })

            const cookie = await page.cookies()
            let data = JSON.stringify(cookie)
            fs.writeFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\\nodee\\cookies.json', data)

            let date = Date.now()

            await browser.close()

            const res = fs.readFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\\nodee\\result.json', 'utf-8')
            let res_str = JSON.parse(res)
            res_str = {[num]: result, "date": date}
            let data1 = JSON.stringify(res_str)
            fs.writeFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\\nodee\\result.json', data1)
            console.log('+')
            return result
        }
    }

