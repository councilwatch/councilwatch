import { Typography } from '@mui/material';
import type { FC } from 'react';
import { NavigationBar } from '../components/NavigationBar';

const About: FC = () => {
  return (
    <>
      <NavigationBar />

      <div>
        <Typography variant='h3' align='center' gutterBottom>
          About CouncilWatch
        </Typography>
      </div>
    </>
  );
};

export default About;
