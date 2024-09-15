import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Box, Typography, Paper
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fetchPlayerStats } from '../sheets'; 
import { formatCurrency } from '../formatCurrency';

function PlayerRow({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.playerName}</TableCell>
        <TableCell>{row.gamesPlayed}</TableCell>
        <TableCell>{row.avgPlayers}</TableCell>
        <TableCell>{formatCurrency(row.totalBuyIn)}</TableCell>
        <TableCell>{formatCurrency(row.totalBuyBack)}</TableCell>
        <TableCell>{formatCurrency(row.totalIn)}</TableCell>
        <TableCell>{formatCurrency(row.totalOut)}</TableCell>
        <TableCell>{formatCurrency(row.totalWinnings)}</TableCell>
        <TableCell>{formatCurrency(row.winningsPerGame)}</TableCell>
        <TableCell>{row.return}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Player Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Cash Games Played</TableCell>
                    <TableCell>AVG Players Playing</TableCell>
                    <TableCell>Buy In $</TableCell>
                    <TableCell>Buy Back $</TableCell>
                    <TableCell>Total $ In</TableCell>
                    <TableCell>Total $ Out</TableCell>
                    <TableCell>Winnings</TableCell>
                    <TableCell>Winnings/Game</TableCell>
                    <TableCell>Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.gamesPlayed}</TableCell>
                    <TableCell>{row.avgPlayers}</TableCell>
                    <TableCell>{formatCurrency(row.totalBuyIn)}</TableCell>
                    <TableCell>{formatCurrency(row.totalBuyBack)}</TableCell>
                    <TableCell>{formatCurrency(row.totalIn)}</TableCell>
                    <TableCell>{formatCurrency(row.totalOut)}</TableCell>
                    <TableCell>{formatCurrency(row.totalWinnings)}</TableCell>
                    <TableCell>{formatCurrency(row.winningsPerGame)}</TableCell>
                    <TableCell>{row.return}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function PlayerTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch and set the player stats data
    fetchPlayerStats().then(data => setRows(data));
  }, []);

  return (
    <>
        < Typography variant="h4" component="h1" gutterBottom style={{ marginBottom: '30px' }}>
            Player Statistics
        </Typography>
        <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 2 }} style={{ borderRadius: '10px' }}>
        <Table aria-label="collapsible table">
            <TableHead style={{ backgroundColor: '#F0F0F0' }}>
            <TableRow>
                <TableCell />
                <TableCell>Player</TableCell>
                <TableCell>Games Played</TableCell>
                <TableCell>AVG Players</TableCell>
                <TableCell>Buy In $</TableCell>
                <TableCell>Buy Back $</TableCell>
                <TableCell>Total $ In</TableCell>
                <TableCell>Total $ Out</TableCell>
                <TableCell>Winnings</TableCell>
                <TableCell>Winnings/Game</TableCell>
                <TableCell>Return</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <PlayerRow key={row.playerName} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}
