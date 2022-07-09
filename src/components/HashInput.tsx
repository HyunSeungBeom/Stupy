/* eslint-disable @typescript-eslint/no-namespace */
import React, { useCallback, useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from 'styled-components';

export default function HashInput() {
  // onChange로 관리할 문자열
  const [hashtag, setHashtag] = useState<string | ''>('');
  // 해시태그를 담을 배열
  const [hashArr, setHashArr] = useState<string[] | []>([]);
  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  };

  const onKeyUp = useCallback(
    (e: any) => {
      if (typeof navigator !== 'undefined') {
        /* 요소 불러오기, 만들기 */
        const $HashWrapOuter = document.querySelector('.HashWrapOuter');
        const $HashWrapInner = document.createElement('div');
        $HashWrapInner.className = 'HashWrapInner';

        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener('click', () => {
          $HashWrapOuter?.removeChild($HashWrapInner);
          console.log($HashWrapInner.innerHTML);
          setHashArr(hashArr.filter((hashtag) => hashtag));
        });

        /* enter 키 코드 :13 */
        if (
          e.keyCode === 188 ||
          (e.keyCode === 13 && e.target.value.trim() !== '')
        ) {
          console.log('Enter Key 입력됨!', e.target.value);
          $HashWrapInner.innerHTML = `#${e.target.value}`;
          $HashWrapOuter?.appendChild($HashWrapInner);
          setHashArr((hashArr) => [...hashArr, hashtag]);
          setHashtag('');
        }
      }
    },
    [hashtag, hashArr],
  );
  return (
    <div className="HashWrap" css={hashDivrap}>
      <div className="HashWrapOuter" />
      <OrangeInput
        className="HashInput"
        type="text"
        value={hashtag}
        onChange={onChangeHashtag}
        onKeyUp={onKeyUp}
        placeholder="해시태그 입력"
      />
    </div>
  );
}

/* emotion css 태그 */

const hashDivrap = css`
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border-bottom: 1.6px solid #ff6e35;
  padding: 2px 2px 8px 2px;

  .HashWrapOuter {
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    margin-top: 5px;
    background: #ffeee7;
    border-radius: 56px;
    padding: 8px 12px;
    color: #ff6e35;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 20px;
    margin-right: 5px;
    cursor: pointer;
  }

  .HashInput {
    width: auto;
    margin: 10px;
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
  }
`;
const OrangeInput = styled.input`
  width: 326px;
  font-size: 14px;
  border: none;
  border-bottom: #f8dac9 2px solid;
  outline: none;
`;
