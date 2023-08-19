// Additonal objectives 
// 1. Provide date when the scrape was performed // TODO
// 2. Transform the data fetched into more readable data (JSON.Stringify) // TODO 
// 3. Add comments on the technologies used // TODO 
// 4. Add automatic tests // TODO 
// 5. Add README.md for documentation // TODO
// */


const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const Knwl = require('knwl.js');

// Initilising user input 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Extracting domain name from the e-mail by splitting it in half
function extractDomainName(email) {
    const knwlInstance = new Knwl('english');
    knwlInstance.init(email);

    const emails = knwlInstance.get('emails');
    if (emails.length === 1) {
        const parts = emails[0].address.split('@');
        if (parts.length === 2) {
            return parts[1];
        }
    }
    return null;
}

async function Scrapper(userAnswer) {
    try {
        let startTime = performance.now();
        const domainName = extractDomainName(userAnswer);

        if (!domainName) {
            console.error('Invalid email address provided. Please try again.');
            answerFetch();
            return;
        }

        const response = await axios.get(`https://${domainName}`);
        console.log(`Response: ${response.status}`);

        if (response.status >= 200 && response.status < 300) {
            console.log(`Email provided: ${userAnswer} belongs to domain ${domainName}`);
            const html = response.data;
            const $ = cheerio.load(html);
            const htmlText = $('body').text();

            //Setting parameters for parsing data 
            const knwlInstance = new Knwl('english');
            knwlInstance.register('places', require('knwl.js/default_plugins/places'));
            knwlInstance.register('phones', require('knwl.js/default_plugins/phones'));
            knwlInstance.init(htmlText);
            const emails = knwlInstance.get('emails');
            const phoneNumbers = knwlInstance.get('phones');
            const addresses = knwlInstance.get('places');

            //Removing duplicates 
            const uniqueEmailAddresses = new Set(emails.map(email => email.address));
            const uniquePhoneNumbers = new Set(phoneNumbers.map(phone => phone.phone));
            const uniqueAddresses = new Set(addresses.map(adr => adr.place));

            console.log('Scraped data:');
            Array.from(uniqueEmailAddresses).length > 0 ? console.log(`Emails found:${uniqueEmailAddresses.size} ->`, Array.from(uniqueEmailAddresses).join(', ')) : console.log('No results for emails have been found.');
            Array.from(uniquePhoneNumbers).length > 0 ? console.log(`Phones found:${uniquePhoneNumbers.size} ->`, Array.from(uniquePhoneNumbers).join(', ')) : console.log('No results for phone numbers have been found.');
            Array.from(uniqueAddresses).length > 0 ? console.log(`Addresses found:${uniqueAddresses.size} ->`, Array.from(uniqueAddresses).join(', ')) : console.log('No results for addresses / places have been found.');
        }


        const endTime = performance.now();
        const duration = endTime - startTime;
        // Sending response based on the time spent on scraping 
        const delay = pr => new Promise(resolve => setTimeout(resolve, pr));
        delay(duration).then(() => {
            console.log(`Time spent ${duration.toFixed(2)} milliseconds`);
            answerFetch();
        });
    } catch (error) {
        console.error('Failed to fetch website:', error.message);
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
*/