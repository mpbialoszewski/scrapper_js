const axios = require('axios');
const cheerio = require('cheerio');
const rl = require('readline');


/*
var Knwl = require("./knwl.js");
var knwlInstance = new Knwl('english');

This module doesn't work, Error: Cannot find module './knwl.js'
npm i knwl.js doesn't help neither installing it globally.
Tried it on Windows 11 and MacOS Mojave
*/
// What is the best way to use the regex ? I know that knwl.js has the good validation code for that 
async function Scrapper(){
const emailRegEx = "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"

const sampleAnswer= {
    1: 'alison@somecompany.com',
    2: 'john@somecompany.com',
    3: 'mark@somecompany.com'

}
//Placeholder 
const domain = 'somecompany.com'


console.log('Please enter e-mail address:');
console.log(`Email provided: alison@somecompany.com, belongs to domain ${domain}`)
const waitTime = console.log('Processing data, please wait....');
const delay = pr => new Promise ( resolve => setTimeout(resolve,pr))
    waitTime
delay(3000).then(()=>{
    console.log(sampleAnswer);
    
});

}
Scrapper();

/* Objectives 

We often get email addresses from 
our clients (ex: alison@somecompany.com).
Given this data we’d really 
like to obtain additional information 
about the company (Address, Phone Number,
     Other Email Addresses etc…).
The task is to build a Node.js 
console based web-scraper - 
which given an email address, 
visits the web-page and programmatically 
extracts any relevant information to 
echo to the screen.


1. User provides the e-mail address as string literal
2. Checking if the input provided is a valid e-mail address, if not - return error and come back to previous task 
3. IF email address is valid- take the chunk of domain and store is as variable 
4 The scrapper goes to the website and searches any email addresses related to that domain 
5. The email addresses are parsed and exported to the file (what file? Do we store it locally ? Or we just show the results in console ?)
Q1. Question - Do we narrow our searches only 
 to e-mail address or also name and phone number ?
Q2. Do I need store that data in some form (such as JSON or CSV file? )


Example startup

Please enter e-mail address searched 
...
Loading

Results
1. (email)
2. (email)

ELSE 

No results found, please check your input and try again.

WRONG INPUT PROVIDED: 

Wrong input provded, please check if you provided valid e-mail address and try again.

Additonal objectives 
1. Provide date when the scrape was performed 
2. Transform the data fetched into more readable data (Parsing)
*/