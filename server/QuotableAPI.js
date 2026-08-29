const axios = require('axios');
    
const uri = "http://api.quotable.io/random";

const fallbackQuotes = [
    "It is not enough to have a good mind; the main thing is to use it well.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Life is what happens when you're busy making other plans.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail."
];

const getData = async () => {
    try {
        const response = await axios.get(uri, { timeout: 2000 });
        return response.data.content.split(" ");
    } catch (e) {
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        return randomQuote.split(" ");
    }
}

module.exports = getData;
