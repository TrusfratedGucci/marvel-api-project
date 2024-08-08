// components/CharacterSearch.js
import { useState } from 'react';
import { getCharacterByName } from '../lib/marvelService';
import Image from 'next/image';
import styles from '../styles/characterSearch.module.css'; // Import the CSS module

const CharacterSearch = () => {
  const [name, setName] = useState('');
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const characterData = await getCharacterByName(name);
      if (!characterData) {
        setCharacter(null);
        setError('Character not found');
      } else {
        setCharacter(characterData);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching character:', error);
      setCharacter(null);
      setError('Failed to fetch character');
    }
  };

  return (
    <div className={styles.characterSearchContainer}>
      <h2>Search Marvel Character</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter character name"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {character && (
        <div className={styles.characterContainer}>
          <h3>{character.name}</h3>
          <Image
            src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <p>{character.description || 'No description available'}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
