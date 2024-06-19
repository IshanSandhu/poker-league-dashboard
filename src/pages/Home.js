import { Box, Typography, Container } from '@mui/material';

export default function Home() {
    return (
        <div>
            <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Poker league dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          This web application provides detailed summaries of poker games, player statistics, and leaderboards. You can track game results, player performance, and see the overall standings. The data is sourced from Google Sheets and displayed using Material UI components.
        </Typography>
        <Typography variant="body1" paragraph>
          Use the navigation buttons to switch between the game summaries, player statistics, and leaderboards. This dashboard helps you keep track of all the important details of your poker games in one place.
        </Typography>
      </Box>
    </Container>
        </div>
    )
}