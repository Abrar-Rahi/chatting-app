import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import GroupList from '../components/GroupList';
import Friends from '../components/Friends';
import UserList from '../components/UserList';
import RequistFriend from '../components/RequistFriend';
import MyGroup from '../components/MyGroup';
import BlockedUser from '../components/BlockedUser';


const Home = () => {
  let userInfo = useSelector(state => state.userInfo.value)
  let navigate = useNavigate()
  useEffect(() => {
    if (userInfo == null) {
      navigate("/login")
    }
  }, [])
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <GroupList />
        </Grid>
        <Grid item xs={4}>
          <Friends />
        </Grid>
        <Grid item xs={4}>
          <UserList />
        </Grid>
        <Grid item xs={4}>
          <RequistFriend />
        </Grid>
        <Grid item xs={4}>
          <MyGroup />
        </Grid>
        <Grid item xs={4}>
          <BlockedUser />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home