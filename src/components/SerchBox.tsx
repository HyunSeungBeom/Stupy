import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

function SearchBox() {
  const [search, Setsearch] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Setsearch(e.target.value);
  };
  return (
    <SearchBoxdiv>
      <SearchInput
        type="text"
        className="input-sm"
        size={25}
        onChange={handleChange}
      />
      <SearchIcon>
        <FiSearch />
      </SearchIcon>
    </SearchBoxdiv>
  );
}

export default SearchBox;

const SearchBoxdiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 50%;
`;

const SearchInput = styled.input`
  border-radius: 8px;
  width: 100%;
  height: 30px;
`;

const SearchIcon = styled.div`
  background: white;
  border-radius: 8px;
`;
