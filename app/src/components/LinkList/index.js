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

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
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
`

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
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
      user {
        id
      }
    }
  }
`

function LinkListWithData() {
  const { subscribeToMore, loading, error, data } = useQuery(FEED_QUERY)

  const updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })

    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }

  const subscribeToNewLinks = () => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newLink = subscriptionData.data.newLink
        const exists = prev.feed.links.find(({ id }) => id === newLink.id)
        if (exists) {
          return prev
        }

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        })
      }
    })
  }

  const subscribeToNewVotes = () => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    })
  }

  const initSubscriptions = () => {
    subscribeToNewLinks()
    subscribeToNewVotes()
  }

  return (
    <LinkList
      isLoading={loading}
      isError={error}
      links={data?.feed.links}
      onVote={updateCacheAfterVote}
      initSubscriptions={initSubscriptions}
    />
  )
}

function LinkList({ isLoading, isError, links, initSubscriptions, onVote }) {
  React.useEffect(() => {
    initSubscriptions()
  }, [])

  if (isLoading) {
    return (
      <Heading fontSize={[5, 6, 7]} color="primary">
        Loading...
      </Heading>
    )
  }

  if (isError) {
    return (
      <Heading fontSize={[5, 6, 7]} color="primary">
        Error
      </Heading>
    )
  }

  return (
    <Flex flexWrap="wrap" mx={-2}>
      {links.map(link => (
        <Box key={link.id} p={3} width={1 / 2}>
          <Link link={link} onVote={onVote} />
        </Box>
      ))}
    </Flex>
  )
}

export default LinkListWithData
