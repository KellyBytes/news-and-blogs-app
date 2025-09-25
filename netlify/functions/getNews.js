const axios = require('axios');

exports.handler = async (event) => {
  try {
    const API_KEY = process.env.GNEWS_API_KEY;

    let url = `https://gnews.io/api/v4/top-headlines?lang=en&country=ca&apikey=${API_KEY}`;
    const { queryStringParameters } = event;

    if (queryStringParameters && queryStringParameters.q) {
      url = `https://gnews.io/api/v4/search?q=${queryStringParameters.q}&lang=en&country=ca&apikey=${API_KEY}`;
    }

    const response = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error('Function error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
