const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');


// Placeholder for knwl 
// const knwl = require('knwl');

let userAnswer;
const domain = 'somecompany.com'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


 const sampleAnswer= {
    1: 'alison@somecompany.com',
    2: 'john@somecompany.com',
    3: 'mark@somecompany.com'
}

async function Scrapper(userAnswer){

    try{
        answerFetch
        console.log(`Email provided: ${userAnswer} belongs to domain ${domain}`);

    const fileName = 'data-acquisition-2023-08-15_18:20';
    const waitTime = console.log('Processing data, please wait....');
    const delay = pr => new Promise ( resolve => setTimeout(resolve,pr));
    waitTime
delay(3000).then(()=>{
    console.log(sampleAnswer);
    console.log(`File saved. Name of the file is ${fileName}`);
    answerFetch();
    
});
    } catch(e){
        console.error(e)
    }

}
function answerFetch(){
    rl.question('Please enter e-mail address:', userAnswer =>{
   //https://www.w3schools.com/jsref/jsref_regexp_test.asp
    if (!emailRegEx.test(userAnswer)){
        console.log('Incorrect email address provided. Please try again');
        answerFetch();
    }else
    {
        Scrapper(userAnswer);
    }
    });
}

answerFetch();


/* Objectives 

We often get email addresses from 
our clients (ex: alison@somecompany.com).
Given this data we’d really 
like to obtain additional information 
about the company (Address, Phone Number, Other Email Addresses etc…).
The task is to build a Node.js console based web-scraper - 
which given an email address, visits the web-page and programmatically 
extracts any relevant information to echo to the screen.


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