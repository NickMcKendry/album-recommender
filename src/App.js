import React, { useState } from "react";

import logo from "./logo.svg";
import "./App.css";

import AlbumList from "./Components/AlbumList";
import SearchBar from "./Components/SearchBar";
import { searchAlbums } from "./services/spotify";

function App() {
  const [albums, setAlbums] = useState([]);
  const handleSearch = async (query) => {
    const albumResults = await searchAlbums(query);
    setAlbums(albumResults);
  };

  return (
    <div className="App">
      <h1>Album Recommender</h1>
      <SearchBar onSearch={handleSearch} />
      <AlbumList albums={albums} />
    </div>
  );
}

export default App;
