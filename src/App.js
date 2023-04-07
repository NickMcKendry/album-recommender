import React, { useState } from "react";

import "./App.css";

import AlbumList from "./Components/AlbumList";
import SearchBar from "./Components/SearchBar";
import { searchAlbums } from "./services/spotify";

function App() {
  const [albums, setAlbums] = useState([]);
  const handleSearch = async (query) => {
    const albumResults = await searchAlbums(query);
    console.log("Album results:", albumResults); // Add this line to check the results
    setAlbums(albumResults);
  };

  console.log(albums);
  return (
    <div className="App">
      <h1>Album Recommender</h1>
      <SearchBar onSearch={handleSearch} />
      <AlbumList albums={albums} />
    </div>
  );
}

export default App;
