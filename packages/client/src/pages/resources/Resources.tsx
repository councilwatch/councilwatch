import { Divider, Paper, Typography } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { NavigationBar } from '../../components/NavigationBar';
import { Routes } from '../../router';
import classes from './Resources.module.css';

const Resources: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />

      <div>
        <Typography variant='h3' align='center' gutterBottom>
          CouncilWatch Resources
        </Typography>

        <div className={classes.topics}>
          <Paper elevation={3} className={classes.topic} onClick={() => navigate(Routes.Flock)}>
            <Typography variant='h5' align='center' gutterBottom>
              Flock
            </Typography>

            <Divider flexItem />

            <Typography variant='body1'>
              Flock is an AI surveillance company that is trying to put up cameras in as many cities as
              possible. These cameras are fundamental violations of privacy, and shoul not be permitted in our
              communities.
            </Typography>
          </Paper>

          <Paper elevation={3} className={classes.topic} onClick={() => navigate(Routes.RightToRepair)}>
            <Typography variant='h5' align='center' gutterBottom>
              Right To Repair
            </Typography>

            <Divider flexItem />

            <Typography variant='body1'>
              Every day comapnies make it harder for people to fix their own devices. Right to Repair is a
              movement to ensure that people have the ability to repair and modify their own electronics as
              they see fit.
            </Typography>
          </Paper>

          <Paper elevation={3} className={classes.topic}>
            <Typography variant='h5' align='center' gutterBottom>
              Coming Soon...
            </Typography>

            <Divider flexItem />

            <Typography variant='body1'>
              We're working hard to add more resources to CouncilWatch. Check back soon for more topics and
              information!
            </Typography>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Resources;
