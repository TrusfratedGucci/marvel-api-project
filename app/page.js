"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchCharacters } from '../lib/marvelService';
import styles from '../styles/slideshow.module.css'

  export default function HomePage() {
    const [characters, setCharacters] = useState([]);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedCharacters = await fetchCharacters();
          setCharacters(fetchedCharacters);
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      if (characters.length > 0) {
        const interval = setInterval(() => {
          setCurrentCharacterIndex((prevIndex) => (prevIndex + 1) % characters.length);
        }, 5000); // Change image every 5 seconds
  
        return () => clearInterval(interval); // Cleanup the interval on component unmount
      }
    }, [characters]);
  
    return (
      <div>
        {characters.length > 0 && (
          <div className={styles.container}> 
            <div className={styles.text}>
              <h1>“Doth mother know you weareth her drapes?”</h1>
              <h3>- Tony Stark</h3>
              <br></br>
              <p>I must say, you do look quite dashing in those, my good sir.</p>
              <p>Welcome, traveller. You have stumbled upon my humble abode where </p>
            </div>
            <div className={styles.slideShow}>
              <Image
                src={`${characters[currentCharacterIndex].thumbnail.path}.${characters[currentCharacterIndex].thumbnail.extension}`}
                alt={characters[currentCharacterIndex].name}
                width={500}
                height={500}
                className={styles.image}
              />
              <p>{characters[currentCharacterIndex].name}</p>
            </div>
          </div>
        )}
      </div>
    );
  }