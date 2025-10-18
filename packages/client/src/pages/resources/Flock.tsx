import { Typography } from '@mui/material';
import type { FC } from 'react';
import { NavigationBar } from '../../components/NavigationBar';

const Flock: FC = () => {
  return (
    <>
      <NavigationBar />

      <div>
        <Typography variant='h3' align='center' gutterBottom>
          Flock Resource Page
        </Typography>
      </div>
    </>
  );
};

export default Flock;
