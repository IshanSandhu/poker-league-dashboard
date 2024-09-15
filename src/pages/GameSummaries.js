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
                    <TableCell className={styles.headerCell}>Player</TableCell>
                    <TableCell className={styles.headerCell}>Buy In $</TableCell>
                    <TableCell className={styles.headerCell}>Buy Back $</TableCell>
                    <TableCell className={styles.headerCell}>Total $ In</TableCell>
                    <TableCell className={styles.headerCell}>Total $ Out</TableCell>
                    <TableCell className={styles.headerCell}>Winnings</TableCell>
                    <TableCell className={styles.headerCell}>Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.players.map((player, index) => (
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

  useEffect(() => {
    // Fetch and set the game summaries data
    fetchGameSummaries().then(data => setRows(data));
  }, []);

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
              <TableCell className={styles.tableHeaderCell}>Date</TableCell>
              <TableCell className={styles.tableHeaderCell}>Game #</TableCell>
              <TableCell className={styles.tableHeaderCell}>Location</TableCell>
              <TableCell className={styles.tableHeaderCell}># Players</TableCell>
              <TableCell className={styles.tableHeaderCell}>Total $</TableCell>
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