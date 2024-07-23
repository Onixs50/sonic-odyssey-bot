#!/bin/bash

# Clear the screen
clear

# Define ANSI escape sequences for colors
RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
RESET=$(tput sgr0)

# Define the rectangle design
rectangle() {
    local width=50
    local text="★ Coded by ONIXIA ★"
    local text_length=${#text}
    local padding=$(( (width - text_length - 4) / 2 ))

    # Print the top border
    echo -e "${RED}$(printf '%*s' "$width" '' | tr ' ' '*')${RESET}"
    
    # Print the middle line with text
    echo -e "${RED}*$(printf '%*s' "$padding" '' | tr ' ' ' ')${GREEN}${text}${RESET}$(printf '%*s' "$padding" '' | tr ' ' ' ')${RED}*${RESET}"

    # Print the bottom border
    echo -e "${RED}$(printf '%*s' "$width" '' | tr ' ' '*')${RESET}"
}

# Draw the rectangle
rectangle

# Define log file location
LOG_FILE="/root/sonic-odyssey-bot/loop-script.log"

# Clear the log file if it exists
if [ -f $LOG_FILE ]; then
    > $LOG_FILE
fi

# Function to run commands and log output
run_command() {
  local cmd=$1
  local start_time=$(date +'%Y-%m-%d %H:%M:%S')
  echo "[$start_time] Running: $cmd" | tee -a $LOG_FILE
  $cmd 2>&1 | tee -a $LOG_FILE
  local end_time=$(date +'%Y-%m-%d %H:%M:%S')
  echo "[$end_time] Finished: $cmd" | tee -a $LOG_FILE
}

# Function to log transactions
log_transaction() {
  local wallet_address=$1
  local transaction_count=$2
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] Wallet: $wallet_address, Transactions: $transaction_count" | tee -a $LOG_FILE
}

# Function to log claims
log_claim() {
  local claim_count=$1
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] Claim executed $claim_count times" | tee -a $LOG_FILE
}

# Initialize claim counter
claim_count=0

# Main loop
while true; do
  run_command "npm start"

  claim_count=$((claim_count + 1))
  run_command "npm run claim"
  log_claim $claim_count

  sleep 3600

  claim_count=$((claim_count + 1))
  run_command "npm run claim"
  log_claim $claim_count

  sleep 3600

  claim_count=$((claim_count + 1))
  run_command "npm run claim"
  log_claim $claim_count

  sleep 1800
done
