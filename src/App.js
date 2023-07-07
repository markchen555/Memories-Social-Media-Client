import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import styles from './styles'

const App = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <Container maxWidth="lg">
    <AppBar sx={styles.appbar} position="static" color="inherit">
      <Typography sx={styles.heading} variant="h2" align="center">Memories</Typography>
      <img style={styles.image} src={memories} alt="icon" height="60" />
    </AppBar>
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  </Container>
  );
}

export default App;
