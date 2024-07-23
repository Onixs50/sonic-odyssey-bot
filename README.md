# Sonic Odyssey Bot

Sonic Odyssey Bot is an application designed for interacting with the Sonic Odyssey platform. It supports multiple features including sending SOL (Solana) cryptocurrency transactions, claiming rewards, opening mystery boxes, and daily login operations.

## Features

- **Transaction Sending**: Sends SOL transactions from multiple accounts to random addresses.
- **Claim Box**: Automates the process of claiming rewards boxes.
- **Open Box**: Automates the process of opening mystery boxes.
- **Daily Login**: Automates the daily login process.
- **Input Methods**: Supports input via seed phrases or private keys.
- **Random Address Generation**: Generates a specified number of random addresses for sending transactions.
- **Adjustable Amount of SOL**: Allows users to specify the amount of SOL to send in each transaction.
- **Transaction Delay**: Allows users to specify a delay between each transaction.

## Prerequisites

Install Nodejs18
```console
# Check Nodejs Version
node --version
# if 18, skip nodejs steps

# Delete Nodejs old files
sudo apt-get remove nodejs
sudo apt-get purge nodejs
sudo apt-get autoremove
sudo rm /etc/apt/keyrings/nodesource.gpg
sudo rm /etc/apt/sources.list.d/nodesource.list

# Install Nodejs 18
NODE_MAJOR=18
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install -y nodejs
node --version

# Install npm
sudo apt-get install npm
npm --version
```

```console
sudo apt-get install git

sudo apt update & sudo apt upgrade -y
```

## Installation

1. Clone the repository:

   ```bash
   https://github.com/Onixs50/sonic-odyssey-bot-EDITED-V.git
   ```

2. Navigate into the project directory:

   ```bash
   cd sonic-odyssey-bot
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Prepare input files:

   
   - Create `privateKeys.json` with an array of private keys (base58 encoded).
   - You can create a file with `nano` command: for example: nano `privateKeys.json`

   Example `accounts.json`:
   ```json


  
   [
     "base58_private_key_1",
     "base58_private_key_2"
   ]
   ```

## Installation and Setup
1. Install Screen
First, you need to install the Screen tool. Use the following command to install it:
```bash
screen -S sonic
```
```bash
cd sonic-odyssey-bot
chmod +x sonic.sh
bash sonic.sh

```
just run the sonic.sh
1. Specify the number of random addresses to generate.
bot will :
   - 1: Claim Box
   - 2: Open Box
   - 3: Daily Login
   - 4:104 transection
   - 5:chek for detail---->loop-script.log
 
     
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
