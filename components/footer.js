// components/Footer.js
import styles from '@/styles/footer.module.css'

export default function Footer() {
    return (
      <footer style={{ position: "absolute", bottom: 0, width:"100%" }} className={styles.footer}>
        <p>Data provided by Marvel. © 2014 Marvel</p>
        <p>
          Check out the Marvel API 
          <a href="https://developer.marvel.com/" target="_blank" rel="noopener noreferrer">Here</a>, 
        </p>
      </footer>
    );
  }
  