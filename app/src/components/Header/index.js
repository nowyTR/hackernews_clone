import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Flex, Box, Text } from 'rebass'

const activeStyle = {
  fontWeight: 'bold',
  color: 'white'
}

class Header extends Component {
  render() {
    return (
      <Flex px={2} color="white" bg="black" alignItems="center">
        <Text p={2} fontWeight="bold">
          Hackernews
        </Text>
        <Box mx="auto" />
        <NavLink exact to="/" activeStyle={activeStyle}>
          Feed
        </NavLink>
        <Box mx={[10]} />
        <NavLink exact to="/create" activeStyle={activeStyle}>
          Add
        </NavLink>
        <Box mx={[10]} />
      </Flex>
    )
  }
}

export default withRouter(Header)
