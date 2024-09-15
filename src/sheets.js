const SHEET_ID = '1brW8mOok9lBn_lUlN0yfra0miWgwhH7DMePDB2n6J4A';
const SHEET_TITLE = 'Raw';
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}`;
let data;

export const fetchGameSummaries = async () => {
  const response = await fetch(FULL_URL);
  const rawData = await response.text();
  
  // Parse the JSON data, extracting the relevant portion
  const data = JSON.parse(rawData.substring(47).slice(0, -2));
  
  // Extract rows from data.table
  const rows = data.table.rows;

  // Group data by game number
  const groupedData = rows.reduce((acc, row) => {
    // Destructure the row data based on expected positions
    const [date, gameNumber, location, playerName, playersPlaying, buyIn, buyBack, totalMoneyIn, totalMoneyOut, winnings, returnPercent] = row.c.map(cell => cell.v);
    
    const formattedDate = formatDateString(date)

    if (!acc[gameNumber]) {
      acc[gameNumber] = {
        date: formattedDate,
        gameNumber: gameNumber,
        location: location,
        playersPlaying: parseFloat(playersPlaying) || 0,
        total: parseToFloat(totalMoneyIn), // Assuming 'Total $ In' represents the total money
        players: []
      };
    }
    acc[gameNumber].players.push({
      player: playerName,
      buyIn: parseToFloat(buyIn),
      buyBack: parseToFloat(buyBack),
      totalIn: parseToFloat(totalMoneyIn),
      totalOut: parseToFloat(totalMoneyOut),
      winnings: parseToFloat(winnings),
      return: returnPercent
    });
    return acc;
  }, {});

  // Convert the grouped data into an array
  const rowsArray = Object.values(groupedData);
  console.log("Grouped Game Summaries: ", rowsArray);
  return rowsArray;
};

// Helper function to safely convert values to floats
const parseToFloat = (value) => {
  return parseFloat(value && typeof value === 'string' ? value.replace(/[^\d.-]/g, '') : value) || 0;
};

function formatDateString(dateString) {
  // Extract the components from the Date(yyyy,mm,dd) string
  const regex = /Date\((\d{4}),(\d{1,2}),(\d{1,2})\)/;
  const match = dateString.match(regex);

  if (match) {
    const [, year, month, day] = match.map(Number);
    const date = new Date(year, month, day); // Use zero-indexed month directly

    // Define an array of month names
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Format the date to "Month DD, yyyy"
    return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
  } else {
    throw new Error('Invalid date string format');
  }
}

export const fetchPlayerStats = async () => {
  const response = await fetch(FULL_URL);
  const rawData = await response.text();
  
  // Parse the JSON data, extracting the relevant portion
  const data = JSON.parse(rawData.substring(47).slice(0, -2));
  
  // Extract rows from data.table
  const rows = data.table.rows;
  
  // Process the data to group by player and calculate aggregated statistics
  const groupedData = rows.reduce((acc, row) => {
    // Destructure the row data based on expected positions
    const [date, gameNumber, location, playerName, playersPlaying, buyIn, buyBack, totalMoneyIn, totalMoneyOut, winnings, returnPercent] = row.c.map(cell => cell.v);
    
    // Initialize player data if not yet present in accumulator
    if (!acc[playerName]) {
      acc[playerName] = {
        playerName: playerName,
        gamesPlayed: 0,
        totalPlayers: 0,
        totalBuyIn: 0,
        totalBuyBack: 0,
        totalIn: 0,
        totalOut: 0,
        totalWinnings: 0,
      };
    }
    
    // Aggregate data for the player
    acc[playerName].gamesPlayed += 1;
    acc[playerName].totalPlayers += parseFloat(playersPlaying) || 0;
    acc[playerName].totalBuyIn += parseFloat(buyIn);
    acc[playerName].totalBuyBack += parseFloat(buyBack);
    acc[playerName].totalIn += parseFloat(totalMoneyIn);
    acc[playerName].totalOut += parseFloat(totalMoneyOut);
    acc[playerName].totalWinnings += parseFloat(winnings);

    return acc;
  }, {});

  // Convert the grouped data into an array with calculated averages and returns
  const processedRows = Object.values(groupedData).map(player => ({
    ...player,
    avgPlayers: (player.totalPlayers / player.gamesPlayed).toFixed(2),
    winningsPerGame: (player.totalWinnings / player.gamesPlayed).toFixed(2),
    return: ((player.totalWinnings / player.totalIn) * 100).toFixed(2) + '%'
  }));
  return processedRows;
}