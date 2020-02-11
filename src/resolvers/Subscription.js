function newLinkSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
}

function updatedLinkSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.link({ mutation_in: ['UPDATED'] }).node()
}

function deletedLinkSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.link({ mutation_in: ['DELETED'] }).node()
}

function newVoteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload
  }
}

const updatedLink = {
  subscribe: updatedLinkSubscribe,
  resolve: payload => {
    return payload
  }
}

const deletedLink = {
  subscribe: deletedLinkSubscribe,
  resolve: payload => {
    return payload
  }
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload
  }
}

module.exports = {
  newLink,
  updatedLink,
  deletedLink,
  newVote
}
