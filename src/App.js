import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Players from './pages/Players';
import GameSummaries from './pages/GameSummaries';
import NoPage from './pages/NoPage';
import { Box, IconButton, Tooltip, CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFF' }}>
        <CssBaseline />
        <Box component="main" sx={{ flexGrow: 1, p: 3, paddingBottom: '75px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game-summaries" element={<GameSummaries />} />
            <Route path="/players" element={<Players />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Box>
        <Box
          sx={{
            width: '100%',
            bgcolor: '#FDFDFD',
            p: 2,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around', // Space icons evenly
            alignItems: 'center',
            zIndex: 200
          }}
          style={{
            boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.2)', // More prominent shadow
          }}
        >
          <Tooltip title="Home" placement="top">
            <IconButton component={Link} to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Game Summaries" placement="top">
            <IconButton component={Link} to="/game-summaries">
              <SummarizeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Players" placement="top">
            <IconButton component={Link} to="/players">
              <PeopleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Leaderboards" placement="top">
            <IconButton component={Link} to="/leaderboards">
              <LeaderboardIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
