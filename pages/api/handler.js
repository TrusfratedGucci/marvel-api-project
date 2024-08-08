// pages/api/handler.js
import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public';

export default async function handler(req, res) {
  const { ids, name } = req.query;

  const ts = new Date().getTime().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

  try {
    if (name) {
      // Fetch character by name
      const response = await axios.get(`${BASE_URL}/characters`, {
        params: {
          ts,
          apikey: PUBLIC_KEY,
          hash,
          name,
        },
      });
      if (response.data.data.results.length === 0) {
        return res.status(404).json({ error: 'Character not found' });
      }
      res.status(200).json(response.data);
    } else if (ids) {
      // Fetch characters by IDs
      const characterIds = ids.split(',').map(id => id.trim());
      const responses = await Promise.all(
        characterIds.map(id => axios.get(`${BASE_URL}/characters/${id}`, {
          params: { ts, apikey: PUBLIC_KEY, hash },
        }))
      );
      const characters = responses.map(response => response.data.data.results[0]);
      res.status(200).json({ data: { results: characters } });
    } else {
      res.status(400).json({ error: 'No query parameters provided' });
    }
  } catch (error) {
    console.error('Error fetching data from Marvel API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Marvel API', details: error.message });
  }
}
