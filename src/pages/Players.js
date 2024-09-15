import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Box, Typography, Paper
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fetchPlayerStats } from '../sheets'; 
import { formatCurrency, formatPercentage, parseFormattedValue } from '../formats';
import styles from '../CollapsibleTable.module.css';

function PlayerRow({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className={styles.stickyColumn}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell className={`${styles.bodyCell} ${styles.stickyColumn}`}>{row.playerName}</TableCell>
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
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Cash Games Played</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>AVG Players Playing</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Buy In $</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Buy Back $</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Total $ In</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Total $ Out</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Winnings</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Winnings/Game</TableCell>
                    <TableCell className={`${styles.bodyCell} ${styles.stickyHeader}`}>Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{row.gamesPlayed}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{row.avgPlayers}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{formatCurrency(row.totalBuyIn)}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{formatCurrency(row.totalBuyBack)}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{formatCurrency(row.totalIn)}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{formatCurrency(row.totalOut)}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{formatCurrency(row.totalWinnings)}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{formatCurrency(row.winningsPerGame)}</TableCell>
                    <TableCell className={`${styles.headerCell} ${styles.stickyHeader}`}>{row.return}</TableCell>
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
  const [sortConfig, setSortConfig] = useState({ key: 'playerName', direction: 'asc' });

  useEffect(() => {
    // Fetch and set the player stats data
    fetchPlayerStats().then(data => setRows(data));
  }, []);

  // Custom sort function
  const sortedRows = React.useMemo(() => {
    let sortableRows = [...rows];
    const { key, direction } = sortConfig;
    
    sortableRows.sort((a, b) => {
      // Use parsed values for sorting
      const aValue = parseFormattedValue(a[key]);
      const bValue = parseFormattedValue(b[key]);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return sortableRows;
  }, [rows, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom style={{ marginBottom: '30px' }}>
        Player Statistics
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 2 }} style={{ borderRadius: '10px' }}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: '#F0F0F0' }}>
            <TableRow>
              <TableCell />
              <TableCell className={`${styles.playerTableHeaderCell} ${styles.stickyColumn}`} onClick={() => requestSort('playerName')}>Player</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('gamesPlayed')}>Games Played</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('avgPlayers')}>AVG Players</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('totalBuyIn')}>Buy In $</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('totalBuyBack')}>Buy Back $</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('totalIn')}>Total $ In</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('totalOut')}>Total $ Out</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('totalWinnings')}>Winnings</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('winningsPerGame')}>Winnings/Game</TableCell>
              <TableCell className={styles.playerTableHeaderCell} onClick={() => requestSort('return')}>Return</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <PlayerRow key={row.playerName} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
