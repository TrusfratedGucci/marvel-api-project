import axios from 'axios';
import md5 from 'md5';
require('dotenv').config();

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public';
const ts = new Date().getTime().toString();;
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
const apikey = PUBLIC_KEY;

const marvelService = axios.create({
  baseURL: BASE_URL,
});




export const getCharacterById = async (id) => {
  try {
    const response = await marvelService.get(`/characters/${id}`, {
      params: {
        ts,
        apikey,
        hash,
      },
    });
    console.log(`Fetched character data for ID: ${id}`, response.data.data.results[0]);
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching character data:', error);
    throw new Error('Error fetching character data:', error);
  }
};



export async function fetchCharacters() {
  const characterIds = [
    1009368,  // Iron Man
    1010740, // Winter Soldier
    1009407, // Loki
    1009257, // Cyclops
    1009220,  // Captain America
    1010733, // Peter Quill
    1010787, // Venom
    1010743, // Groot
    1009189,  // Black Widow
    1009718, // Wolverine
    1009610, // Spider-Man (Peter Parker)
    1010744, // Rocket
    1009268, // Deadpool
    1009327, // Jean Grey
    1009664,  // Thor
    1009465, // Mystique
    1009351,  // Hulk
    1009175, // Beast
    1009338,  // Hawkeye 
  ];

  const characters = await Promise.all(
    characterIds.map(async (id) => {
      try {
        const response = await getCharacterById(id);
        return response;
      } catch (error) {
        console.error(`Error fetching character with ID: ${id}`, error);
        return null;
      }
    })
  );

  return characters.filter(character => character !== null);
}





export const getCharacters = async (ids) => {
  const requests = ids.map(id => getCharacterById(id));
  try {
    const responses = await Promise.all(requests);
    return responses.map(response => response.data.data.results[0]);
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw new Error('Error fetching characters:', error);
  }
};






export const getEventById = async (id) => {
  try {
    const response = await marvelService.get(`/events/${id}`, {
      params: {
        ts,
        apikey: PUBLIC_KEY,
        hash,
      },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw new Error('Error fetching event data:', error);
  }
};