import React from 'react'
import { Box, Flex, Heading, Button } from 'rebass'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Link from '../Link'
import { LINKS_PER_PAGE } from '../../constants'

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
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

function LinkListWithData({ location, match, history }) {
  const { subscribeToMore, loading, error, data } = useQuery(FEED_QUERY, {
    variables: getQueryVariables()
  })

  const updateCacheAfterVote = (store, createVote, linkId) => {
    const isNewPage = location.pathname.includes('new')
    const page = parseInt(match.params.page, 10)

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
    const first = isNewPage ? LINKS_PER_PAGE : 100
    const orderBy = isNewPage ? 'createdAt_DESC' : null
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy }
    })

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

  function getQueryVariables() {
    const isNewPage = location.pathname.includes('new')
    const page = parseInt(match.params.page, 10)

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
    const first = isNewPage ? LINKS_PER_PAGE : 100
    const orderBy = isNewPage ? 'createdAt_DESC' : null
    return { first, skip, orderBy }
  }

  const goToNextPage = data => {
    const dataCount = data.feed.links.length
    const page = parseInt(match.params.page, 10)
    if (page <= dataCount / LINKS_PER_PAGE) {
      const nextPage = page + 1
      history.push(`/new/${nextPage}`)
    }
  }

  const goToPreviousPage = () => {
    const page = parseInt(match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      history.push(`/new/${previousPage}`)
    }
  }

  const getLinksToRender = data => {
    if (data == null) {
      return []
    }
    const isNewPage = location.pathname.includes('new')
    if (isNewPage) {
      return data.feed.links
    }
    const rankedLinks = data.feed.links.slice()
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
    return rankedLinks
  }

  const isNewPage = true

  return (
    <React.Fragment>
      <LinkList
        isLoading={loading}
        isError={error}
        links={getLinksToRender(data)}
        onVote={updateCacheAfterVote}
        initSubscriptions={initSubscriptions}
      />
      {isNewPage && (
        <Flex mx={-2} mt={[4]}>
          <Box width={1 / 2} px={2}>
            <Button type="button" onClick={() => goToPreviousPage()}>
              Previous
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button type="button" onClick={() => goToNextPage(data)}>
              Next
            </Button>
          </Box>
        </Flex>
      )}
    </React.Fragment>
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
