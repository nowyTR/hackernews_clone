import React from 'react'
import { Box, Card, Image, Heading, Text } from 'rebass'
import logo from '../../logo.svg'
import './App.css'

function App() {
  return (
    <Box width={256}>
      <Card
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: '0 0 16px rgba(0, 0, 0, .25)'
        }}
      >
        <Image src={logo} />
        <Box px={2}>
          <Heading as="h3">React App</Heading>
          <Text fontSize={0}>Dank Memes</Text>
        </Box>
      </Card>
    </Box>
  )
}

export default App
