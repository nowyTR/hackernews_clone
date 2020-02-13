import React from 'react'
import { Label, Input } from '@rebass/forms'
import { Box, Flex, Button } from 'rebass'
import { AUTH_TOKEN } from '../../constants'

function Login() {
  const [formState, setFormState] = React.useState({
    login: true, // switch between Login and SignUp
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (key, value) => {
    setFormState({
      ...formState,
      [key]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  const isSignup = !formState.login

  return (
    <Box as="form" onSubmit={handleSubmit} py={3} width={600}>
      <Flex mx={-2} mb={3}>
        {isSignup && (
          <Box width={1} px={2}>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formState.name} onChange={e => handleChange('name', e.target.value)} />
          </Box>
        )}
        <Box width={1} px={2}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@domain.com"
            value={formState.email}
            onChange={e => handleChange('email', e.target.value)}
          />
        </Box>
        <Box width={1} px={2}>
          <Label htmlFor="description">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={e => handleChange('password', e.target.value)}
          />
        </Box>
      </Flex>
      <Flex mx={-2} flexWrap="wrap">
        <Box px={2} ml="auto">
          <Button type="submit">{formState.login ? 'login' : 'create account'}</Button>
        </Box>
        <Box px={2} ml="auto">
          <Button type="button" onClick={() => handleChange('login', !formState.login)}>
            {formState.login ? 'need to create an account?' : 'already have an account?'}
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default Login
