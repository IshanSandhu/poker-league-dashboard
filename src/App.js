import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Players from './pages/Players';
import GameSummaries from './pages/GameSummaries';
import NoPage from './pages/NoPage';
import { Box, IconButton, Tooltip, CssBaseline, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#FFFFF'}}>
        <CssBaseline />
        <Box
          sx={{
            width: '80px',
            bgcolor: '#FDFDFD',
            
            p: 2,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            //justifyContent: 'center',
          }}

          style={{ 
            // straight right fade box shadow
            boxShadow: '10px 0px 10px 0px rgba(0,0,0,0.05)',
          }}
        >
          <Tooltip title="Home" placement="right">
            <IconButton component={Link} to="/" sx={{ mb: 2 }}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Game Summaries" placement="right">
            <IconButton component={Link} to="/game-summaries" sx={{ mb: 2 }}>
              <SummarizeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Players" placement="right">
            <IconButton component={Link} to="/players" sx={{ mb: 2 }}>
              <PeopleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Leaderboards" placement="right">
            <IconButton component={Link} to="/leaderboards" sx={{ mb: 2 }}>
              <LeaderboardIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '100px'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game-summaries" element={<GameSummaries />} />
            <Route path="/players" element={<Players />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
