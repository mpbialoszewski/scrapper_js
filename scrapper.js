const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

var Knwl = require('knwl.js');

let userAnswer;
let emailAddresses = [];

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
      console.log(parts)
      if (parts.length === 2) {
        return parts[1];
      }
      for (const email of emails) {
        emailAddresses.push(email.address);
      }
    }
}
async function Scrapper(userAnswer){

    try{
        const domainName = extractDomainName(userAnswer);
        const response = await axios.get(`https://${domainName}`);
        console.log(`Response:${response.status}`)
        // Check if the response status is successful (2xx)
        if (response.status >= 200 && response.status < 300) {
            const html = response.data;
            const $ = cheerio.load(html);
            const htmlText = $('body').text();

            const knwlInstance = new Knwl();
            knwlInstance.init(htmlText);

            const emails = knwlInstance.get('emails');
            const emailAddresses = emails.map(email => email.address);
            if (emailAddresses.length > 0){
              console.log('Scraped email addresses:', emailAddresses);
            } else 
            {
              console.error('No email addresses found related to that domain. Please try again');
              answerFetch();
            }

        } else 
        {
            console.log('Failed to connect to website. This could be related to CORS policy. Try again.');
        }
      
        let startTime = performance.now();
        answerFetch
 
        console.log(`Email provided: ${userAnswer} belongs to domain ${domainName}`);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
    const delay = pr => new Promise ( resolve => setTimeout(resolve,pr));
delay(duration).then(()=>{
    console.log(`Time spent ${duration.toFixed(2)} miliseconds`)
    answerFetch();
    
});
    } catch (error) {
      console.error('Failed to fetch website:', error.message)
      console.log('Please check if the input provided is correct and try again.');
      answerFetch();
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
4 The scrapper fetches the website address and establishes connection // DONE 
5. The website iterates through the website and searches for e-mail addresses (us) // DONE 
6. The email addresses are parsed and logged to the console.  // DONE 


Additonal objectives 
1. Provide date when the scrape was performed // TODO
2. Transform the data fetched into more readable data (JSON.Stringify) // TODO 
3. Add comments on the technologies used // TODO 
4. Add automatic tests // TODO 
5. Add README.md for documentation // TODO 
*/