import { Typography } from '@mui/material';
import type { FC } from 'react';
import { NavigationBar } from '../components/NavigationBar';

const Events: FC = () => {
  return (
    <>
      <NavigationBar />

      <div>
        <Typography variant='h3' align='center' gutterBottom>
          CouncilWatch Events
        </Typography>
      </div>
    </>
  );
};

export default Events;
