import React from 'react'
import { Label, Input } from '@rebass/forms'
import { Box, Flex, Button } from 'rebass'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { FEED_QUERY } from '../LinkList'
import { LINKS_PER_PAGE } from '../../constants'

const ADD_LINK = gql`
  mutation AddLink($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
    }
  }
`

function CreateLinkForm({ history }) {
  const [addLink] = useMutation(ADD_LINK, {
    onCompleted: () => {
      history.push('/new/1')
    },
    update: (store, { data: { post } }) => {
      const first = LINKS_PER_PAGE
      const skip = 0
      const orderBy = 'createdAt_DESC'
      const data = store.readQuery({
        query: FEED_QUERY,
        variables: { first, skip, orderBy }
      })
      data.feed.links.unshift(post)
      store.writeQuery({
        query: FEED_QUERY,
        data,
        variables: { first, skip, orderBy }
      })
    }
  })
  const [url, setUrl] = React.useState('')
  const [description, setDescription] = React.useState('')

  const handleSubmit = e => {
    e.preventDefault()
    addLink({
      variables: { description, url }
    })
  }

  return (
    <Box as="form" onSubmit={handleSubmit} py={3} width={600}>
      <Flex mx={-2} mb={3}>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="url">URL</Label>
          <Input id="url" name="url" placeholder="The URL for the link" onChange={e => setUrl(e.target.value)} />
        </Box>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="A description for the link"
            onChange={e => setDescription(e.target.value)}
          />
        </Box>
      </Flex>
      <Flex mx={-2} flexWrap="wrap">
        <Box px={2} ml="auto">
          <Button type="submit">Add</Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateLinkForm
