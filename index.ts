#!/usr/bin/env node

import inquirer from "inquirer";

interface ansType {
    userID: string,
    userPin: number,
    accountType: string,
    transType: string,
    amount: number
}

let balance: number = Math.floor((Math.random()*100000));
let answers1: ansType;
let answers2: ansType;

async function getUserID() {
    answers1 = await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            message: "Please enter your User ID: "
        },
        {
            type: "number",
            name: "userPin",
            message: "Please enter your PIN: "
        },
        {
            type: "list",
            name: "accountType",
            choices: ["Current", "Saving"],
            message: "Please select account type: "
        },
    ])
}

async function getTransaction(){
    answers2 = await inquirer.prompt([
        {
            type: "list",
            name: "transType",
            choices: ["Fast Cash", "Withdraw"],
            message: "Please select transaction type: ",
        },
        {
            type: "list",
            name: "amount",
            choices: [5000, 10000, 15000, 20000, 25000],
            message: `Please select your amount (Current Balance is ${balance}): `,
            when(answers2) {
                return answers2.transType == "Fast Cash";
            }
        },
        {
            type: "number",
            name: "amount",
            message: `Please enter your amount (Current Balance is ${balance}): `,
            when(answers2) {
                return answers2.transType == "Withdraw";
            }
        }
    ])

    if(answers1.userID && answers1.userPin) {
        if(answers2.amount<=balance){
            balance -= answers2.amount;
            console.log(`Your current balance is: ${balance}`);
        }else{
            console.log(`Insuficient balance ${balance}`);
        }
    }
}

async function startLoop() {
    await getUserID();
    do{
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "checkbox",
                name: "restart",
                choices: ['Yes', 'No'],
                message: "Do you want to continue: ",
            }
        ]);
    }while(again.restart == 'Yes');
}

startLoop();