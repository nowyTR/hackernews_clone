import React from 'react'
import { Label, Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'
import Link from '../Link'

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
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

function Search() {
  const [filter, setFilter] = React.useState('')
  const [links, setLinks] = React.useState([])

  const client = useApolloClient()

  const handleSearch = async () => {
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    })
    const links = result.data.feed.links
    setLinks([...links])
  }

  return (
    <Box py={3}>
      <Box width={1} px={2} mb={[2]}>
        <Label htmlFor="name">Query</Label>
        <Input id="name" name="name" value={filter} onChange={e => setFilter(e.target.value)} />
      </Box>
      <Button type="button" onClick={handleSearch}>
        Search
      </Button>
      {links.map(link => (
        <Box key={link.id} p={3} width={1 / 2}>
          <Link link={link} />
        </Box>
      ))}
    </Box>
  )
}

export default Search
