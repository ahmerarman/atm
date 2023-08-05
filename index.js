#!/usr/bin/env node
import inquirer from "inquirer";
let balance = Math.floor((Math.random() * 100000));
let answers1;
let answers2;
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
        /*    {
                type: "list",
                name: "transType",
                choices: ["Fast Cash", "Withdraw"],
                message: "Please select transaction type: ",
                when(answers1) {
                    return answers1.accountType;
                }
            },
            {
                type: "list",
                name: "amount",
                choices: [5000, 10000, 15000, 20000, 25000],
                message: `Please select your amount (Current Balance is ${balance}): `,
                when(answers1) {
                    return answers1.transType == "Fast Cash";
                }
            },
            {
                type: "number",
                name: "amount",
                message: `Please enter your amount (Current Balance is ${balance}): `,
                when(answers1) {
                    return answers1.transType == "Withdraw";
                }
            }*/
    ]);
    /*if(answers1.userID && answers1.userPin) {
        if(answers1.amount<=balance){
            balance -= answers1.amount;
            console.log(`Your current balance is: ${balance}`);
        }else{
            console.log(`Insuficient balance ${balance}`);
        }
    }*/
}
async function getTransaction() {
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
    ]);
    if (answers1.userID && answers1.userPin) {
        if (answers2.amount <= balance) {
            balance -= answers2.amount;
            console.log(`Your current balance is: ${balance}`);
        }
        else {
            console.log(`Insuficient balance ${balance}`);
        }
    }
}
async function startLoop() {
    await getUserID();
    do {
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "checkbox",
                name: "restart",
                choices: ['Yes', 'No'],
                message: "Do you want to continue: ",
            }
        ]);
    } while (again.restart == 'Yes');
}
startLoop();
