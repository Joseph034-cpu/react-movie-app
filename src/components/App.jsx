import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  const handleSearch = (searchQuery) => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
