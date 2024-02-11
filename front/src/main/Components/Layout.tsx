import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import "./Layout.css";
import { AuthContext, AuthContextType } from '../AuthContext'; // Adjust the import path as necessary
import { useContext } from "react";
import axios from "axios";

let port = 3008;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;
axios.defaults.baseURL = baseURL;
axios.defaults.baseURL ="https://ganna.one/HW4"

function Header() {

    const navigate = useNavigate();
    const { authToken, logout } = useContext(AuthContext) as AuthContextType; // Cast the context to ensure type safety

    const handleLogout = async () => {
        logout();
        await axios.post('/api/users/logout');
        navigate('/login'); // Redirect to login page after logging out
    };
    return (
        <Toolbar>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/repository">Full Default Database</Button>
            <Button color="inherit" component={Link} to="/BTable">Book Table</Button>
            <Button color="inherit" component={Link} to="/AddBook">Add Book</Button>
            <Button color="inherit" component={Link} to="/EditBook">Edit Book</Button>
            {authToken ? (
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
                <Button color="inherit" component={Link} to="/login">Log in</Button>
            )}
        </Toolbar>
    );
}

function Layout() {
    return (
        <>
            <AppBar position="static">
                <Header />
            </AppBar>
            <Container>
                <Box my={4}>
                    <Outlet />
                </Box>
            </Container>
        </>
    );
}

export default Layout;
