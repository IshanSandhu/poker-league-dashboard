import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Box, Typography, Paper
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fetchPlayerStats } from '../sheets'; 
import { formatCurrency } from '../formats';
import { formatPercentage } from '../formats';
import styles from '../CollapsibleTable.module.css';

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
        <TableCell className={styles.bodyCell}>{row.playerName}</TableCell>
        <TableCell className={styles.bodyCell}>{row.gamesPlayed}</TableCell>
        <TableCell className={styles.bodyCell}>{row.avgPlayers}</TableCell>
        <TableCell className={styles.bodyCell}>{formatCurrency(row.totalBuyIn)}</TableCell>
        <TableCell className={styles.bodyCell}>{formatCurrency(row.totalBuyBack)}</TableCell>
        <TableCell className={styles.bodyCell}>{formatCurrency(row.totalIn)}</TableCell>
        <TableCell className={styles.bodyCell}>{formatCurrency(row.totalOut)}</TableCell>
        <TableCell className={styles.bodyCell}>{formatCurrency(row.totalWinnings)}</TableCell>
        <TableCell className={styles.bodyCell}>{formatCurrency(row.winningsPerGame)}</TableCell>
        <TableCell className={styles.bodyCell}>{row.return}</TableCell>
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
                    <TableCell className={styles.bodyCell}>Cash Games Played</TableCell>
                    <TableCell className={styles.bodyCell}>AVG Players Playing</TableCell>
                    <TableCell className={styles.bodyCell}>Buy In $</TableCell>
                    <TableCell className={styles.bodyCell}>Buy Back $</TableCell>
                    <TableCell className={styles.bodyCell}>Total $ In</TableCell>
                    <TableCell className={styles.bodyCell}>Total $ Out</TableCell>
                    <TableCell className={styles.bodyCell}>Winnings</TableCell>
                    <TableCell className={styles.bodyCell}>Winnings/Game</TableCell>
                    <TableCell className={styles.bodyCell}>Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell  className={styles.headerCell}>{row.gamesPlayed}</TableCell>
                    <TableCell  className={styles.headerCell}>{row.avgPlayers}</TableCell>
                    <TableCell  className={styles.headerCell}>{formatCurrency(row.totalBuyIn)}</TableCell>
                    <TableCell  className={styles.headerCell}>{formatCurrency(row.totalBuyBack)}</TableCell>
                    <TableCell  className={styles.headerCell}>{formatCurrency(row.totalIn)}</TableCell>
                    <TableCell className={styles.headerCell}>{formatCurrency(row.totalOut)}</TableCell>
                    <TableCell  className={styles.headerCell}>{formatCurrency(row.totalWinnings)}</TableCell>
                    <TableCell  className={styles.headerCell}>{formatCurrency(row.winningsPerGame)}</TableCell>
                    <TableCell  className={styles.headerCell}>{row.return}</TableCell>
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
                <TableCell className={styles.playerTableHeaderCell}>Player</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Games Played</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>AVG Players</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Buy In $</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Buy Back $</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Total $ In</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Total $ Out</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Winnings</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Winnings/Game</TableCell>
                <TableCell className={styles.playerTableHeaderCell}>Return</TableCell>
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
