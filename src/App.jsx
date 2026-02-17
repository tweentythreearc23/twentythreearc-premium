import React, { useState, useEffect } from 'react';
import './styles.css';

const mockMangaData = [
  { id: 1, title: 'My Hero Academia', description: 'A superhero manga', genre: 'Action' },
  { id: 2, title: 'One Piece', description: 'Pirate adventure', genre: 'Adventure' },
  { id: 3, title: 'Attack on Titan', description: 'Humanity’s fight for survival against titans', genre: 'Horror' },
  { id: 4, title: 'Naruto', description: 'Ninja adventures', genre: 'Action' },
  { id: 5, title: 'Death Note', description: 'A cat-and-mouse game with a death god', genre: 'Thriller' },
  { id: 6, title: 'Demon Slayer', description: 'Fight demons and grow stronger', genre: 'Action' },
  { id: 7, title: 'Fruits Basket', description: 'Romantic comedy with a twist', genre: 'Romance' },
  { id: 8, title: 'Sword Art Online', description: 'Virtual reality MMORPG', genre: 'Sci-fi' },
  { id: 9, title: 'Tokyo Ghoul', description: 'A dark fantasy horror', genre: 'Horror' },
  { id: 10, title: 'Fullmetal Alchemist', description: 'Alchemy and bonds of brotherhood', genre: 'Adventure' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [favorites, setFavorites] = useState([]);
  const [filterGenre, setFilterGenre] = useState('All');
  const [activeTab, setActiveTab] = useState('All');

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Set site name in browser tab
  useEffect(() => {
    document.title = "TweentyThreeArc";
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const scrollToList = () => {
    const listSection = document.getElementById('manga-list');
    if (listSection) {
      listSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredManga = mockMangaData.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === 'All' || manga.genre === filterGenre;
    const matchesTab = activeTab === 'All' || (activeTab === 'Favorites' && favorites.includes(manga.id));
    return matchesSearch && matchesGenre && matchesTab;
  });

  return (
    <div className={`App ${theme}`}>
      <header>
        <div className="site-title">
          <h1>TweentyThreeArc</h1>
          <p className="tagline">Your Manga Universe</p>
        </div>
        <button className="button" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      {/* Hero Banner */}
      <section className="hero">
        <h2>Discover, Save & Explore Manga</h2>
        <p>Browse your favorite titles, filter by genre, and build your personal collection.</p>
        <button className="button hero-btn" onClick={scrollToList}>
          Start Exploring
        </button>
      </section>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`button ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All Manga
        </button>
        <button
          className={`button ${activeTab === 'Favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('Favorites')}
        >
          Favorites
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search for manga..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Genre Filter */}
      <div className="filters">
        <label>Filter by Genre: </label>
        <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
          <option value="Sci-fi">Sci-fi</option>
        </select>
      </div>

      {/* Manga List */}
      <div id="manga-list" className="manga-list">
        {filteredManga.map(manga => (
          <div key={manga.id} className="manga-item">
            <h2>{manga.title}</h2>
            <p>{manga.description}</p>
            <p><strong>Genre:</strong> {manga.genre}</p>
            <button
              className={`button ${favorites.includes(manga.id) ? 'fav' : ''}`}
              onClick={() => toggleFavorite(manga.id)}
            >
              {favorites.includes(manga.id) ? '★ Favorite' : '☆ Add to Favorites'}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} TweentyThreeArc. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;