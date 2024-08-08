import Image from 'next/image';

export default function Card() {
    return (
        <div className={styles.card}>
            <Image 
                src={`${thumbnail.path}.${thumbnail.extension}`} 
                alt={name} 
                className={styles.thumbnail}
            />
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.description}>{description || "No description available."}</p>
            <div className={styles.links}>
                {urls.map((url) => (
                <a key={url.type} href={url.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {url.type.charAt(0).toUpperCase() + url.type.slice(1)}
                </a>
                ))}
            </div>
        </div>
    );
};