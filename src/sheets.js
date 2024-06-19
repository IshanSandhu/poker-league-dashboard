export const fetchGameSummaries = async () => {
    const response = await fetch('https://sheetdb.io/api/v1/vk82a2flx6b00');
    const data = await response.json();
  
    // Group data by game number
    const groupedData = data.reduce((acc, row) => {
      const gameNumber = row['Game #'];
      if (!acc[gameNumber]) {
        acc[gameNumber] = {
          date: row.Date,
          gameNumber: row['Game #'],
          location: row.Location,
          playersPlaying: row['Players Playing'],
          total: row['Total $ In'], // Assuming 'Total $ In' represents the total money
          players: []
        };
      }
      acc[gameNumber].players.push({
        player: row.Player,
        buyIn: row['Buy In $'],
        buyBack: row['Buy Back $'],
        totalIn: row['Total $ In'],
        totalOut: row['Total $ Out'],
        winnings: row.Winnings,
        return: row.Return
      });
      return acc;
    }, {});
  
    // Convert the grouped data into an array
    const rows = Object.values(groupedData);
    return rows;
  };
  
  export const fetchPlayerStats = async () => {
    const response = await fetch('https://sheetdb.io/api/v1/vk82a2flx6b00');
    const data = await response.json();
  
    console.log("Fetched Data: ", data);
  
    // Process the data to group by player and calculate aggregated statistics
    const groupedData = data.reduce((acc, row) => {
      const playerName = row.Player;
      if (!acc[playerName]) {
        acc[playerName] = {
          playerName: row.Player,
          gamesPlayed: 0,
          totalPlayers: 0,
          totalBuyIn: 0,
          totalBuyBack: 0,
          totalIn: 0,
          totalOut: 0,
          totalWinnings: 0,
        };
      }
      acc[playerName].gamesPlayed += 1;
      acc[playerName].totalPlayers += parseFloat(row['Players Playing']) || 0;
      acc[playerName].totalBuyIn += parseFloat(row['Buy In $'].replace(/[^\d.-]/g, '')) || 0;
      acc[playerName].totalBuyBack += parseFloat(row['Buy Back $'].replace(/[^\d.-]/g, '')) || 0;
      acc[playerName].totalIn += parseFloat(row['Total $ In'].replace(/[^\d.-]/g, '')) || 0;
      acc[playerName].totalOut += parseFloat(row['Total $ Out'].replace(/[^\d.-]/g, '')) || 0;
      acc[playerName].totalWinnings += parseFloat(row.Winnings.replace(/[^\d.-]/g, '')) || 0;
  
      return acc;
    }, {});
  
    // Convert the grouped data into an array with calculated averages and returns
    const rows = Object.values(groupedData).map(player => ({
      ...player,
      avgPlayers: (player.totalPlayers / player.gamesPlayed).toFixed(2),
      winningsPerGame: (player.totalWinnings / player.gamesPlayed).toFixed(2),
      return: ((player.totalWinnings / player.totalIn) * 100).toFixed(2) + '%'
    }));
  
    console.log("Processed Player Data: ", rows);
    return rows;
  };
  