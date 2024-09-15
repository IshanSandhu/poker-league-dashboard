import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Collapse, Box, Typography, Paper
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fetchGameSummaries } from '../sheets'; 
import { formatCurrency } from '../formats';
import { formatPercentage } from '../formats';
import styles from '../CollapsibleTable.module.css';

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'player', direction: 'asc' });

  const sortedPlayers = React.useMemo(() => {
    let sortablePlayers = [...row.players];
    if (sortConfig !== null) {
      sortablePlayers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePlayers;
  }, [row.players, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell className={styles.bodyCell}>{row.date}</TableCell>
        <TableCell className={styles.bodyCell}>{row.gameNumber}</TableCell>
        <TableCell className={styles.bodyCell}>{row.location}</TableCell>
        <TableCell className={styles.bodyCell}>{row.playersPlaying}</TableCell>
        <TableCell className={styles.bodyCell}>{formatCurrency(row.total)}</TableCell>
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
                    <TableCell className={styles.headerCell} onClick={() => requestSort('player')}>Player</TableCell>
                    <TableCell className={styles.headerCell} onClick={() => requestSort('buyIn')}>Buy In $</TableCell>
                    <TableCell className={styles.headerCell} onClick={() => requestSort('buyBack')}>Buy Back $</TableCell>
                    <TableCell className={styles.headerCell} onClick={() => requestSort('totalIn')}>Total $ In</TableCell>
                    <TableCell className={styles.headerCell} onClick={() => requestSort('totalOut')}>Total $ Out</TableCell>
                    <TableCell className={styles.headerCell} onClick={() => requestSort('winnings')}>Winnings</TableCell>
                    <TableCell className={styles.headerCell} onClick={() => requestSort('return')}>Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedPlayers.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell className={styles.bodyCell}>{player.player}</TableCell>
                      <TableCell className={styles.bodyCell}>{formatCurrency(player.buyIn)}</TableCell>
                      <TableCell className={styles.bodyCell}>{formatCurrency(player.buyBack)}</TableCell>
                      <TableCell className={styles.bodyCell}>{formatCurrency(player.totalIn)}</TableCell>
                      <TableCell className={styles.bodyCell}>{formatCurrency(player.totalOut)}</TableCell>
                      <TableCell className={styles.bodyCell}>{formatCurrency(player.winnings)}</TableCell>
                      <TableCell className={styles.bodyCell}>{formatPercentage(player.return)}</TableCell>
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
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

  useEffect(() => {
    fetchGameSummaries().then(data => setRows(data));
  }, []);

  const sortedRows = React.useMemo(() => {
    let sortableRows = [...rows];
    if (sortConfig !== null) {
      sortableRows.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
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
      <Typography variant="h4" component="h1" gutterBottom className={styles.title}>
        Game Summaries
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ boxShadow: 2 }} className={styles.tableContainer}>
        <Table aria-label="collapsible table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell />
              <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('date')}>Game Date</TableCell>
              <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('gameNumber')}>Game #</TableCell>
              <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('location')}>Location</TableCell>
              <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('playersPlaying')}># Players</TableCell>
              <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('total')}>Total $</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <Row key={row.gameNumber} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
