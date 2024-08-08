// lib/marvelService.js
import axios from 'axios';

const BASE_URL = '/api/handler';  // Updated to call  API route

const marvelService = axios.create({
  baseURL: BASE_URL,
});

export const getCharacterById = async (id) => {
  try {
    const response = await marvelService.get('/', {
      params: { ids: id },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching character data:', error);
    throw new Error('Error fetching character data:', error);
  }
};

export const fetchCharacters = async () => {
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

  try {
    const response = await marvelService.get('/', {
      params: { ids: characterIds.join(',') },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw new Error('Error fetching characters:', error);
  }
};

export const getCharacterByName = async (name) => {
  try {
    const response = await marvelService.get('/', {
      params: { name },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching character data by name:', error);
    throw new Error('Error fetching character data by name:', error);
  }
};

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
    const response = await marvelService.get(`/events/${id}`);
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw new Error('Error fetching event data:', error);
  }
};
