import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Box, Typography, Paper
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fetchGameSummaries } from '../sheets'; // Import the fetch function

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.gameNumber}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{row.playersPlaying}</TableCell>
        <TableCell>{row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Game Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Player</TableCell>
                    <TableCell>Buy In $</TableCell>
                    <TableCell>Buy Back $</TableCell>
                    <TableCell>Total $ In</TableCell>
                    <TableCell>Total $ Out</TableCell>
                    <TableCell>Winnings</TableCell>
                    <TableCell>Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.players.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell>{player.player}</TableCell>
                      <TableCell>{player.buyIn}</TableCell>
                      <TableCell>{player.buyBack}</TableCell>
                      <TableCell>{player.totalIn}</TableCell>
                      <TableCell>{player.totalOut}</TableCell>
                      <TableCell>{player.winnings}</TableCell>
                      <TableCell>{player.return}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch and set the game summaries data
    fetchGameSummaries().then(data => setRows(data));
  }, []);

  return (
    <>
      < Typography variant="h4" component="h1" gutterBottom style={{ marginBottom: '30px' }}>
        Game Summaries
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 2 }} style={{ borderRadius: '10px' }}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: '#F0F0F0' }}>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell>Game #</TableCell>
              <TableCell>Location</TableCell>
              <TableCell># Players</TableCell>
              <TableCell>Total $</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.gameNumber} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
