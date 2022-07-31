import { useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import icoSerch from 'src/assets/icons/list/icoSearch.svg';

type Props = {
  onChangeSearchKeywords: (e: string | undefined) => void;
};

function SearchBox({ onChangeSearchKeywords }: Props) {
  const [serchKeyword, setSearchKeyword] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const handleSearchClick = () => {
    console.log('[SEARCH_KEYWORD]:', serchKeyword);
    onChangeSearchKeywords(serchKeyword);
  };
  return (
    <SearchBoxdiv>
      <SearchInput
        onChange={handleChange}
        placeholder="검색어를 입력해주세요"
      />
      <SearchBtn>
        <SearchIcon
          src={icoSerch}
          alt=""
          // eslint-disable-next-line no-console
          onClick={handleSearchClick}
        />
      </SearchBtn>
    </SearchBoxdiv>
  );
}

export default SearchBox;

const SearchBoxdiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const SearchInput = styled.input`
  border-width: 0px;
  outline: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 100%;
  height: ${44 * RATIO}px;
  max-height: 44px;
  font-size: 16;
  font-weight: 400;
  padding-left: 16px;
  padding-right: 16px;
`;

const SearchBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: ${44 * RATIO}px;
  height: ${44 * RATIO}px;
  max-width: 44px;
  max-height: 44px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: ${20 * RATIO}px;
  height: ${20 * RATIO}px;
  max-width: 20px;
  max-height: 20px;
`;
