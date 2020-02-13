import React from 'react'
import Link from '../Link'
import { Box, Flex, Heading } from 'rebass'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

function LinkList() {
  const { loading, error, data } = useQuery(FEED_QUERY)

  const updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })

    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }

  if (loading) {
    return (
      <Heading fontSize={[5, 6, 7]} color="primary">
        Loading...
      </Heading>
    )
  }

  if (error) {
    return (
      <Heading fontSize={[5, 6, 7]} color="primary">
        Error
      </Heading>
    )
  }

  return (
    <Flex flexWrap="wrap" mx={-2}>
      {data.feed.links.map(link => (
        <Box key={link.id} p={3} width={1 / 2}>
          <Link link={link} onVote={updateCacheAfterVote} />
        </Box>
      ))}
    </Flex>
  )
}

export default LinkList
