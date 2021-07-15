import React from 'react';
import styled from 'styled-components';
import AppLayout from './layout/AppLayout';
import SearchInput from './SearchInput';

const HeaderLayout = styled.header`
    width: 100%;
    background: #222;
    margin-bottom: 2rem;
`

const MainHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;

    h1 {
        font-size: 2rem;
        color: #fff;
        font-weight: bold;
    }
`;

const Header = () => {
    return (
        <HeaderLayout>
            <AppLayout>
                <MainHeader>
                    <h1>MUSICTUBE</h1>
                    <SearchInput />
                </MainHeader>
            </AppLayout>
        </HeaderLayout>
    );
};

export default Header;