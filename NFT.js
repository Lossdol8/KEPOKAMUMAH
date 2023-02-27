import fetch from 'node-fetch'
import chalk from 'chalk'
import fs from 'fs'
import { profile } from 'console';

const filemu = "babi.txt"; //cookiesmu taroh di sini sat

const getprofilInfo = (kuki) => new Promise((resolve, reject) => {
    fetch('https://citizen.dosi.world/api/citizen/v1/login/finish', {
      method: 'POST',
      headers: {
        'Host': 'citizen.dosi.world',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.1; Custom) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Mobile Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-encoding': 'gzip, deflate, br',
        'Accept-language': 'en-US,en;q=0.9',
        'Cache-control': 'max-age=0',
        'Cookie': 'DOSI_SES='+kuki
    }
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

const getNFTinfo = (kuki) => new Promise((resolve, reject) => {
  fetch('https://citizen.dosi.world/api/citizen/v1/membership', {
    method: 'GET',
    headers: {
      'Host': 'citizen.dosi.world',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.1; Custom) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Mobile Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-encoding': 'gzip, deflate, br',
      'Accept-language': 'en-US,en;q=0.9',
      'Cache-control': 'max-age=0',
      'Cookie': 'DOSI_SES='+kuki
    }
  })
  .then(res => res.json())
  .then(res => resolve(res))
  .catch(err => reject(err))
});



(async () => {
    try { 
        console.log("Dosi NFT Checker with Cookies")
        await fs.readFile(filemu, async function(err, data) {
            if (err) throw err;
            const array = data
            .toString()
            .replace(/\r/g, ``)
            .split('\n')
            console.log(chalk.yellow("Total Account: " + array.length + " Account"))
            for(let i = 0; i < array.length; i++) {
                const kuki = array[i]
                const nftInfo = await getNFTinfo(kuki);
                const profileinfo = await getprofilInfo(kuki);
                console.log(chalk.red("[+] Wallet " + (i+1)) + chalk.blue(" - Email " + profileinfo.email) + chalk.green(" - NFT : " + nftInfo.nftCount) + chalk.magenta(" - Wallet Address : " + profileinfo.walletAddress))
                fs.appendFileSync("akun-babi.txt", profileinfo.email+'|'+profileinfo.walletAddress.slice(0,14)+'|'+kuki+'\n');

              }
        })
    } catch (err) {
        console.log(err)
    }
})();