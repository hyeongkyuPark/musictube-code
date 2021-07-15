import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Player from './components/Player';
import SelectVideo from './components/SelectVideo';
import VideoList from './components/VideoList';
import GlobalStyles from './GlobalStyles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <SelectVideo />
      <VideoList />
      <Player />
    </ThemeProvider>
  );
}

export default App;
