import { useState, useEffect } from "react";

const library = [
  { title: "Solo Leveling", rating: "9.2", status: "Ongoing" },
  { title: "One Piece", rating: "9.5", status: "Ongoing" }
];

export default function App() {
  const [dark, setDark] = useState(true);
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (title) => {
    if (bookmarks.includes(title)) {
      setBookmarks(bookmarks.filter((b) => b !== title));
    } else {
      setBookmarks([...bookmarks, title]);
    }
  };

  return (
    <div className={dark ? "dark" : "light"}>
      <header>
        <h1>TwentyThreeArc Premium</h1>
        <button onClick={() => setDark(!dark)}>
          Toggle {dark ? "Light" : "Dark"} Mode
        </button>
      </header>

      <main>
        {library.map((item, i) => (
          <div key={i} className="card">
            <h3>{item.title}</h3>
            <p>⭐ {item.rating} • {item.status}</p>
            <button onClick={() => toggleBookmark(item.title)}>
              {bookmarks.includes(item.title) ? "Remove Bookmark" : "Bookmark"}
            </button>
          </div>
        ))}
      </main>

      <footer>© 2026 TwentyThreeArc Premium</footer>
    </div>
  );
}
