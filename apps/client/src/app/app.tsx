import { Link } from 'react-router-dom';

export function App() {
  return (
    <div>
      <h1>App</h1>
      <Link to={'/videos'}>Videos</Link>
    </div>
  );
}

export default App;
