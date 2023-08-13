// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.css';

interface Movie {
  title: string;
  // year: number | string;
}

export function App() {
  const [vids, setVids] = useState<string[]>([]);
  useEffect(() => {
    fetch('http://localhost:3333/videos')
      .then((res) => res.json())
      .then((data) => setVids(data.files));
  }, []);

  return (
    <div className={styles.movieList}>
      {vids.map((m, i) => (
        <div key={i} className={styles.movieItem}>
          <p>{m}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
