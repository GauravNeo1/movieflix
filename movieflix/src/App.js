import './App.css';
import { DataProvider } from './DataContext/DataContext';
import MovieFlix from './pages/MovieFlix';

function App() {
  return (
    <div className="App">
        <DataProvider>
            <MovieFlix />
        </DataProvider>
    </div>
  );
}

export default App;
