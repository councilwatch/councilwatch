import { Typography } from '@mui/material';
import type { FC } from 'react';
import { NavigationBar } from '../components/NavigationBar';

const Home: FC = () => {
  return (
    <>
      <NavigationBar />

      <div>
        <Typography variant='h3' align='center' gutterBottom>
          Welcome to CouncilWatch
        </Typography>
      </div>
    </>
  );
};

export default Home;
