import React from 'react'
import Link from '../Link'
import { Box, Flex, Heading } from 'rebass'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
      }
    }
  }
`

function LinkList() {
  const { loading, error, data } = useQuery(FEED_QUERY)

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
        <Box key={link.id} p={5} width={1 / 2}>
          <Link link={link} />
        </Box>
      ))}
    </Flex>
  )
}

export default LinkList
