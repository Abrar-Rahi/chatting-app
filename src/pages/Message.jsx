import React from 'react'
import Grid from '@mui/material/Grid';
import GroupList from '../components/GroupList';
import Friends from '../components/Friends';
import ChatMsg from '../components/ChatMsg';

const Message = () => {
  return (
    <div>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <GroupList type="msgBox" className="hover" />
          <Friends type="msgBox" className="hover" />
        </Grid>
        <Grid item xs={8}>
          <ChatMsg />
        </Grid>
      </Grid>
    </div>
  )
}

export default Message