import fetch from 'node-fetch'
import fs from 'fs'
import chalk from 'chalk'
// import delay from 'delay'

const filemu = "cookie-full.txt"; //cookiesmu taroh di sini sat
const cron = require('node-cron');

cron.schedule('0 3,15 28 * *',  function() {
  console.log("running a task every 5 minute");
});

function wait(ms, value) {
  return new Promise(resolve => setTimeout(resolve, ms, value));
}


const getIDAdventures = () => new Promise((resolve, reject) => {
    fetch(`https://citizen.dosi.world/api/citizen/v1/adventures`, {
        method: "GET",
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
        }
    })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});

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

const getBalance = (kuki) => new Promise((resolve, reject) => {
    fetch('https://citizen.dosi.world/api/citizen/v1/balance', {
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
    .then(res => resolve(res.amount))
    .catch(err => reject(err))
});

const claimDON = (kuki) => new Promise((resolve, reject) => {
    fetch('https://citizen.dosi.world/api/citizen/v1/events/check-in', {
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

const adventuresParticipation = (kuki, id) => new Promise((resolve, reject) => {
    fetch('https://citizen.dosi.world/api/citizen/v1/adventures/'+id+'/participation', {
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

  const getRefferal = (kuki) => new Promise((resolve, reject) => {
    fetch('https://citizen.dosi.world/api/citizen/v1/events/referral', {
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
        console.log("Auto Claim Dosi with Cookies")
        await fs.readFile(filemu, async function(err, data) {
            if (err) throw err;
            const array = data
            .toString()
            .replace(/\r/g, ``)
            .split('\n')
            console.log(chalk.yellow("Total Account: " + array.length + " Account \n"))
            let day = 1
            while(true){
              console.log(chalk.black.bgGreen.bold('[i] Day : '+day))
                for(let i = 0; i < array.length; i++) {
                    const kuki = array[i]
                    const profileinfo = await getprofilInfo(kuki);
                    const nftInfo = await getNFTinfo(kuki);
                    const balance = await getBalance(kuki);
                    const get = await getRefferal(kuki)
                    // console.log(get.referralCode)
                    // console.log('\n')
                    console.log(chalk.black.bgMagenta.bold("[+] Wallet " + (i+1)) + chalk.black.bgMagenta.bold(" - Email : " + profileinfo.email) + chalk.black.bgMagenta.bold(" - DON : " + balance) + chalk.black.bgMagenta.bold(" - NFT : " + nftInfo.nftCount) + chalk.black.bgMagenta.bold(" - REFERRAL : " + get.referralCode))
                    // console.log(" [+] Wallet " + (i+1))
                    const idAdv = await getIDAdventures();
                    const idAdventure = idAdv.adventureList[0].id
                    const claim = await claimDON(kuki);


                    if (claim.success == true) {
                        console.log(chalk.green("[-] Claim DON : " + claim.totalAmount + " DON"))
                    } else if (claim.statusCode == "3500") {
                        console.log(chalk.red("[-] Claim DON : " + claim.statusMessage))
                    } else {
                        console.log(chalk.red("[-] Claim DON : " + claim.statusMessage))
                    }

                    const adventures = await adventuresParticipation(kuki, idAdventure);

                    if (adventures.currentCount) {
                        console.log(chalk.green("[-] Adventures : My Participation: " + adventures.currentCount))
                    } else if (adventures.statusCode == "3505") {
                        console.log(chalk.red("[-] Adventures : You don't have enough DON to participate in this adventure"))
                    } else {
                        console.log(chalk.red("[-] Adventures : " + adventures.statusMessage))
                    }

                    if(nftInfo.nftCount > 1){
                    fs.appendFileSync("landing.txt", profileinfo.email+'|'+kuki+'\n');
                    }

                    // fs.appendFileSync("list-account.txt", profileinfo.email+'|'+kuki+'\n');

                }
                console.log('\nsleep 24:01 hours')
                console.log('------------------------------------------------------------------------------------')
                await wait(86460000)
                day++

                
            }
        })
    } catch (err) {
        console.log(err)
    }
})();