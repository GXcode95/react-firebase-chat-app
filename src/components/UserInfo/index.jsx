import React from 'react'
import Avatar from 'components/Avatar'
import AvatarForm from 'components/AvatarForm'
import { Box, Typography } from '@mui/material'

const UserInfo = ({user, setAvatar}) => {

  return (
    <Box display='flex' alignItems="center">

      <Box className="avatar-container" >
        <Avatar img={user.avatar} size="100px" />
        <AvatarForm setAvatar={setAvatar} />
      </Box>

      <Box flex="1" textAlign="center" pt={4}>
        <Typography variant="h3" pb={4}>{user.name}</Typography>
        <Typography variant="h5" component={"p"} pb={4}>{user.email}</Typography>
      </Box>

    </Box>
  )
}

export default UserInfo