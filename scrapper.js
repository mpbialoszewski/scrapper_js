const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

var Knwl = require('knwl.js');

let userAnswer;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


  function extractDomainName(email) {
    const knwlInstance = new Knwl();
    knwlInstance.init(email);
    
    const emails = knwlInstance.get('emails');
    if (emails.length === 1) {
      const parts = emails[0].address.split('@');
      if (parts.length === 2) {
        return parts[1];
      }
    }
    throw new Error('Invalid email format');
}

 const sampleAnswer= {
    1: 'alison@somecompany.com',
    2: 'john@somecompany.com',
    3: 'mark@somecompany.com'
}

async function Scrapper(userAnswer){

    try{
        let startTime = performance.now();
        answerFetch
        const domainName = extractDomainName(userAnswer);
        console.log(`Email provided: ${userAnswer} belongs to domain ${domainName}`);

        const endTime = performance.now();
        const duration = endTime - startTime;

    const fileName = 'data-acquisition-2023-08-15_18:20';
    const waitTime = console.log('Processing data, please wait....');
    const delay = pr => new Promise ( resolve => setTimeout(resolve,pr));
    waitTime
delay(duration).then(()=>{
    console.log(sampleAnswer);
    console.log(`File saved. Name of the file is ${fileName}`);
    console.log(`Time spent ${duration.toFixed(2)} miliseconds`)
    answerFetch();
    
});
    } catch(e){
        console.error(e)
    }

}
function answerFetch() {
    rl.question('Please enter e-mail address: ', (userAnswer) => {
      const knwlInstance = new Knwl();
      knwlInstance.init(userAnswer);
  
      const emails = knwlInstance.get('emails');
      if (emails.length === 1 && emails[0].address === userAnswer) {
        Scrapper(userAnswer);
      } else {
        console.log('Incorrect email address provided. Please try again');
        answerFetch();
      }
    });
  }

answerFetch();


/* Objectives 

1. User provides the e-mail address as string literal // DONE 
2. Checking if the input provided is a valid e-mail address, if not - return error and come back to previous task  // DONE 
3. IF email address is valid- take the chunk of domain and store is as variable // DONE 
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