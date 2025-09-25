import axios from 'axios';

export async function handler(event) {
  const API_KEY = process.env.VITE_GNEWS_API_KEY;
  const category = event.queryStringParameters.category || 'general';
  const search = event.queryStringParameters.search || '';

  let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=ca&apikey=${API_KEY}`;

  if (search) {
    url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=ca&apikey=${API_KEY}`;
  }

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
