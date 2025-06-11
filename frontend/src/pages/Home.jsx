import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [db, setDb] = useState(null);

    useEffect(() => {
        axios.get('/test-db')
            .then(res => setDb(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container>
            <Box sx={{ my: 4 }}>Home Page</Box>
            <Box>
                <h2>Testing database and API calls from backend:</h2>
                <pre>{JSON.stringify(db, null, 2)}</pre>
            </Box>
        </Container>
    );
};

export default Home;