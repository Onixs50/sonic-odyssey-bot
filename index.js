const fs = require('fs');
const colors = require('colors');
const {
  sendSol,
  generateRandomAddresses,
  getKeypairFromPrivateKey,
  PublicKey,
  connection,
  LAMPORTS_PER_SOL,
  delay,
} = require('./src/solanaUtils');

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomFloatFromInterval = (min, max) => (Math.random() * (max - min) + min).toFixed(6);

(async () => {
  const privateKeys = JSON.parse(fs.readFileSync('privateKeys.json', 'utf-8'));
  if (!Array.isArray(privateKeys) || privateKeys.length === 0) {
    throw new Error(colors.red('privateKeys.json is not set correctly or is empty'));
  }

  const addressCount = 104; // تعداد آدرس‌های تصادفی
  const randomAddresses = generateRandomAddresses(addressCount);

  let rentExemptionAmount;
  try {
    rentExemptionAmount = (await connection.getMinimumBalanceForRentExemption(0)) / LAMPORTS_PER_SOL;
    console.log(colors.yellow(`Minimum balance required for rent exemption: ${rentExemptionAmount} SOL`));
  } catch (error) {
    console.error(colors.red('Failed to fetch minimum balance for rent exemption. Using default value.'));
    rentExemptionAmount = 0.001;
  }

  const amountToSend = 0.001; // مقدار پیش‌فرض ارسال
  const delayBetweenTx = 20000; // تأخیر بین تراکنش‌ها به میلی‌ثانیه

  for (const [index, privateKey] of privateKeys.entries()) {
    const fromKeypair = getKeypairFromPrivateKey(privateKey);
    console.log(colors.yellow(`Sending SOL from account ${index + 1}: ${fromKeypair.publicKey.toString()}`));

    let transactionCount = 0;

    for (const address of randomAddresses) {
      const toPublicKey = new PublicKey(address);
      let amountToSend;

      do {
        amountToSend = parseFloat(randomFloatFromInterval(0.001, 0.0012));
      } while (amountToSend < rentExemptionAmount);

      try {
        await sendSol(fromKeypair, toPublicKey, amountToSend);
        console.log(colors.green(`Successfully sent ${amountToSend} SOL to ${address}`));
        transactionCount++;
      } catch (error) {
        console.error(colors.red(`Failed to send SOL to ${address}:`), error);
      }

      await delay(delayBetweenTx);
    }

    console.log(colors.blue(`Wallet: ${fromKeypair.publicKey.toString()}, Transactions: ${transactionCount}`));
    fs.appendFileSync('transactions.log', `Wallet: ${fromKeypair.publicKey.toString()}, Transactions: ${transactionCount}\n`);
  }
})();
