import { useState } from 'react';
import axios from 'axios';
import { getAxiosErrorMessages } from './utils';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
/*
let port = 3008;
let host = 'localhost';
let protocol = 'http'; 
let baseURL = `${protocol}://${host}:${port}`;
*/
axios.defaults.baseURL = "https://ganna.one/HW4"

function AddBook() {
    const [messages, setMessages] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pubYear, setPubYear] = useState('');
    const [genre, setGenre] = useState('');

    const handleSubmit = async () => {
        try {
            let authorId;
            try {
                const response = await axios.get(`/api/authors/name/${author}`);
                authorId = response.data.id;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    const addResponse = await axios.post('/api/authors/post', { name: author, bio: '' });
                    authorId = addResponse.data.lastID;
                } else {
                    throw error;
                }
            }
            await axios.post('/api/books/post', { title, author_id: authorId, pub_year: pubYear, genre });
            setMessages(['Book successfully added']);
        } catch (error) {
            console.error('Error in AddBook:', getAxiosErrorMessages(error));
            setMessages(['Failed to add the book']);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={5}>
                <Typography variant="h4" gutterBottom>Add New Book</Typography>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Author"
                    fullWidth
                    margin="normal"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                    label="Publication Year"
                    fullWidth
                    margin="normal"
                    value={pubYear}
                    onChange={(e) => setPubYear(e.target.value)}
                />
                <TextField
                    label="Genre"
                    fullWidth
                    margin="normal"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                    Submit
                </Button>
                {messages.map((message, index) => (
                    <Typography key={index} color="error" mt={2}>
                        {message}
                    </Typography>
                ))}
            </Box>
        </Container>
    );
}

export default AddBook;
