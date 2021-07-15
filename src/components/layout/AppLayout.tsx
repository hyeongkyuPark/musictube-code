import React from 'react';
import styled from 'styled-components';

type AppLayoutProps = {
    children: React.ReactNode,
}

const LayoutBlock = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media ${({ theme }) => theme.device.pc} {
        padding: 0;
    }
`;

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <LayoutBlock>
            {children}
        </LayoutBlock>
    )
};

export default AppLayout;