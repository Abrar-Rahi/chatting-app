import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Sidebar from './Sidebar';

const RootLayOut = () => {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Outlet />
        </Grid>
      </Grid>

    </>
  )
}

export default RootLayOut