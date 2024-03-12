const puppeteer = require('puppeteer')
const fs = require("fs");

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

module.exports = {
    multi_parse: async function multi_parse(nums) {
        const browser = await puppeteer.launch({headless: false})

        const cookies = fs.readFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\nodee\\cookies.json', 'utf-8')
        const string_cookies = JSON.parse(cookies)

        const res = fs.readFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\\nodee\\result.json', 'utf-8')
        let res_str = JSON.parse(res)

        const date = Date.now()

        // загружаю куки
        const url = `https://apitest.arizona-rp.com/mon/fraction/10/1`
        let page = await browser.newPage()
        // await page.setCookie(...string_cookies)
        await page.goto(url)
        await page.waitForSelector('td')
        await page.waitForSelector('#up-btn')
        sleep(500)
        const cookie = await page.cookies()
        let data = JSON.stringify(cookie)
        fs.writeFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\\nodee\\cookies.json', data)
        await page.close()

        for (i in nums) {
            const url = `https://apitest.arizona-rp.com/mon/fraction/10/${nums[i]}`
            let page = await browser.newPage()
            await page.setCookie(...string_cookies)
            await page.goto(url)
            await page.waitForSelector('td')
            await page.waitForSelector('#up-btn')
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

            res_str[`${nums[i]}`] = result
            // res_str[i].replace(/<td>/, '')
            let data1 = JSON.stringify(res_str)
            fs.writeFileSync('C:\\Users\\Vasya_Pupkin\\Desktop\\hz\\nodee\\result.json', data1)
            console.log('++')

            await page.close()
            if (i === nums.length) {
                await browser.close()
            }
        }
        // for (i in nums) {
        //     hz(i)
        // }
        console.log('+')

    }
}