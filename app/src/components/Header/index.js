import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Flex, Box, Text, Button } from 'rebass'
import { AUTH_TOKEN } from '../../constants'

const activeStyle = {
  fontWeight: 'bold',
  color: 'white'
}

function CustomNavLink({ children, ...restProps }) {
  return (
    <Box
      sx={{
        marginLeft: 20,
        marginRight: 20,
        '& > a': {
          color: '#fff'
        }
      }}
    >
      <NavLink {...restProps}>{children}</NavLink>
    </Box>
  )
}

function Header({ history }) {
  const authToken = window.localStorage.getItem(AUTH_TOKEN)
  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        Hackernews
      </Text>
      <Box mx="auto" />
      <CustomNavLink color="primary" exact to="/" activeStyle={activeStyle}>
        Feed
      </CustomNavLink>
      <CustomNavLink color="primary" exact to="/top" activeStyle={activeStyle}>
        Top
      </CustomNavLink>
      <CustomNavLink color="primary" exact to="/search" activeStyle={activeStyle}>
        Search
      </CustomNavLink>
      <CustomNavLink color="primary" exact to="/create" activeStyle={activeStyle}>
        Add
      </CustomNavLink>
      {authToken ? (
        <Button
          type="button"
          onClick={() => {
            window.localStorage.removeItem(AUTH_TOKEN)
            history.push(`/`)
          }}
        >
          Logout
        </Button>
      ) : (
        <CustomNavLink exact to="/login" activeStyle={activeStyle}>
          Login
        </CustomNavLink>
      )}
    </Flex>
  )
}

export default withRouter(Header)
