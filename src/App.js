import logo from "./logo.svg";
import "./App.css";

import SearchBar from "./Components/SearchBar";

function App() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div className="App">
      <h1>Album Recommender</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
