import { Typography } from '@mui/material';
import type { FC } from 'react';
import { NavigationBar } from '../components/NavigationBar';

const Contact: FC = () => {
  return (
    <>
      <NavigationBar />

      <div>
        <Typography variant='h3' align='center' gutterBottom>
          Contact CouncilWatch
        </Typography>
      </div>
    </>
  );
};

export default Contact;
