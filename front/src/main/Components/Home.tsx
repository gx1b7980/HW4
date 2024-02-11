import './Home.css'; // Import the CSS file for additional styling
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../AuthContext';

function Home() {
    const theme = useTheme(); // Use the theme for consistent styling
    const { username } = useAuth(); 
    const greeting = username ? `Hi ${username}` : "Hi Guest";


    return (
        <div>
            
            {/* Main content area */}
            <Container maxWidth="sm" style={{ marginTop: theme.spacing(4) }}>
                <Paper elevation={3} style={{ padding: theme.spacing(3) }}>
                    <Typography variant="h4" component="h1" align='center' gutterBottom>
                        Welcome to my Home Page
                    </Typography>
                    <Typography variant="h6" align='center' component="p">
                        {greeting}
                    </Typography>

                    <Typography variant="body1" align='center' mt={2} gutterBottom>
                        This is the starting point of our Book List Table.
                    </Typography>
                    
                </Paper>
            </Container>

            
            <Box mt={5} py={3} bgcolor={theme.palette.background.paper} textAlign="center">
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Sahil Khanna for CS-T480
                    </Typography>
                </Container>
            </Box>
        </div>
    );
}

export default Home;
