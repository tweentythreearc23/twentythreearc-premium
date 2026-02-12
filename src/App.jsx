import React, { useState } from 'react';
import './App.css';

const mockMangaData = [
  { id: 1, title: 'My Hero Academia', description: 'A superhero manga', genre: 'Action' },
  { id: 2, title: 'One Piece', description: 'Pirate adventure', genre: 'Adventure' },
  { id: 3, title: 'Attack on Titan', description: 'Humanity’s fight for survival against titans', genre: 'Horror' },
  { id: 4, title: 'Naruto', description: 'Ninja adventures', genre: 'Action' },
  { id: 5, title: 'Death Note', description: 'A cat-and-mouse game with a death god', genre: 'Thriller' },
  { id: 6, title: 'Demon Slayer', description: 'Fight demons and grow stronger', genre: 'Action' },
  { id: 7, title: 'Fruits Basket', description: 'Romantic comedy with a twist', genre: 'Romance' },
  { id: 8, title: 'Sword Art Online', description: 'Virtual reality MMORPG', genre: 'Sci-fi' },
  // Additional mock data
  { id: 9, title: 'Tokyo Ghoul', description: 'A dark fantasy horror', genre: 'Horror' },
  { id: 10, title: 'Fullmetal Alchemist', description: 'Alchemy and bonds of brotherhood', genre: 'Adventure' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredManga = mockMangaData.filter(manga =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Manga List</h1>
      <input
        type="text"
        placeholder="Search for manga..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="manga-list">
        {filteredManga.map(manga => (
          <div key={manga.id} className="manga-item">
            <h2>{manga.title}</h2>
            <p>{manga.description}</p>
            <p><strong>Genre:</strong> {manga.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
