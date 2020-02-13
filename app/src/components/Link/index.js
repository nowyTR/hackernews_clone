import React from 'react'
import PropTypes from 'prop-types'
import { Box, Link, Text, Button } from 'rebass'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../../constants'

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
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

function LinkItem({ link, onVote }) {
  const [vote] = useMutation(VOTE_MUTATION, {
    onCompleted: () => {
      console.log('success')
    },
    update: (store, { data: { vote } }) => {
      onVote(store, vote, this.props.link.id)
    }
  })

  const authToken = localStorage.getItem(AUTH_TOKEN)

  const handleVote = () => {
    vote({ variables: { linkId: link.id } })
  }

  return (
    <Box
      sx={{
        px: 3,
        py: 3,
        backgroundSize: 'cover',
        borderRadius: 8,
        color: 'black',
        bg: '#dff'
      }}
    >
      {authToken && (
        <Button type="button" onClick={handleVote}>
          Vote
        </Button>
      )}
      <Link href={link.url}>{link.description}</Link>
      <Text mt={[2]}>
        {link.votes.length} votes | by {link.postedBy ? link.postedBy.name : 'Unknown'}
      </Text>
    </Box>
  )
}

Link.propTypes = {
  link: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
    votes: PropTypes.array,
    postedBy: PropTypes.object
  })
}

export default LinkItem
