import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'rebass'

function LinkItem({ link }) {
  return <Link href={link.url}>{link.description}</Link>
}

Link.propTypes = {
  link: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default LinkItem
