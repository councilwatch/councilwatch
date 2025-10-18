import { Typography } from '@mui/material';
import type { FC } from 'react';
import { NavigationBar } from '../../components/NavigationBar';

const RightToRepair: FC = () => {
  return (
    <>
      <NavigationBar />

      <div>
        <Typography variant='h3' align='center' gutterBottom>
          Right to Repair Resource Page
        </Typography>
      </div>
    </>
  );
};

export default RightToRepair;
