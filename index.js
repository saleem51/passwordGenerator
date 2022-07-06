#!/usr/bin/env node
import { Command } from "commander";
import clipboard from "clipboardy";
import os from "os";
import * as fs from "fs";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const programm = new Command();
const __dirname = dirname(fileURLToPath(import.meta.url));


//Initialisation du projet 
programm
    .version("1.0.0")
    .description("Simple random secure password generator")
    .option('-l, --length <number>',' length of password', '8' )
    .option('-s, --save', 'save the password to secrets.txt')
    .option("-nn, --no-numbers", "password to not include numbers")
    .option("-ns, --no-symbols", "password to not include symbols")
    .parse();


    //creer le password par defaut
const { length, save, numbers, symbols } = programm.opts();
const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const integers = "0123456789";
const exCharacters = "!@#$%^&*_-=+";

const createPassword = (length, hasNumbers, hasSymbols) => {
    let chars = alpha;
    if(hasNumbers) {
        chars += integers;
    }
    if(hasSymbols) {
        chars += exCharacters
    }
    return generatePassword(length, chars);
}


//Format le password
const generatePassword = (length, chars) => {
    let password = "";
    for(let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return password
}

//Sauve le password
const savePassword = (password) => {
    fs.open(path.join(__dirname, "/", "password.txt"), "a", 777, (e, id) => {
        fs.write(id, password + os.EOL, null, "utf-8", () => {
            fs.close(id, () => {
                console.log("Password saved !");
            })
        })
    })
}


const generatedPassword = createPassword(length, numbers, symbols);
if(save) {
    savePassword(generatedPassword);
}


//copie the code to the cplipboard
clipboard.writeSync(generatedPassword);

console.log(generatedPassword);