import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Link } from 'react-router-dom';

interface Movie {
  title: string;
  // year: number | string;
}

export function App() {
  return (
    <div>
      <h1>App</h1>
      <Link to={'/videos'}>Videos</Link>
    </div>
  );
}

export default App;
