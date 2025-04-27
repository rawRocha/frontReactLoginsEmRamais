import React, { useEffect, useState } from 'react';
import './style.css';

interface SearchInputProps {
  onSearch: (term: string) => void;
  resetPage?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, resetPage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
      if (resetPage) resetPage();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar ramal ou usuário..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
