import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { searchVideo } from '../modules/videoModule';

const SearchBox = styled.form`
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem;
    background: #fff;
    border-radius: 100px;

    input {
        width: 15rem;
        flex: 0 0 auto;
        border: none;
        outline: none;
        background: rgba(255, 255, 255, 0);
    }

    button {
        flex: 0 0 auto;
        border: none;
        outline: none;
        background: inherit;
        font-size: 1.2rem;
        span {
            display: block;
            width: 0;
            height: 0;
            overflow: hidden;
        }
    }
`;

const SearchInput = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim() === '') return;
        dispatch(searchVideo(input));
    }

    return (
        <SearchBox onSubmit={onSubmit}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit"><span>검색</span><FontAwesomeIcon icon={faSearch} /></button>
        </SearchBox>
    );
}

export default SearchInput;
