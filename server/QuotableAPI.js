const axios = require('axios');

const uri = "http://api.quotable.io/random";

const getData = () => {
    return axios.get(uri)
        .then(response => response.data.content.split(" "));
}

module.exports = getData;
